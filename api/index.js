import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
const app = express();
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: process.env.DB_HOST,
  database: 'edintel_db',
  password: process.env.DB_PASS,
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

// Admin Log Stream - See the latest 50 school site actions
app.get('/admin/logs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 50');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/status/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const query = `
      SELECT u.trial_start_at, t.balance, u.tier 
      FROM users u 
      LEFT JOIN usage_tokens t ON u.id = t.user_id 
      WHERE u.id = $1`;
    const result = await pool.query(query, [userId]);
    if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
    const user = result.rows[0];
    const trialDaysLeft = Math.max(0, 30 - Math.floor((new Date() - new Date(user.trial_start_at)) / (1000 * 60 * 60 * 24)));
    res.json({ tier: user.tier, tokens_remaining: user.balance || 0, days_remaining: trialDaysLeft });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/revenue', async (req, res) => {
  try {
    const result = await pool.query('SELECT tier FROM users');
    const pricing = { 'Site Command': 79.00, 'Director Pack': 69.00, 'Practitioner': 49.00, 'Sovereign Pack': 39.00, 'Standard Pack': 9.00, 'Sovereign Initiate': 0.00 };
    let total = result.rows.reduce((sum, row) => sum + (pricing[row.tier] || 0), 0);
    res.json({ total_users: result.rows.length, mrr: `$${total.toFixed(2)}` });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default app;