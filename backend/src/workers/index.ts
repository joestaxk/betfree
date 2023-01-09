const { Worker, setEnvironmentData, MessageChannel} = require('node:worker_threads');
const path = require('path');

type ev = "message"|"error"|"exit";
type resolve = (value: unknown) => void;
type reject = (reason?: any) => void;

interface workerType {
    on: (arg0:ev, arg1: resolve | reject) => void
    once: (arg0:ev, arg1: resolve | reject) => void,
    postMessage: (arg0: object, arg1:object[]) => void
}

type timerType = {min: number|string, sec: number|string} | string

export function Workers(script:any, filename:string, cb:(arg0: timerType) => void) {
    
    return new Promise((resolve, reject) => {
        let worker:workerType = new Worker(path.resolve(__dirname + filename+'.js'));
        const { port1, port2 } = new MessageChannel();
        worker.postMessage({port1, script}, [port1]);
        
        port2.on("message", cb);
        
        port2.on("error", reject);
        
        
        setEnvironmentData('Hello', 'World!');
        
        port2.on("exit", (code:any) => {
            if(code != 0) {
                reject(new Error(`Worker stopped with exit code ${code}`))
            }
        })
    })
}