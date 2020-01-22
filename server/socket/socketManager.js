
var app = require('express')();
const http = require('http').createServer(app);
var io = require('socket.io')(http);

let users = [
    {userId: '123', socketId: '123', location: 'Elevation'},
    {userId: 'qwe', socketId: 'qwe', location: 'Spotnic'},
    {userId: '456', socketId: '456', location: 'Super Pharm'},
  ]
  
  let locationsArry = ['Elevation','Super Pharm', 'Spotnic']

exports.http = function(){
    console.log('http')
    return http
}

exports.socketConnector = function(){
    io.on('connection', function(socket){

        console.log('user has connected')
        
            users.push({
              socketId: socket.id,
              userId: null,
              location: null
            })
          
            let len = users.length 
            socket.emit(`allUsers`,users); 
          
            socket.on('userId', (userId) => {
              users.forEach(u => {
                if (u.socketId === socket.id) {
                    u.userId = userId
                    return
                }
              })
              socket.emit(`userId`,userId); 
              socket.emit(`allUsers`,users); 
          
            })
          
            socket.on('GPSlocation', (GPSlocation) => {
              console.log('GPS location recived: '+ GPSlocation)
          
              //API and getting locations from Google
              socket.emit(`locationsArry`,locationsArry); 
            })
          
            socket.on('selectedLocation', (selectedLocation) => {
              console.log('Selected location recived: '+ selectedLocation)
              let usersNearUser = []
              users.forEach(u => {
                if(u.location === selectedLocation){
                  usersNearUser.push(u)
                }
                if (u.socketId === socket.id) {
                    u.location = selectedLocation
                }
                
              })
              socket.emit(`users`,usersNearUser)
              socket.emit(`allUsers`,users); 
          
            })
              
            socket.on('disconnect', function(){
                console.log('user disconnected');
                for(let i=0; i < users.length; i++){
                              
                  if(users[i].socketId === socket.id){
                      console.log(`deleting user ${users[i].userId}`)
                      users.splice(i,1); 
                  }
              }
              socket.emit(`allUsers`,users); 
              io.emit('exit',users); 
          
              });
          });
}