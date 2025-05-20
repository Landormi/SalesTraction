import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise'; // MariaDB client

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

// Simple sanitize utility
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
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
      [email, password, 'studiant']
    );
    const userId = userResult.insertId;
    // Création du profil étudiant
    await connection.execute(
      'INSERT INTO studiant (linkedin_url, birthday, university, created_at, description, id_user) VALUES (?, ?, ?, NOW(), ?, ?)',
      [linkedin_url || null, birthday, university || null, description, userId]
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

      [email, password, 'startup']
    );
    const userId = userResult.insertId;
    // Création du profil startup
    await connection.execute(
      'INSERT INTO startup (linkedin_url, name, siret, created_at, status, id_user) VALUES (?, ?, ?, NOW(), ?, ?)',

      [linkedin_url || null, name, siret, status, userId]
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
      [email, password, 'studiant']
    );
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = rows[0];
    const token = generateToken(user);
    res.json({ token, user });
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
      [email, password, 'startup']
    );
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = rows[0];
    const token = generateToken(user);
    res.json({ token, user });
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

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
