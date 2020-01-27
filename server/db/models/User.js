const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email:String,
  password:String,
  status: String,
  desiredRelationship: String,
  interestedIn: Array,
  gender: String,
  picture: String,
  isCheckedIn: Boolean,
  isDeleted: Boolean
});

const User = mongoose.model("User", userSchema);
module.exports = User;
