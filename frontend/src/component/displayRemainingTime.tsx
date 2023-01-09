import { useEffect, useState } from 'react';


export default function DisplayRemainingTime({countdownSocket}:any) {
  const [timestamp, setCountdown] = useState(0);
  const [redcode, setred] = useState(0);
  const [clock, setClock] = useState({
      mins: 0,
      seconds: 0
  })

  useEffect(() => {
    countdownSocket.on('timer', function(time:any){
      setClock((prev) => {return {mins: time.min, seconds: time.sec}} )
    })
    
    countdownSocket.on('redcode', function(code:number) {
       setred(code)
    })
    
    return () => {
      // socket.disconnect()
    }
  },[])
  
  return (
    <div className="">
        <div className={`text-[4vmin] font-bold bg-[rgb(112, 114, 0)] ${redcode ? 'text-red-500': ''} transition`}>{clock.mins}:{clock.seconds}</div>
        <div className="">Remaining Time</div>
    </div>
  )
}
