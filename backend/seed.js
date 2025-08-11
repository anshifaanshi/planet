const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');
const Event = require('./models/Event');
const User = require('./models/User');

async function seed(){
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany();
  await Event.deleteMany();
  await User.deleteMany();

  const admin = await User.create({ name: 'Admin', email: 'admin@demo.com', password: 'password', isAdmin: true });

  await Product.create([
    { name: 'Custom T-shirt', description: 'Demo T-shirt', price: 30, stock: 10 },
    { name: 'Sticker Pack', description: 'Set of stickers', price: 5, stock: 50 }
  ]);

  await Event.create([
    { title: 'Meet & Greet', description: 'Community meetup', date: new Date(Date.now() + 7*24*3600*1000), venue: 'Hall A', price: 20, ticketsAvailable: 50 },
    { title: 'Workshop', description: 'Skill workshop', date: new Date(Date.now() + 14*24*3600*1000), venue: 'Hall B', price: 50, ticketsAvailable: 30 }
  ]);

  console.log('Seed done');
  process.exit();
}

seed();