import { socketIO } from "../app";
import { getTimeStamp, t } from "../services/crontask.services";
import { IntiateWeekController } from "./initiateWeekController";
// import { EventEmitter } from 'node:events';


export default class SocketController {
    static  init() {
        socketIO.on('connection', async (socket:any) => {
          if(socket.id) {
              console.log(`⚡: ${socket.id} user just connected!`);
                //   first connection
              socket.emit('ready', true)
              socket.emit('warmup', false);
        
              // Send week, league and games
              let newController = new IntiateWeekController()
              let currentGameData  = (await newController.getCurrentMatches())[0];
              
              socket.emit('fixture', currentGameData?.currentgame)
              socket.emit('week', currentGameData?.week)
              socket.emit('league', currentGameData?.league)  
              
              let getTableData = (await newController.newTable())
              if(getTableData) {
                  socket.emit('table', getTableData)
              }
              
              // emit last game also
              let lastGameData  = (await newController.getLastMatches())[0];
              socket.emit('marquee', lastGameData)
              
              // Emit Timmers.. includes 90's time and 5mins timer.
              t(socket)
          }

            socket.on('disconnect', () => {
                console.log('🔥: A user disconnected');
            });
        })
    }
}