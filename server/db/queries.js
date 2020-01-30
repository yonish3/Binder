const mongoose = require('./mongoose')
const User = require('./models/User')
const Notification = require('./models/Notification')

exports.findUser = async function(userId){
    const user = await User.find({
        _id: userId
    })
    return await {
        _id: user[0]._id,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        age: user[0].age,
        status: user[0].status,
        desiredRelationship: user[0].desiredRelationship,
        gender: user[0].gender,
        picture: user[0].picture
    }
}

exports.deleteUser = async function(userId){
    const deletedUser = await User.remove({
        _id: userId
    })
    console.log(deletedUser.deletedCount)
    if (deletedUser.deletedCount != 0) {
        return deletedUser.deletedCount 
    } else {
        throw new Error('Couldn\'t find user')
    }
}

exports.addNotification = async function(notification){
    const newNotification = new Notification({
        // userId: ObjectId,
        // senderName: String,
        // emoji: String,
        time: new Date(),
        text: notification
        // isRead: Boolean
    })
    await newNotification.save()
    // try {
    // } catch(err) {
        // throw
    // }
}