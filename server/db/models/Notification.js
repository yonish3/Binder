const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  userId: String,
  senderName: String,
  emoji: String,
  time: Date,
  isRead: Boolean,
  text: String
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;