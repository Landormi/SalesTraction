import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise'; // MariaDB client
import cookieParser from 'cookie-parser';

// Charge le bon fichier .env selon l'environnement
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development.local' });
} else {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Simple sanitize utility
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  // Limite la taille à 512 caractères pour éviter les payloads trop longs
  str = str.slice(0, 512);
  // Retire les caractères dangereux
  return str.replace(/[<>'"`;]/g, '').trim();
}

// Utilitaire pour créer une connexion à la BDD
async function getDbConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });
}

// Utilitaire pour générer un token JWT
function generateToken(user) {
  return jwt.sign(
    { id_user: user.id_user, email: user.email, user_type: user.user_type },
    process.env.JWT_SECRET || 'dev_secret',
    { expiresIn: '2h' }
  );
}

// Middleware pour vérifier le token JWT et attacher l'utilisateur à req.user
function authenticateToken(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant' });
  jwt.verify(token, process.env.JWT_SECRET || 'dev_secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalide' });
    req.user = user;
    next();
  });
}

// Routes

// Inscription pour un étudiant
app.post('/api/auth/signup/studiant', async (req, res) => {
  let { email, password, linkedin_url, birthday, university, description } = req.body;
  // Sanitize inputs
  email = sanitizeString(email);
  password = sanitizeString(password);
  linkedin_url = sanitizeString(linkedin_url);
  birthday = sanitizeString(birthday);
  university = sanitizeString(university);
  description = sanitizeString(description);

  let connection;
  try {
    connection = await getDbConnection();
    // Vérifie si l'email existe déjà
    const [existing] = await connection.execute(
      'SELECT id_user FROM user_ WHERE email = ?',
      [email]
    );
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email déjà utilisé' });
    }
    // Création de l'utilisateur
    const [userResult] = await connection.execute(
      'INSERT INTO user_ (email, password_hash, user_type) VALUES (?, ?, ?)',

      [email, password, 'studiant'] // user_type fixé côté serveur
    );
    const userId = userResult.insertId;
    // Création du profil étudiant (clé primaire = id_user)
    await connection.execute(
      'INSERT INTO studiant (id_user, linkedin_url, birthday, university, created_at, description) VALUES (?, ?, ?, ?, NOW(), ?)',

      [userId, linkedin_url || null, birthday, university || null, description]
    );
    res.status(201).json({ message: 'Studiant user created', userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating studiant user' });
  } finally {
    if (connection) await connection.end();
  }
});

// Inscription pour une startup
app.post('/api/auth/signup/startup', async (req, res) => {
  let { email, password, linkedin_url, name, siret, status } = req.body;
  // Sanitize inputs
  email = sanitizeString(email);
  password = sanitizeString(password);
  linkedin_url = sanitizeString(linkedin_url);
  name = sanitizeString(name);
  siret = sanitizeString(siret);
  status = sanitizeString(status);

  let connection;
  try {
    connection = await getDbConnection();
    // Vérifie si l'email existe déjà
    const [existing] = await connection.execute(
      'SELECT id_user FROM user_ WHERE email = ?',
      [email]
    );
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email déjà utilisé' });
    }
    // Création de l'utilisateur
    const [userResult] = await connection.execute(
      'INSERT INTO user_ (email, password_hash, user_type) VALUES (?, ?, ?)',

      [email, password, 'startup'] // user_type fixé côté serveur
    );
    const userId = userResult.insertId;
    // Création du profil startup (clé primaire = id_user)
    await connection.execute(
      'INSERT INTO startup (id_user, linkedin_url, name, siret, created_at, status) VALUES (?, ?, ?, ?, NOW(), ?)',

      [userId, linkedin_url || null, name, siret, status]
    );
    res.status(201).json({ message: 'Startup user created', userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating startup user' });
  } finally {
    if (connection) await connection.end();
  }
});

// Route de login pour les étudiants
app.post('/api/auth/login/studiant', async (req, res) => {
  let { email, password } = req.body;
  email = sanitizeString(email);
  password = sanitizeString(password);

  let connection;
  try {
    connection = await getDbConnection();
    const [rows] = await connection.execute(
      'SELECT id_user, email, user_type FROM user_ WHERE email = ? AND password_hash = ? AND user_type = ?',
      [email, password, 'studiant'] // user_type fixé côté serveur
    );
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = rows[0];
    // On ne fait confiance qu'au user_type issu de la BDD (jamais du client)
    const token = generateToken(user);
    // Met le token dans un cookie HTTPOnly
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2 * 60 * 60 * 1000 // 2h
    });
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login error' });
  } finally {
    if (connection) await connection.end();
  }
});

// Route de login pour les startups
app.post('/api/auth/login/startup', async (req, res) => {
  let { email, password } = req.body;
  email = sanitizeString(email);
  password = sanitizeString(password);

  let connection;
  try {
    connection = await getDbConnection();
    const [rows] = await connection.execute(
      'SELECT id_user, email, user_type FROM user_ WHERE email = ? AND password_hash = ? AND user_type = ?',
      [email, password, 'startup'] // user_type fixé côté serveur
    );
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = rows[0];
    // On ne fait confiance qu'au user_type issu de la BDD (jamais du client)
    const token = generateToken(user);
    // Met le token dans un cookie HTTPOnly
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2 * 60 * 60 * 1000 // 2h
    });
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Login error' });
  } finally {
    if (connection) await connection.end();
  }
});

// Route pour tester la connexion à la BDD
app.get('/api/db/test', async (req, res) => {
  let connection;
  try {
    connection = await getDbConnection();
    await connection.ping();
    res.json({ success: true, message: 'Connexion à la base de données réussie.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur de connexion à la base de données.', error: error.message });
  } finally {
    if (connection) await connection.end();
  }
});

// Route pour récupérer le profil étudiant (hors mot de passe)
app.get('/api/profile/studiant', authenticateToken, async (req, res) => {
  if (req.user.user_type !== 'studiant') return res.status(403).json({ message: 'Accès refusé' });
  let connection;
  try {
    connection = await getDbConnection();
    const [rows] = await connection.execute(
      `SELECT u.id_user, u.email, u.user_type, s.linkedin_url, s.birthday, s.university, s.created_at, s.description
       FROM user_ u
       JOIN studiant s ON u.id_user = s.id_user
       WHERE u.id_user = ?`,
      [req.user.id_user]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Profil non trouvé' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
  } finally {
    if (connection) await connection.end();
  }
});

// Route pour récupérer le profil startup (hors mot de passe)
app.get('/api/profile/startup', authenticateToken, async (req, res) => {
  if (req.user.user_type !== 'startup') return res.status(403).json({ message: 'Accès refusé' });
  let connection;
  try {
    connection = await getDbConnection();
    const [rows] = await connection.execute(
      `SELECT u.id_user, u.email, u.user_type, s.linkedin_url, s.name, siret, s.created_at, s.status
       FROM user_ u
       JOIN startup s ON u.id_user = s.id_user
       WHERE u.id_user = ?`,
      [req.user.id_user]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Profil non trouvé' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
  } finally {
    if (connection) await connection.end();
  }
});

// Modification d'un étudiant (id récupéré via le token)
app.put('/api/studiant', authenticateToken, async (req, res) => {
  if (req.user.user_type !== 'studiant') return res.status(403).json({ message: 'Accès refusé' });
  const id = req.user.id_user;
  let { linkedin_url, birthday, university, description } = req.body;
  linkedin_url = linkedin_url !== undefined ? sanitizeString(linkedin_url) : undefined;
  birthday = birthday !== undefined ? sanitizeString(birthday) : undefined;
  university = university !== undefined ? sanitizeString(university) : undefined;
  description = description !== undefined ? sanitizeString(description) : undefined;

  let connection;
  try {
    connection = await getDbConnection();
    const fields = [];
    const values = [];
    if (linkedin_url !== undefined) { fields.push('linkedin_url = ?'); values.push(linkedin_url || null); }
    if (birthday !== undefined) { fields.push('birthday = ?'); values.push(birthday); }
    if (university !== undefined) { fields.push('university = ?'); values.push(university || null); }
    if (description !== undefined) { fields.push('description = ?'); values.push(description || null); }
    if (fields.length === 0) {
      return res.status(400).json({ message: 'Aucune donnée à mettre à jour.' });
    }
    values.push(id);
    const sql = `UPDATE studiant SET ${fields.join(', ')} WHERE id_user = ?`;
    const [result] = await connection.execute(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Studiant non trouvé.' });
    }
    res.json({ message: 'Studiant mis à jour.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du studiant.' });
  } finally {
    if (connection) await connection.end();
  }
});

// Modification d'une startup (id récupéré via le token)
app.put('/api/startup', authenticateToken, async (req, res) => {
  if (req.user.user_type !== 'startup') return res.status(403).json({ message: 'Accès refusé' });
  const id = req.user.id_user;
  let { linkedin_url, name, siret, status } = req.body;
  linkedin_url = linkedin_url !== undefined ? sanitizeString(linkedin_url) : undefined;
  name = name !== undefined ? sanitizeString(name) : undefined;
  siret = siret !== undefined ? sanitizeString(siret) : undefined;
  status = status !== undefined ? sanitizeString(status) : undefined;

  let connection;
  try {
    connection = await getDbConnection();
    const fields = [];
    const values = [];
    if (linkedin_url !== undefined) { fields.push('linkedin_url = ?'); values.push(linkedin_url || null); }
    if (name !== undefined) { fields.push('name = ?'); values.push(name); }
    if (siret !== undefined) { fields.push('siret = ?'); values.push(siret); }
    if (status !== undefined) { fields.push('status = ?'); values.push(status); }
    if (fields.length === 0) {
      return res.status(400).json({ message: 'Aucune donnée à mettre à jour.' });
    }
    values.push(id);
    const sql = `UPDATE startup SET ${fields.join(', ')} WHERE id_user = ?`;
    const [result] = await connection.execute(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Startup non trouvée.' });
    }
    res.json({ message: 'Startup mise à jour.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la startup.' });
  } finally {
    if (connection) await connection.end();
  }
});

// Création d'une offre (startup uniquement)
app.post('/api/offre', authenticateToken, async (req, res) => {
  if (req.user.user_type !== 'startup') return res.status(403).json({ message: 'Accès refusé' });
  let { title, description, price_range, comission } = req.body;
  title = sanitizeString(title);
  description = sanitizeString(description);
  price_range = sanitizeString(price_range);
  comission = Number(comission);
  if (!title || !description || !price_range || !Number.isInteger(comission)) {
    return res.status(400).json({ message: 'Champs manquants ou invalides.' });
  }

  let connection;
  try {
    connection = await getDbConnection();
    const [result] = await connection.execute(
      'INSERT INTO offre (title, description, price_range, comission, id_user) VALUES (?, ?, ?, ?, ?)',
      [title, description, price_range, comission, req.user.id_user]
    );
    res.status(201).json({ message: 'Offre créée', id_offre: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'offre.' });
  } finally {
    if (connection) await connection.end();
  }
});

// Visualisation d'une offre (étudiant ou startup propriétaire)
app.get('/api/offre/:id', authenticateToken, async (req, res) => {
  const id_offre = Number(req.params.id);
  if (!Number.isInteger(id_offre) || id_offre <= 0) return res.status(400).json({ message: 'ID d\'offre invalide.' });

  let connection;
  try {
    connection = await getDbConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM offre WHERE id_offre = ?',
      [id_offre]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Offre non trouvée.' });

    const offre = rows[0];
    // Autorisé si étudiant OU startup propriétaire
    if (
      req.user.user_type === 'studiant' ||
      (req.user.user_type === 'startup' && req.user.id_user === offre.id_user)
    ) {
      res.json(offre);
    } else {
      res.status(403).json({ message: 'Accès refusé.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'offre.' });
  } finally {
    if (connection) await connection.end();
  }
});

// Modification d'une offre (startup propriétaire uniquement)
app.put('/api/offre/:id', authenticateToken, async (req, res) => {
  if (req.user.user_type !== 'startup') return res.status(403).json({ message: 'Accès refusé' });
  const id_offre = Number(req.params.id);
  if (!Number.isInteger(id_offre) || id_offre <= 0) return res.status(400).json({ message: 'ID d\'offre invalide.' });

  let { title, description, price_range, comission } = req.body;
  title = title !== undefined ? sanitizeString(title) : undefined;
  description = description !== undefined ? sanitizeString(description) : undefined;
  price_range = price_range !== undefined ? sanitizeString(price_range) : undefined;
  comission = comission !== undefined ? parseInt(comission, 10) : undefined;

  let connection;
  try {
    connection = await getDbConnection();
    // Vérifie que l'offre appartient à la startup
    const [rows] = await connection.execute(
      'SELECT id_user FROM offre WHERE id_offre = ?',
      [id_offre]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Offre non trouvée.' });
    if (rows[0].id_user !== req.user.id_user) return res.status(403).json({ message: 'Accès refusé.' });

    const fields = [];
    const values = [];
    if (title !== undefined) { fields.push('title = ?'); values.push(title); }
    if (description !== undefined) { fields.push('description = ?'); values.push(description); }
    if (price_range !== undefined) { fields.push('price_range = ?'); values.push(price_range); }
    if (comission !== undefined && !isNaN(comission)) { fields.push('comission = ?'); values.push(comission); }
    if (fields.length === 0) {
      return res.status(400).json({ message: 'Aucune donnée à mettre à jour.' });
    }
    values.push(id_offre);
    const sql = `UPDATE offre SET ${fields.join(', ')} WHERE id_offre = ?`;
    const [result] = await connection.execute(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Offre non trouvée.' });
    }
    res.json({ message: 'Offre mise à jour.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'offre.' });
  } finally {
    if (connection) await connection.end();
  }
});

// Liste d'offres avec filtres (étudiant : tout, startup : seulement ses offres)
app.get('/api/offres', authenticateToken, async (req, res) => {
  const {
    days,
    title,
    comission_min,
    comission_max,
    price_range
  } = req.query;

  let where = [];
  let params = [];

  // Filtre date de création (moins de X jours)
  if (days && !isNaN(parseInt(days, 10))) {
    where.push('o.created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)');
    params.push(parseInt(days, 10));
  }
  // Filtre titre (contient)
  if (title) {
    where.push('o.title LIKE ?');
    params.push(`%${title}%`);
  }
  // Filtre commission min
  if (comission_min && !isNaN(parseInt(comission_min, 10))) {
    where.push('o.comission >= ?');
    params.push(parseInt(comission_min, 10));
  }
  // Filtre commission max
  if (comission_max && !isNaN(parseInt(comission_max, 10))) {
    where.push('o.comission <= ?');
    params.push(parseInt(comission_max, 10));
  }
  // Filtre price_range (contient)
  if (price_range) {
    where.push('o.price_range LIKE ?');
    params.push(`%${price_range}%`);
  }

  // Restriction selon le type d'utilisateur
  if (req.user.user_type === 'startup') {
    where.push('o.id_user = ?');
    params.push(req.user.id_user);
  } else if (req.user.user_type !== 'studiant') {
    return res.status(403).json({ message: 'Accès refusé.' });
  }

  let sql = `
    SELECT 
      o.id_offre,
      o.title,
      LEFT(o.description, 100) AS description,
      s.name AS startup_name,
      o.price_range,
      o.comission,
      o.created_at
    FROM offre o
    JOIN startup s ON o.id_user = s.id_user
  `;
  if (where.length > 0) {
    sql += ' WHERE ' + where.join(' AND ');
  }
  sql += ' ORDER BY o.created_at DESC';

  let connection;
  try {
    connection = await getDbConnection();
    const [rows] = await connection.execute(sql, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des offres.' });
  } finally {
    if (connection) await connection.end();
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
