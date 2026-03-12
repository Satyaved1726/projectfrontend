/**
 * CORS Proxy Server for TRINETRA Backend
 * This server acts as a middleware to handle CORS for your backend API
 * 
 * Installation:
 * npm install express cors axios dotenv
 * 
 * Usage:
 * node server.js
 * 
 * Then update frontend .env to:
 * REACT_APP_API_URL=http://localhost:5000
 * (or your deployed URL)
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// The actual backend URL
const BACKEND_URL = process.env.BACKEND_URL || 'https://project1-backend.onrender.com';

console.log(`🚀 CORS Proxy Server starting...`);
console.log(`📍 Proxy listening on: http://localhost:${PORT}`);
console.log(`🔗 Forwarding requests to: ${BACKEND_URL}`);

// ===== CORS CONFIGURATION =====
const corsOptions = {
  origin: [
    'https://projectfrontend17.vercel.app',
    'http://localhost:3000',
    'http://localhost:8080',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:8080'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  maxAge: 86400
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== LOGGING MIDDLEWARE =====
app.use((req, res, next) => {
  console.log(`\n📨 ${req.method} ${req.path}`);
  console.log(`📤 From: ${req.get('origin')}`);
  next();
});

// ===== HEALTH CHECK =====
app.get('/health', (req, res) => {
  res.json({ status: 'CORS Proxy Server is running ✅', backend: BACKEND_URL });
});

// ===== PROXY ALL API REQUESTS =====
app.all('/api/*', async (req, res) => {
  try {
    const path = req.path;
    const url = `${BACKEND_URL}${path}`;
    
    console.log(`🔄 Proxying to: ${url}`);

    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
        ...req.headers,
      },
      withCredentials: true,
      timeout: 30000
    });

    console.log(`✅ Response: ${response.status}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    
    if (error.response) {
      // Backend responded with error
      console.error(`📍 Backend status: ${error.response.status}`);
      res.status(error.response.status).json(error.response.data);
    } else if (error.code === 'ECONNREFUSED') {
      console.error(`❌ Cannot connect to backend at ${BACKEND_URL}`);
      res.status(503).json({ 
        error: 'Backend server is not responding',
        details: `Cannot connect to ${BACKEND_URL}`,
        message: 'Please ensure the backend is running'
      });
    } else {
      console.error(`⚠️ ${error.code}: ${error.message}`);
      res.status(500).json({ 
        error: 'Proxy server error',
        message: error.message 
      });
    }
  }
});

// ===== 404 HANDLER =====
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.path });
});

// ===== ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error(`🔴 Unhandled Error:`, err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║  ✅ CORS Proxy Server is running!                          ║
║  📍 URL: http://localhost:${PORT}                          ║
║  🔗 Backend: ${BACKEND_URL}                                  ║
║  💻 Frontend can now access: http://localhost:${PORT}/api   ║
╚════════════════════════════════════════════════════════════╝
  `);
});
