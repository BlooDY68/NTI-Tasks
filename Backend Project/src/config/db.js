const mongoose = require('mongoose');
const dns = require('dns');

/**
 * Educational Callout (Session 11):
 * Setting public DNS servers (8.8.8.8, 8.8.4.4) ensures Node.js can resolve 
 * MongoDB Atlas SRV connection strings ('mongodb+srv://') on Windows operating systems
 * where local ISP DNS servers sometimes fail to parse SRV records.
 */
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`[Database] MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
