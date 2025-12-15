import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'yourpassword',
      database: 'ulterion'
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    await connection.end();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'yourpassword',
      database: 'ulterion'
    });

    const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ userId: user.user_id, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });

    await connection.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;