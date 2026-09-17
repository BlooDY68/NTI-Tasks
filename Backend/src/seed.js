require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');
const fs = require('fs');
const path = require('path');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');

const prodDir = path.join(__dirname, '../uploads/products');
const userDir = path.join(__dirname, '../uploads/users');
if (!fs.existsSync(prodDir)) fs.mkdirSync(prodDir, { recursive: true });
if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });

const dummyPng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64');
const defProd = path.join(prodDir, 'default-product.png');
const defUser = path.join(userDir, 'default-avatar.png');
if (!fs.existsSync(defProd)) fs.writeFileSync(defProd, dummyPng);
if (!fs.existsSync(defUser)) fs.writeFileSync(defUser, dummyPng);

async function seed() {
  try {
    console.log('[Seed] Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME || 'ecu_ecommerce'
    });
    console.log('[Seed] Connected.');

    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('[Seed] Cleared existing data.');

    const admin = await User.create({
      name: 'System Admin',
      email: 'admin@ecu.edu',
      password: 'admin12345',
      role: 'Admin',
      profileImage: '/uploads/users/default-avatar.png'
    });

    const customer = await User.create({
      name: 'Hazem Customer',
      email: 'customer@ecu.edu',
      password: 'customer12345',
      role: 'Customer',
      profileImage: '/uploads/users/default-avatar.png'
    });

    console.log(`[Seed] Created Users:\n - Admin: admin@ecu.edu (PW: admin12345)\n - Customer: customer@ecu.edu (PW: customer12345)`);

    const catElectronics = await Category.create({
      name: 'Electronics & Gadgets',
      description: 'Cutting-edge consumer tech, smart home devices, and audio gear.'
    });

    const catComputers = await Category.create({
      name: 'Laptops & Computers',
      description: 'High-performance work laptops, gaming rigs, and accessories.'
    });

    const catAudio = await Category.create({
      name: 'Headphones & Audio',
      description: 'Noise-cancelling wireless headphones, earbuds, and home audio.'
    });

    console.log('[Seed] Created 3 Categories.');

    const productsData = [
      {
        name: 'Sony WH-1000XM5 Wireless Headphones',
        description: 'Industry-leading noise cancelling with dual processors and 8 microphones for exceptional call and audio quality.',
        price: 349.99,
        category: catAudio._id,
        brand: 'Sony',
        stock: 18,
        image: '/uploads/products/default-product.png'
      },
      {
        name: 'Apple MacBook Pro 14" M3 Pro',
        description: 'Blazing-fast unified memory, stunning Liquid Retina XDR display, and up to 18 hours of all-day battery life.',
        price: 1999.00,
        category: catComputers._id,
        brand: 'Apple',
        stock: 8,
        image: '/uploads/products/default-product.png'
      },
      {
        name: 'Dell XPS 15 OLED InfinityEdge',
        description: 'High-precision machining, 3.5K OLED touchscreen display, and Intel Core i7 13th Gen processing power.',
        price: 1549.50,
        category: catComputers._id,
        brand: 'Dell',
        stock: 12,
        image: '/uploads/products/default-product.png'
      },
      {
        name: 'Samsung Galaxy Watch 6 Classic',
        description: 'Advanced sleep tracking, heart rate monitoring, rotating bezel, and durable sapphire crystal glass.',
        price: 299.99,
        category: catElectronics._id,
        brand: 'Samsung',
        stock: 25,
        image: '/uploads/products/default-product.png'
      },
      {
        name: 'Bose QuietComfort Ultra Earbuds',
        description: 'Breakthrough spatial audio for immersive listening, world-class active noise cancellation, and CustomTune technology.',
        price: 279.00,
        category: catAudio._id,
        brand: 'Bose',
        stock: 14,
        image: '/uploads/products/default-product.png'
      },
      {
        name: 'Anker 737 Power Bank (PowerCore 24K)',
        description: 'Ultra-powerful two-way charging with 140W fast output, smart digital display, and 24,000mAh capacity.',
        price: 109.99,
        category: catElectronics._id,
        brand: 'Anker',
        stock: 30,
        image: '/uploads/products/default-product.png'
      }
    ];

    await Product.insertMany(productsData);
    console.log(`[Seed] Seeded ${productsData.length} products.`);

    console.log('[Seed] Database seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('[Seed Error]:', err.message);
    process.exit(1);
  }
}

seed();
