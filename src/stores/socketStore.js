import { observable, action } from "mobx"
import dummyData from "./dummyData"
import socketIOClient  from "socket.io-client"

export class SocketStore{
    endpoint = "localhost:8080"
    socket = socketIOClient(this.endpoint);
    @observable socketId = "";
    @observable coordinates = {}
    @observable nearbyLocations = []

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
}

