import { observable, action } from "mobx"
import dummyData from "./dummyData"
import socketIOClient  from "socket.io-client"

export class SocketStore{
    endpoint = "localhost:8080"
    socket = socketIOClient(this.endpoint);
    @observable socketId = "";
    @observable coordinates = {}

    @action openSocket = () => {
        // const ;
        this.socket.emit('userId', 'resctTestUser')
        this.socket.on('userId', (userIdin) => {
            console.log('recived: '+ userIdin)
        })
        
    }

    @action getLocationsNearby = (coordinates) => {
        console.log(coordinates)
        // {lat:coords.latitude,lng :coords.longitude }
        this.socket.emit('GPSlocation', coordinates);
        this.socket.on('locationsArry', function(locationsArry){
            console.log(locationsArry)
          })
    }
}

