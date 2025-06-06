let mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => { }).catch((err) => {
  console.error('MongoDB connection error:', err);
});
var conn = mongoose.connection;

conn.on('connected', () => {
  console.log('MongoDB connected successfully');
});
conn.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
conn.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

module.exports = conn; 
