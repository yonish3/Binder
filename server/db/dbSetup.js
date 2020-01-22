const mongoose = require('./mongoose')
const User = require('./models/User')

exports.dbSetup = async function() {
    const dbPromises = []
    const dummyData =  [
        {
            firstName: "Bruce",
            lastName: "Wayne",
            age: 32,
            status: "Single",
            desiredRelationship: "Serious Relationship",
            interestedIn: ["Women"],
            gender: "Male",
            picture: "thisIsAtest",
            isCheckedIn: true,
            isDeleted: false   
        },
        {
            firstName: "Clark",
            lastName: "Kent",
            age: 35,
            status: "Single",
            desiredRelationship: "Serious Relationship",
            interestedIn: ["Women"],
            gender: "Male",
            picture: "thisIsAtest",
            isCheckedIn: true,
            isDeleted: false   
        },
        {
            firstName: "Princess",
            lastName: "Dianna",
            age: 28,
            status: "Single",
            desiredRelationship: "Serious Relationship",
            interestedIn: ["Men"],
            gender: "Female",
            picture: "thisIsAtest",
            isCheckedIn: true,
            isDeleted: false   
        },
        {
            firstName: "Barry",
            lastName: "Allen",
            age: 25,
            status: "Single",
            desiredRelationship: "Hookups",
            interestedIn: ["Men"],
            gender: "Male",
            picture: "thisIsAtest",
            isCheckedIn: true,
            isDeleted: false   
        }
    ]

    const dbData = dummyData.map( person => new User({
        firstName: person.firstName,
        lastName: person.lastName,
        age: person.age,
        status: person.status,
        desiredRelationship: person.desiredRelationship,
        interestedIn: person.interestedIn,
        gender: person.gender,
        picture: person.picture,
        isCheckedIn: person.isCheckedIn,
        isDeleted: person.isDeleted
}))
    
    dbData.forEach( person => {
        dbPromises.push(
            person.save( function(err, data){
                if(err){
                    console.log()
                }
                else {
                    console.log(data)
                }
            }))
        })
    
        await Promise.all(dbPromises)
    }