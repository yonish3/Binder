import { observable, action, computed } from "mobx"
import dummyData from "./dummyData"
import socketIOClient from "socket.io-client"

export class SocketStore {
    endpoint = "localhost:8080"
    socket = socketIOClient()
    @observable socketId = "";
    @observable coordinates = {}
    @observable nearbyLocations = []
    @observable nearbyUsers = []
    @observable emoji = ''
    @observable loggedInUser
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
        this.socket.on('userId', (user) => {
            console.log('received: ', user)
            this.loggedInUser = user
        })
    }


    @action getLocationsNearby = function (coordinates) {
        this.socket.emit('GPSlocation', coordinates);
        this.socket.on('locationsArry', (locationsArry) => {
            console.log('locationsArry', locationsArry)
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
}