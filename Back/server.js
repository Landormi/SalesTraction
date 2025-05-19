import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise'; // MariaDB client

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, role } = req.body;
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    const [result] = await connection.execute(
      'INSERT INTO user_ (email, password_hash, user_type) VALUES (?, ?, ?)',
      [email, password, role]
    );
    res.status(201).json({ message: 'User created', userId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  } finally {
    if (connection) await connection.end();
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    const [rows] = await connection.execute(
      'SELECT id_user FROM user_ WHERE email = ? AND password_hash = ?',
      [email, password]
    );
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const userId = rows[0].id_user;
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  } finally {
    if (connection) await connection.end();
  }
});

app.post('/api/auth/logout', (req, res) => {
  // Token invalidation logic (e.g., blacklist)
  res.json({ message: 'Logout successful' });
});

app.get('/api/auth/google/start', (req, res) => {
  // Redirect to Google OAuth login
  res.redirect('https://accounts.google.com/o/oauth2/v2/auth');
});

app.get('/api/auth/google/callback', (req, res) => {
  // Mock response for Google OAuth callback
  res.json({ email: 'user@gmail.com', firstname: 'John', lastname: 'Doe' });
});

app.get('/api/auth/linkedin/start', (req, res) => {
  // Redirect to LinkedIn OAuth login
  res.redirect('https://www.linkedin.com/oauth/v2/authorization');
});

app.get('/api/auth/linkedin/callback', (req, res) => {
  // Mock response for LinkedIn OAuth callback
  res.json({ email: 'user@linkedin.com', linkedin_id: '12345', firstname: 'Jane', lastname: 'Doe' });
});

app.get('/api/offers', async (req, res) => {
  const { status, startup_id } = req.query;
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    let query = 'SELECT * FROM offre';
    const params = [];
    if (status || startup_id) {
      query += ' WHERE';
      if (status) {
        params.push(status);
        query += ` status = ?`;
      }
      if (startup_id) {
        if (params.length > 0) query += ' AND';
        params.push(startup_id);
        query += ` id_startup = ?`;
      }
    }
    const [rows] = await connection.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching offers' });
  } finally {
    if (connection) await connection.end();
  }
});

app.post('/api/offers', async (req, res) => {
  const { title, description, startupId } = req.body;
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    const [result] = await connection.execute(
      'INSERT INTO offre (title, description, id_startup, status, created_at) VALUES (?, ?, ?, ?, NOW())',
      [title, description, startupId, 'open']
    );
    res.status(201).json({ message: 'Offer created', offerId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating offer' });
  } finally {
    if (connection) await connection.end();
  }
});

app.get('/api/offers/:id', async (req, res) => {
  const { id } = req.params;
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    const [rows] = await connection.execute('SELECT * FROM offre WHERE id_offre = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching offer' });
  } finally {
    if (connection) await connection.end();
  }
});

app.put('/api/offers/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    const [result] = await connection.execute(
      'UPDATE offre SET title = COALESCE(?, title), description = COALESCE(?, description), status = COALESCE(?, status) WHERE id_offre = ?',
      [title, description, status, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.json({ message: 'Offer updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating offer' });
  } finally {
    if (connection) await connection.end();
  }
});

// Applications Routes
app.post('/api/applications', async (req, res) => {
  const { offerId, userId, cvUrl, message } = req.body;
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    const [result] = await connection.execute(
      'INSERT INTO application (id_offre, id_user, cv_url, message, status, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [offerId, userId, cvUrl, message, 'pending']
    );
    res.status(201).json({ message: 'Application submitted', applicationId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting application' });
  } finally {
    if (connection) await connection.end();
  }
});

app.get('/api/applications', async (req, res) => {
  const { user_id, offer_id } = req.query;
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    let query = 'SELECT * FROM application';
    const params = [];
    if (user_id || offer_id) {
      query += ' WHERE';
      if (user_id) {
        params.push(user_id);
        query += ` id_user = ?`;
      }
      if (offer_id) {
        if (params.length > 0) query += ' AND';
        params.push(offer_id);
        query += ` id_offre = ?`;
      }
    }
    const [rows] = await connection.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching applications' });
  } finally {
    if (connection) await connection.end();
  }
});

// Admin Routes
app.get('/api/admin/startups/unverified', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    const [rows] = await connection.execute('SELECT * FROM startup WHERE is_verified = false');
    res.json(rows.map(s => ({
      id: s.id_startup,
      name: s.name,
      email: s.email,
      createdAt: s.created_at,
    })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching unverified startups' });
  } finally {
    if (connection) await connection.end();
  }
});

app.post('/api/admin/startups/:id/verify', async (req, res) => {
  const { id } = req.params;
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    const [result] = await connection.execute(
      'UPDATE startup SET is_verified = true WHERE id_startup = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Startup not found' });
    }
    res.json({ message: 'Startup verified' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error verifying startup' });
  } finally {
    if (connection) await connection.end();
  }
});

app.get('/api/admin/stats', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    const [usersCount] = await connection.execute('SELECT COUNT(*) AS count FROM user_');
    const [startupsCount] = await connection.execute('SELECT COUNT(*) AS count FROM startup');
    const [offersCount] = await connection.execute('SELECT COUNT(*) AS count FROM offre');
    const [applicationsCount] = await connection.execute('SELECT COUNT(*) AS count FROM application');
    res.json({
      users: usersCount[0].count,
      startups: startupsCount[0].count,
      offers: offersCount[0].count,
      applications: applicationsCount[0].count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching stats' });
  } finally {
    if (connection) await connection.end();
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
