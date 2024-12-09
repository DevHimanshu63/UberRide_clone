import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(`http://localhost:4000`); // Replace with your server URL

const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Basic connection logic
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

    }, []);

    const sendMessage = (eventName, message) => {
        console.log('Sending message:', eventName, message)
        socket.emit(eventName, message);
    }

    const recieveMessage = (eventName, callback) => {
        socket.emit(eventName, callback);
    }




    return (
        <SocketContext.Provider value={{ sendMessage ,  recieveMessage}}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;