const mongoose = require('mongoose');
const dns = require('dns');

/**
 * Educational Callout (Session 11):
 * Setting DNS servers ensures proper MongoDB Atlas SRV resolution.
 * `dbConnect` establishes the Mongoose connection using environment variables from process.env.
 */
dns.setServers(['8.8.8.8', '8.8.4.4']);

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME || 'ecu_ecommerce'
    });
    console.log('[Database] MongoDB Connected Successfully');
  } catch (error) {
    console.log(`[Database Error] Connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = dbConnect;
