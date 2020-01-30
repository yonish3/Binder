import { observable, action, computed } from "mobx"
import dummyData from "./dummyData"
import socketIOClient from "socket.io-client"

export class SocketStore {
    endpoint = "localhost:8080"
    socket = socketIOClient(this.endpoint)
    watchID
    //need to empty parantheses before deploying to heroku!!!
    @observable socketId = "";
    @observable coordinates = {}
    @observable nearbyLocations = []
    @observable nearbyUsers = []
    @observable emoji = ''
    @observable loggedInUser 
    @observable checked = false
    @observable isLoggedIn = false
    @observable SelectedLocationCoordinates
    @observable notifications = []
    @observable readNotificationsCount = 0
    @observable notificationsAmt = 0

    @action getUserById = (id) => {
        return this.nearbyUsers.find(user => user._id == id)
    }
    @action findSocketDestinationById = (id) => {
        const socketId = this.nearbyUsers.find(user => user.socketId == id)
        return socketId;
    }

    @action openSocket =  (userToSend) => {
        console.log("opensocket")
        console.log(userToSend)
        console.log("opensocket")
        this.socket.emit('userId', userToSend)
        this.loggedInUser = userToSend
        
    }

    @action getLocationsNearby = function(coordinates) {
        this.socket.emit('GPSlocation', coordinates);
        this.socket.on('locationsArry', (locationsArry) => {
            this.nearbyLocations = locationsArry
        })
    }

    @action getUsersNearMe = (location) => {
        console.log('before emit location: ' + location)
        this.socket.emit('selectedLocation', location);
        this.socket.on('usersNearMe', (usersNearMe) => {
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

            const date = new Date()
            const notification = {
                time: date,
                sender: this.reactingUser.firstName,
                emoji: this.emoji
            }
            this.addNotification(notification)

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
        this.watchID = navigator.geolocation.watchPosition((position)=> {
            let lat2 = position.coords.latitude
            let lng2 = position.coords.longitude
            
            let diff = this.distanceInKmBetweenEarthCoordinates(lat,lng,lat,lng) //don't accept change!!!!!!!!!!!!!!!!!!! this is hardcoded for vicki's computer
            if(diff>0.1){
                this.nearbyUsers = []
                this.socket.emit('out of range')
                navigator.geolocation.clearWatch(this.watchID)
            }
        })
    }

    @action checkoutFromLocation = () => {
        this.nearbyUsers = []
        this.socket.emit('out of range')
        navigator.geolocation.clearWatch(this.watchID)        
    }

    @action addNotification = (newNotification) => {
        this.notifications.unshift(newNotification)
        this.notificationsAmt++
    }

    @action readNotifications = () => {
        this.readNotificationsCount = this.notifications.length
        this.notificationsAmt = this.notifications.length - this.readNotificationsCount
    }
}