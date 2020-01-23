const dotenv = require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const api = require("./server/routes/api.js");
const errorHandler = require('./server/middlewares/errorHandler/errorHandler')
const config = require('./config/config')
// const dbSetup = require('./server/db/dbSetup')
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const axios = require("axios")
const apiKey = process.env.GOOGLE_MAP_API_KEY //move through config
const controller = require('./server/middlewares/controllers/controller')
const queries = require('./server/db/queries')
const users = require('./dummyData').users
const userIds = require('./dummyData').userIds
const port = process.env.PORT || 4000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", api);
app.use(errorHandler)


io.on('connection', function (socket) {
    console.log('user has connected')
    
    socket.on('userId', (userId) => {
        const userInfo = queries.findUser(userIds.pop())
        userInfo.then( resolvedUserInfo => {
            console.log(`userId is ${userId}, socketId is ${socket.id}`);
          resolvedUserInfo.socketId = socket.id
          users.push(resolvedUserInfo)
          socket.emit('userInfo', userInfo)
        })

        // socket.emit(`allUsers`, users);
        // console.log('user id socket works')
    })
    
    
    

    // let len = users.length
    
    // socket.emit(`allUsers`, users);

    socket.on('GPSlocation', async (GPSlocation) => {
        console.log('GPS location received: ' + GPSlocation.lat, GPSlocation.lng)

        const nearLocations = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${GPSlocation.lat},${GPSlocation.lng}&radius=100&type=bar&key=${apiKey}`);
        // let places = []
        let places = nearLocations.data.results.map(itemName => ({ name: itemName.name, id: itemName.place_id }))
        // console.log(places)

        socket.emit(`locationsArry`, places);
    })
    
    socket.on('selectedLocation', (selectedLocation) => {
        console.log('Selected location received: ' + selectedLocation)
        let usersNearUser = []
        let newUser = {}
        users.forEach(u => {
            if (u.location === selectedLocation) {
                usersNearUser.push(u)
            }
            if (u.socketId === socket.id) {
                u.location = selectedLocation
                newUser = u
            }
        })
        socket.emit(`usersNearMe`, usersNearUser)
        usersNearUser.push(newUser)
console.log('newUser is ', newUser);

        for (let i = 0; i < usersNearUser.length-1; i++) {
            const usersToSend = [...usersNearUser.filter( user => user.socketId != usersNearUser[i].socketId)]
            io.to(`${usersNearUser[i].socketId}`).emit('usersNearMe', usersToSend);
        }
    })

    socket.on('reaction', (reactionObj) => {
        console.log(`destinationSocket is`, reactionObj)
        io.to(`${reactionObj.destinationUser.socketId}`).emit('reaction recieved', reactionObj);

        // socket.emit(`users`, usersNearUser)
        // socket.emit(`allUsers`, users);
    })

    socket.on('disconnect', function () {
        console.log('user disconnected');
        let location
        for (let i = 0; i < users.length; i++) {
            if (users[i].socketId === socket.id) {
                location = users[i].location
                console.log(`deleting user ${users[i].userId}`)
                users.splice(i, 1);
            }
        }
        
        for (let i = 0; i < users.length; i++) {
            const usersToSend = [...users.filter( user => user.socketId != users[i].socketId && user.location == location )]
            io.to(`${users[i].socketId}`).emit('usersNearMe', usersToSend);
        }
    });
});

app.get('*', function(req,res){
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

http.listen(port, function () {
    console.log('listening on *:8080');
});