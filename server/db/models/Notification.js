const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  userId: ObjectId,
  senderName: String,
  emoji: String,
  time: Date,
  isRead: Boolean
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;