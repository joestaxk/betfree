import React from 'react';
import io from 'socket.io-client';
const socket  = io('http://localhost:3000');
// socket io

export const Socketio = React.createContext(socket)

export const s = socket