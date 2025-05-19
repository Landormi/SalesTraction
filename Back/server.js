import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import { Pool } from 'pg'; // PostgreSQL client

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO user_ (email, password_hash, user_type) VALUES ($1, $2, $3) RETURNING id_user',
      [email, password, role]
    );
    res.status(201).json({ message: 'User created', userId: result.rows[0].id_user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT id_user FROM user_ WHERE email = $1 AND password_hash = $2',
      [email, password]
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const userId = result.rows[0].id_user;
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
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
  try {
    let query = 'SELECT * FROM offre';
    const params = [];
    if (status || startup_id) {
      query += ' WHERE';
      if (status) {
        params.push(status);
        query += ` status = $${params.length}`;
      }
      if (startup_id) {
        if (params.length > 0) query += ' AND';
        params.push(startup_id);
        query += ` id_startup = $${params.length}`;
      }
    }
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching offers' });
  }
});

app.post('/api/offers', async (req, res) => {
  const { title, description, startupId } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO offre (title, description, id_startup, status, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id_offre',
      [title, description, startupId, 'open']
    );
    res.status(201).json({ message: 'Offer created', offerId: result.rows[0].id_offre });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating offer' });
  }
});

app.get('/api/offers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM offre WHERE id_offre = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching offer' });
  }
});

app.put('/api/offers/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE offre SET title = COALESCE($1, title), description = COALESCE($2, description), status = COALESCE($3, status) WHERE id_offre = $4',
      [title, description, status, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.json({ message: 'Offer updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating offer' });
  }
});

// Applications Routes
app.post('/api/applications', async (req, res) => {
  const { offerId, userId, cvUrl, message } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO application (id_offre, id_user, cv_url, message, status, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id_application',
      [offerId, userId, cvUrl, message, 'pending']
    );
    res.status(201).json({ message: 'Application submitted', applicationId: result.rows[0].id_application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting application' });
  }
});

app.get('/api/applications', async (req, res) => {
  const { user_id, offer_id } = req.query;
  try {
    let query = 'SELECT * FROM application';
    const params = [];
    if (user_id || offer_id) {
      query += ' WHERE';
      if (user_id) {
        params.push(user_id);
        query += ` id_user = $${params.length}`;
      }
      if (offer_id) {
        if (params.length > 0) query += ' AND';
        params.push(offer_id);
        query += ` id_offre = $${params.length}`;
      }
    }
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// Admin Routes
app.get('/api/admin/startups/unverified', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM startup WHERE is_verified = false');
    res.json(result.rows.map(s => ({
      id: s.id_startup,
      name: s.name,
      email: s.email,
      createdAt: s.created_at,
    })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching unverified startups' });
  }
});

app.post('/api/admin/startups/:id/verify', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE startup SET is_verified = true WHERE id_startup = $1',
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Startup not found' });
    }
    res.json({ message: 'Startup verified' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error verifying startup' });
  }
});

app.get('/api/admin/stats', async (req, res) => {
  try {
    const usersCount = await pool.query('SELECT COUNT(*) FROM user_');
    const startupsCount = await pool.query('SELECT COUNT(*) FROM startup');
    const offersCount = await pool.query('SELECT COUNT(*) FROM offre');
    const applicationsCount = await pool.query('SELECT COUNT(*) FROM application');
    res.json({
      users: parseInt(usersCount.rows[0].count, 10),
      startups: parseInt(startupsCount.rows[0].count, 10),
      offers: parseInt(offersCount.rows[0].count, 10),
      applications: parseInt(applicationsCount.rows[0].count, 10),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
