/**
 * Local Development Server for API Endpoints
 * 
 * This server allows you to test Vercel Serverless Functions locally
 * during development without deploying to Vercel.
 * 
 * Usage:
 *   1. Build the frontend: npm run build
 *   2. Copy this file: cp server.example.js server.js
 *   3. Run the server: node server.js
 *   4. Access at: http://localhost:3000
 * 
 * Note: Make sure your .env file is properly configured with
 * GMAIL_USER, GMAIL_PASS, and other required environment variables.
 */

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
dotenv.config();

// ES Module equivalents for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// Enable CORS for local development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from dist directory (built frontend)
app.use(express.static(join(__dirname, 'dist')));

// Import API handlers
import sendTicketHandler from './api/sendTicket.js';
import regCountsHandler from './api/regCounts.js';

// API Routes
app.post('/api/sendTicket', async (req, res) => {
  try {
    await sendTicketHandler(req, res);
  } catch (error) {
    console.error('[Server] Error in /api/sendTicket:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.get('/api/regCounts', async (req, res) => {
  try {
    await regCountsHandler(req, res);
  } catch (error) {
    console.error('[Server] Error in /api/regCounts:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Fallback to index.html for SPA routing
// This ensures React Router works correctly
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      console.error('[Server] Error serving index.html:', err);
      res.status(500).send('Error loading application');
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Server] Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log('\n==============================================');
  console.log('  Shilpkala 2025 - Local Development Server');
  console.log('==============================================');
  console.log(`  Server: http://localhost:${PORT}`);
  console.log(`  API Endpoints:`);
  console.log(`    - POST http://localhost:${PORT}/api/sendTicket`);
  console.log(`    - GET  http://localhost:${PORT}/api/regCounts`);
  console.log(`    - GET  http://localhost:${PORT}/api/health`);
  console.log('==============================================\n');
  console.log('  Press Ctrl+C to stop the server\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n[Server] SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n[Server] SIGINT received, shutting down gracefully...');
  process.exit(0);
});
