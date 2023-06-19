const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  accountType: { type: String, required: true },
  id: { type: String, required: true },
  thumbnail: { type: String, required: false },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
