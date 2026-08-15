require('dotenv').config();
const app = require('./app');
const dbConnect = require('./config/db-connect');

/**
 * Educational Callout (Session 10 & 11):
 * Loads environment variables, connects to MongoDB via db-connect.js, and starts Express server.
 */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await dbConnect();
  
  app.listen(PORT, () => {
    console.log(`[Server] E-Commerce API Server running on port ${PORT}`);
  });
};

startServer();
