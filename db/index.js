/* eslint-disable indent*/
const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGO_URL;

const db = mongoose.connect(url, {
  dbName: 'db-contacts',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', err => {
  console.log('Database connection successful');
});

mongoose.connection.on('error', err => {
  console.log(`Mongoose connection error: ${err.message}`);
});
mongoose.connection.on('disconnected', err => {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Connection for DB disconnected and app terminated');
    process.exit(1);
  });
});

module.exports = db;
