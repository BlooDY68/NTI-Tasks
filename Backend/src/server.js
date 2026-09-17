require('dotenv').config();
const app = require('./app');
const dbConnect = require('./config/db-connect');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await dbConnect();

  app.listen(PORT, () => {
    console.log(`[Server] E-Commerce API Server running on port ${PORT}`);
  });
};

startServer();
