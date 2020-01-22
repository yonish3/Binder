import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'

class Socket extends Component {
    constructor() {
        super();
        this.state = {
          endpoint: "localhost:8080",
          userId : ""
        };
      }

    componentDidMount = () => {
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('userId', 'resctTestUser')
        socket.on('userId', (userIdin) => {
            console.log('recived: '+ userIdin)
            this.setState({
                userId:userIdin
            })
        })
    }

    render() {
        return (
            <div>
                hello
                {this.state.userId}
            </div>
        );
    }
}

export default Socket;