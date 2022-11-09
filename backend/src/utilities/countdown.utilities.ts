
let minute:number = 4;
let seconds:number = 59
let milliseconds:number = 59;
let switchPoint:number = 0;
let restartsecCount = 59;

function countdown(stopcountdown:number = 4, cb:any) {
    milliseconds--
    if(milliseconds === switchPoint && seconds !== switchPoint) {
        seconds--; milliseconds = restartsecCount;
    }else if(milliseconds === switchPoint && seconds === switchPoint) {
        minute--; seconds = restartsecCount; milliseconds = restartsecCount;
    }else if(minute === switchPoint && seconds === switchPoint) {
        minute = stopcountdown; seconds = restartsecCount; milliseconds = restartsecCount;
    }
    cb(formatToTime(minute), formatToTime(seconds))
}


function formatToTime(n:number):string {
    return n < 10 ? `0${n}`:n.toString()
}

export {countdown}