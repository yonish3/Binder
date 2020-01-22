const dotenv = require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const api = require("./server/routes/api.js");
const errorHandler = require('./server/middlewares/errorHandler/errorHandler')
const config = require('./config/config')
const port = 8080
const dbSetup = require('./server/db/dbSetup')
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/", api);

let users = [
    { userId: '123', socketId: '123', location: 'Elevation' },
    { userId: 'qwe', socketId: 'qwe', location: 'Spotnic' },
    { userId: '456', socketId: '456', location: 'Super Pharm' },
]

let locationsArry = ['Elevation', 'Super Pharm', 'Spotnic']

io.on('connection', function (socket) {
    console.log('user has connected')
    users.push({
        socketId: socket.id,
        userId: null,
        location: null
    })
    let len = users.length
    socket.emit(`allUsers`, users);
    socket.on('userId', (userId) => {
        users.forEach(u => {
            if (u.socketId === socket.id) {
                u.userId = userId
                return
            }
        })
        socket.emit(`userId`, userId);
        socket.emit(`allUsers`, users);
        console.log('user id socket works')
    })
    socket.on('GPSlocation', (GPSlocation) => {
        console.log('GPS location recived: ' + GPSlocation)
        //API and getting locations from Google
        socket.emit(`locationsArry`, locationsArry);
    })
    socket.on('selectedLocation', (selectedLocation) => {
        console.log('Selected location recived: ' + selectedLocation)
        let usersNearUser = []
        users.forEach(u => {
            if (u.location === selectedLocation) {
                usersNearUser.push(u)
            }
            if (u.socketId === socket.id) {
                u.location = selectedLocation
            }
        })
        socket.emit(`users`, usersNearUser)
        socket.emit(`allUsers`, users);
    })
    socket.on('disconnect', function () {
        console.log('user disconnected');
        for (let i = 0; i < users.length; i++) {
            if (users[i].socketId === socket.id) {
                console.log(`deleting user ${users[i].userId}`)
                users.splice(i, 1);
            }
        }
        socket.emit(`allUsers`, users);
        io.emit('exit', users);
    });
});

http.listen(8080, function () {
    console.log('listening on *:8080');
});

// app.listen(port, () => console.log(`Server is running on port ${port}`));
