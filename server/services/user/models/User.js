const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  zipCode: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  country: { type: String, required: true },
  fDisabled: { type: Boolean, default: false },
  role: { type: String, default: "user", enum: ["user", "admin"] },
  password: { type: String, required: true }
});

module.exports = mongoose.model('user', User);




