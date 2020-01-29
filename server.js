const dotenv = require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const api = require("./server/routes/api.js");
const errorHandler = require('./server/middlewares/errorHandler/errorHandler')
const config = require('./config/config')
const cookieParser = require('cookie-parser');
// const dbSetup = require('./server/db/dbSetup')
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const axios = require("axios")
const apiKey = process.env.GOOGLE_MAP_API_KEY //move through config
const controller = require('./server/middlewares/controllers/controller')
const queries = require('./server/db/queries')
const userIds = require('./dummyData').userIds
const PORT = 8080
var cors = require('cors');


const corsConfig = {
    origin: true,
    credentials: true,
  };
  
  app.use(cors(corsConfig));
  app.options('*', cors(corsConfig));

app.use(cookieParser())





app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    // res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    
    res.header('Access-Control-Allow-Headers: *');
    res.header('Access-Control-Max-Age: 1728000');
    res.header("Content-Length: 0");
    res.header("Content-Type: text/plain"); 
  
    next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); 
// app.use(express.static(path.join(__dirname, 'build')));

app.use("/", api);
app.use(errorHandler)

io.on('connection', function (socket) {
    console.log('user has connected')

    socket.on('userId', (user) => {
        user.socketId = socket.id
        users.push(user)
        //users.forEach(u=>console.log('user name: '+u.firstName))
    })

    socket.on('GPSlocation', async (GPSlocation) => {
        const nearLocations = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${GPSlocation.lat},${GPSlocation.lng}&radius=100&type=bar&key=${apiKey}`);
        let places = nearLocations.data.results.map(itemName => ({ name: itemName.name, id: itemName.place_id, locationCoordinates: itemName.geometry.location }))
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
        console.log('newUser is ', newUser.firstName);

        for (let i = 0; i < usersNearUser.length - 1; i++) {
            const usersToSend = [...usersNearUser.filter(user => user.socketId != usersNearUser[i].socketId)]
            io.to(`${usersNearUser[i].socketId}`).emit('usersNearMe', usersToSend);
        }
    })

socket.on('GPSlocation', async (GPSlocation) => {
    const nearLocations = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${GPSlocation.lat},${GPSlocation.lng}&radius=100&type=bar&key=${apiKey}`);
    let places = nearLocations.data.results.map(itemName => ({ name: itemName.name, id: itemName.place_id, locationCoordinates: itemName.geometry.location }))
    let pictures=[]
    for(let i=0 ; i<nearLocations.data.results.length; i++){
       if(nearLocations.data.results[i].photos){
        let photoCode= nearLocations.data.results[i].photos[0].photo_reference
        const photoLocation = await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoCode}&key=AIzaSyBKizswmWAb46dJxdiVPZp1zpUjDxC55lM`);
        delete photoLocation.data
        pictures.push(photoLocation.request.res.responseUrl)
       }
       else{
        pictures.push("https://images.squarespace-cdn.com/content/v1/53eba4e8e4b0d8c733bbd45a/1413767586813-7KBCWBJ538XXVKJ2DKXF/ke17ZwdGBToddI8pDm48kAR7vG2QfD3uW0H7YLf9VaYUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcT3f5-rKIYluIX58xa6tfcBn_TXvNu7kmrqqSJvyZGOaDbqGgO06TDcYHqFgl4xk9/BAR.jpg")
       }
    }
        for(let i=0; i<places.length; i++){
            places[i].picture=pictures[i]
        }
    
    socket.emit(`locationsArry`, places);

})
    socket.on('reaction', (reactionObj) => {
        io.to(`${reactionObj.destinationUser.socketId}`).emit('reaction recieved', reactionObj);
    })

    socket.on('out of range', function () {
        let location
        for (let i = 0; i < users.length; i++) {
            if (users[i].socketId === socket.id) {
                location = users[i].location
                users[i].location = ""
                console.log(`checking out user ${users[i].userId} from ${location}`)
            }
        }
        for (let i = 0; i < users.length; i++) {
            const usersToSend = [...users.filter(user => user.socketId != users[i].socketId && user.location == location)]
            io.to(`${users[i].socketId}`).emit('usersNearMe', usersToSend);
        }
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
            const usersToSend = [...users.filter(user => user.socketId != users[i].socketId && user.location == location)]
            io.to(`${users[i].socketId}`).emit('usersNearMe', usersToSend);
        }
    });
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.use((req, res) => res.sendFile(INDEX, { root: __dirname }))
http.listen(process.env.PORT || PORT, function () {
    console.log('listening on *:8080');
});