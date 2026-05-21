require('dotenv').config();
const express       = require('express');
const cors          = require('cors');
const { connectDB } = require('./config/db');
const userRoutes    = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');

const app  = express();
let PORT = process.env.PORT || 5001;
if (PORT === '5000' || PORT === 5000) {
  PORT = 5001;
}

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Dynamically allow any origin to support localhost, Vercel previews, and Firebase Hosting
    callback(null, true);
  },
  credentials:     true,
  methods:         ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders:  ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// ── Database Connection Middleware ────────────────────────────────────────────
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Roommate Finder API is running ✅' });
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/users',    userRoutes);
app.use('/listings', listingRoutes);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error:   process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// ── Start ─────────────────────────────────────────────────────────────────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;

