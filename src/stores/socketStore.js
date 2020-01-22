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
    @observable recieved

    @computed get getSocket() {
        return this.socket
    }
    @action openSocket = () => {
        this.socket.emit('userId', 'resctTestUser')
        this.socket.on('userId', (userIdin) => {
            console.log('recived: '+ userIdin)
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
        console.log('before emit locaiton: '+location)
        this.socket.emit('selectedLocation', location);
        
    }

    @action sendReaction = (reactionObj) => {
        this.socket.emit('reaction', reactionObj)
        
    }

    @action getReaction = (reactionObj) => {
        this.socket.on('reaction recieved', reactionObj => {
            console.log('Recieved an Emoji!');
        })

    }

    @action recieveMessage = (message) => {
        return this.socket.on('reaction recieved', reactionObj => {

        })
    }
}

