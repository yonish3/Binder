import { observable, action, computed } from "mobx"
import dummyData from "./dummyData"
import socketIOClient  from "socket.io-client"
export class SocketStore{
    endpoint = "localhost:8080"
    socket = socketIOClient(this.endpoint)
    @observable socketId = "";
    @observable coordinates = {}
    @observable nearbyLocations = []
    @observable nearbyUsers = []
    @observable emoji = ''
    @observable loggedInUser 
    @observable checked = false
    @observable SelectedLocationCoordinates

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
        this.socket.on('userId', (user) => {
            console.log('received: ', user)
            this.loggedInUser = user
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
            // this.reactingUser = reactionObj.destinationUser
        })
    }

    @action recieveMessage = () => { 
        this.socket.on('reaction recieved', reactionObj => {
            console.log("Recieved Message!");
            console.log('reactingObj is ', reactionObj);
            this.reactingUser = reactionObj.sourceUser
             console.log('reactingUser is ', this.reactingUser);
            
            this.checked = true;
            this.emoji = reactionObj.label;
            
           
            setTimeout(() => {
                this.checked = false; 
                this.reactingUser = null
                console.log('changed checked to false!');

            }, 5000)
        }) 
    }

    // @action setReactionUser = (user) => {
    //     this.reactingUser = user
    // }
    degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }
  
    distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
        var earthRadiusKm = 6371;
        
        var dLat = this.degreesToRadians(lat2-lat1);
        var dLon = this.degreesToRadians(lon2-lon1);
        
        lat1 = this.degreesToRadians(lat1);
        lat2 = this.degreesToRadians(lat2);
        
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        return earthRadiusKm * c;
    }

    @action watchPosition = () => {
        let lat = this.SelectedLocationCoordinates.lat 
        let lng = this.SelectedLocationCoordinates.lng 

        var watchID = navigator.geolocation.watchPosition((position)=> {
        let lat2 = position.coords.latitude
        let lng2 = position.coords.longitude

        let diff = this.distanceInKmBetweenEarthCoordinates(lat,lng,lat2,lng2)
        if(diff>0.1){
            console.log(`location cordinates: ${lat},${lng}`)
            console.log(`new cordinates: ${lat2},${lng2}`)
            console.log(`user is out of range, diff is:  ${diff}`)
            this.nearbyUsers = []
            this.socket.emit('out of range')
        }
    });
}
}