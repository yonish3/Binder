import { observable, action } from "mobx"
import dummyData from "./dummyData"
import socketIOClient  from "socket.io-client"

export class SocketStore{
    endpoint = "localhost:8080"
    @observable socketId = ""

    @action openSocket = () => {
        const socket = socketIOClient(this.endpoint);
        socket.emit('userId', 'resctTestUser')
        socket.on('userId', (userIdin) => {
            console.log('recived: '+ userIdin)
        })
    }
}

