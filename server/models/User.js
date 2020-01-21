const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: Number,
  age: Number,
  status: String,
  desiredRelationship: String,
  interestedIn: Array,
  gender: String,
  picture: String,
  isCheckedIn: Boolean,
  isDeleted: Boolean
});

const User = mongoose.model("User", userSchema);
module.exports = Transaction;