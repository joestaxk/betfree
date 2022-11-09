import { socketIO } from "../app";
import { countdown } from "../utilities/countdown.utilities";

export default class SocketController {
    static speed = 50;
    
    static countdown_socket(socketFn:any) {
        countdown(4, socketFn)
    }
    
    static init() {
        socketIO.on('connection', (socket:any) => {
            console.log(`⚡: ${socket.id} user just connected!`);
        
            setInterval(() => {
                SocketController.countdown_socket(function(minute:number, seconds:number) { 
                    socket.emit('running_countdown', `${minute}:${seconds}`)
                })
            }, SocketController.speed)
            
            socket.on('disconnect', () => {
                console.log('🔥: A user disconnected');
            });
        })
    } 
}