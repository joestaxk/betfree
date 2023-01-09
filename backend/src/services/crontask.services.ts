// dependencies
import { initialize, socketIO } from "../app";
import SocketController from "../controller/socketController";
import { timeStampModel } from "../model/timestampModel";
import { Workers } from "../workers";

const { isMainThread } = require('node:worker_threads');

type timerType = {min: number|string, sec: number|string} | string
let r:timerType;



export function t(socket:any) {
    let interv = setInterval(async () => {  
        switch (r) {
            default:
                socket.emit('timer', r)
            break;
            
            case 'stop':
                await stop5minsRunning()                
                // start new season and emit live
                clearInterval(interv)
            break;
            
            case 'warmup':
                // emit warmup
                socket.emit('redcode', true)
                socket.emit('warmup', true);
                
                let count = 4;
                let interval = setInterval(() => {
                     // start timer
                     if(count === 0){
                       clearInterval(interval)
                     }else {
                         socket.emit('warmingup', --count)
                     }
                 }, 1000)   
            break;
            
            case '90sec':
                socket.emit('90sec', 1)
            break;
            
            case 'slide':
                socket.emit('slide', 1)
            break;
        }
    }, 1000)
}

export default async function TimeStamp() {
    if(isMainThread) {
        // use worker to establish large computation
        let getTimeStamp = Date.now();
        await prepareNewTimestamp(getTimeStamp);
        
        await Workers(getTimeStamp, '/timeworker', cb)
        
        async function cb(res:timerType|string) {
            r = res;
        }
    }
}

    
async function prepareNewTimestamp(getTimeStamp:number){
    try {
        // check if five_mins_stamp already exist
        const ifExist = await timeStampModel.find({});

        if(!ifExist.length) {
            // save the time stamp!
            const Tstamp = new timeStampModel({
                five_mins_timestamp: getTimeStamp,
                is5minsRunning: true
            });
            
            await Tstamp.save();
            
            return getTimeStamp;
        }
        
        const stampID = ifExist[0].id;
        
        if(ifExist[0].is5minsRunning && ifExist[0].five_mins_timestamp > getTimeStamp){
            return ifExist[0].timestamp
        }
        
        const keepTimeStampUpdated = await timeStampModel.updateOne({where: {id: stampID}}, { five_mins_timestamp: getTimeStamp, is5minsRunning: true });
        
        return getTimeStamp;
    } catch (error) {
        throw error
    }
}


type timestamp = {
    five_mins_timestamp: number,
    is5minsRunning: boolean
    nintysecond_timestamp: number
}

export async function getTimeStamp() {
    try {
        const ifExist:[timestamp] = await timeStampModel.find({});
        if(ifExist.length) return ifExist[0]
    } catch (error) {
        throw error
    }
}

async function stop5minsRunning() {
    try {
        const ifExist = await timeStampModel.find({});
        
        if(ifExist[0].length){
            const keepTimeStampUpdated = await timeStampModel.updateOne({where: {id: ifExist[0].id}}, { is5minsRunning: false });
        }
    
    }catch(E) {
        console.error(E);
        
    }
}
