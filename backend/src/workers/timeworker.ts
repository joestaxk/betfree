const assert = require('node:assert');
const { isMainThread, parentPort } = require('node:worker_threads');



parentPort.once('message', (value:any) => {
    handleTimeCalculation(value.port1, value.script)
});


// design time
function handleTimeCalculation(port1:any, data:any) {
    // start time
    // get the new time from workerData
    const timestamp = data;
    
    // get the always updated time
    const currentTime = () => Date.now()
    
    // present time
    // toLocaleTimeString: convert timestamp to human readable time - reusable
    const toLocaleTimeString = (timestamp:number) => (new Date(timestamp)).toLocaleTimeString();
    
    // how many minutes.
    const addTime = 1; // mins 
    
    // future time
    const add5mins = (timestamp + (1000*60) * addTime) // adding mins to the timestamps
    
    // create a 1 seconds interval that follow up the time
    let interval = setInterval(() => {
        // start timer
        let newTimer = startTimer()
        port1.postMessage(newTimer)
        // We stop once the interval is completed
        stop()
    }, 1000)   
    
    
    // count mins left 
    let timer = {min:addTime, sec: 0}
    function stop() {
        // throw message every 1mins and tell us how many mins remaining.
        let everyMoment = Math.round((currentTime() - timestamp)/1000)        
        
        if(Number.isInteger(everyMoment/60)) { // (10/60 )= (0.1666 === 1) = false
            port1.postMessage('slide')
        }
        
        // Get 30mins -formular -> currentTIME + 30 ==== Final number
        // when it half way to 30 mins
        let get30mins = 30
        if((everyMoment + get30mins)  === (60*addTime)) {
            // presave game.
            console.log('30mins');
        }
        
        if(toLocaleTimeString(currentTime()) === toLocaleTimeString(add5mins - (1000*5))) {
            console.log('5s remains');
            
            // once it's over
            // run 3 mins timer
            port1.postMessage('warmup')
            // run 90mins timer
        }
        
        
        if(toLocaleTimeString(currentTime()) === toLocaleTimeString(add5mins )) {
            port1.postMessage('stop')
            clearInterval(interval)
        }
    }
    
    
    
    // WHAT IF we do the calculation independently
    function startTimer(){
        
        if(timer.sec === 0) {
            // switch for both mins and timer
            timer.min = timer.min -1;
            timer.sec = 59;
        }else {
            timer.sec = timer.sec -1;
        }
        
        
        let n_m = timer.min.toString().length < 2 ? '0' + timer.min : timer.min;
        let n_s = timer.sec.toString().length < 2 ? '0' + timer.sec : timer.sec;
        
        return { min: n_m, sec: n_s }
    }
}
