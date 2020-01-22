import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'

class Socket extends Component {
    constructor() {
        super();
        this.state = {
          endpoint: "localhost:8080",
        };
      }

    componentDidMount = () => {
        const socket = socketIOClient(this.state.endpoint);
        
    }

    render() {
        return (
            <div>
                hello
            </div>
        );
    }
}

export default Socket;