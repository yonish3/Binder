import { observable, action, computed } from "mobx"
import dummyData from "./dummyData"
import socketIOClient  from "socket.io-client"
export class SocketStore{
    endpoint = "localhost:8080"
    socket = socketIOClient(this.endpoint);
    @observable socketId = "";
    @observable coordinates = {}
    @observable nearbyLocations = []
    @observable nearbyUsers = []
@observable checked = false
    @action getUserById = (id) => {
        return this.nearbyUsers.find(user => user._id == id)
    }
    @action findSocketDestinationById = (id) => {
        const socketId = this.nearbyUsers.find(user => user.socketId == id)
        return socketId;
    }

    @action openSocket = () => {
        // const ;
        this.socket.emit('userId', '5e270a0e2647322352129dae')
        this.socket.on('userId', (userId) => {
            console.log('received: '+ userId)
        })
    }


    @action getLocationsNearby = function(coordinates) {
        this.socket.emit('GPSlocation', coordinates);
        this.socket.on('locationsArry',  (locationsArry) => {
            console.log('locationsArry',locationsArry)
            this.nearbyLocations = locationsArry
          })
    }

    @action getUsersNearMe = (location) => {
        console.log('before emit location: '+location)
        this.socket.emit('selectedLocation', location);
        this.socket.on('usersNearMe',  (usersNearMe) => {
            console.log('usersNearMe: ' + usersNearMe)
            this.nearbyUsers = usersNearMe
          })
    }
    @action sendReaction = (reactionObj) => {
        this.socket.emit('reaction', reactionObj)
        
    }

    @action getReaction = (reactionObj) => {
        this.socket.on('reaction recieved', reactionObj => {
            console.log('Recieved an Emoji!');
        })
    }

    @action recieveMessage = () => { 
        return this.socket.on('reaction recieved', reactionObj => {
            console.log("Recieved Message!");
            this.checked = true;
            setTimeout(() => {
                this.checked = false; 
                console.log('changed checked to false!');

            }, 5000)
        }) 
    }
}