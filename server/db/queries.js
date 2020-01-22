const mongoose = require('./mongoose')
const User = require('./models/User')

exports.findUser = async function(userId){
    const user = await User.find({
        _id: userId
    })
    return await {
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        age: user[0].age,
        status: user[0].status,
        desiredRelationship: user[0].desiredRelationship,
        gender: user[0].gender,
        pic: user[0].picture
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