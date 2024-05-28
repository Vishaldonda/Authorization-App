const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  phone: { type: String },
  image: { type: String },
  isAdmin: { type: Boolean, default: false },
  isPublic: { type: Boolean, default: true },
});

module.exports = mongoose.model('User', UserSchema);
