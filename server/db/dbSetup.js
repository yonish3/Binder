const mongoose = require('./mongoose')
const User = require('./models/User')

exports.dbSetup = async function() {
    const dbPromises = []

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