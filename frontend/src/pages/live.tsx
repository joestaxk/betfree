import DisplayLiveController from "../component/displayLiveController";
import { TimeComponent } from "../component/timeComponent";
import { useEffect, useState } from "react";
import DisplayMarquee from "../component/displayMarquee";
import LoadingNextEvent from "../component/loadingNextEvent";

export function Live({getSocket}:any) {
     const [playingTeam, setPlayingTeam] = useState([]);
    const [Loading, setLoading] = useState(false)    
    const [stopTIme, setStop] = useState(false);
    
    useEffect(() => {
      getSocket.on('ready', function(ready:boolean){
          setLoading(prev => prev = ready) 
      })
      
  
      getSocket.on('warmup', function(stopGame:boolean) {
        setStop(stopGame)
     })
    }, [])
    
    return (
        <div className="relative bg-[#b6b8b8] h-[100vh] font-noto">
             {
                 !Loading && (<div className="absolute z-[999] w-full h-full bg-[#b6b8b8] flex justify-center items-center transition">
                    <h1 className="text-[3rem] font-bold">Next Event Loading... </h1>
                  </div>)
             }
            <>
               {
                   !stopTIme ? 
                   <>
                    <TimeComponent timeSocket={getSocket}/>
                    <DisplayLiveController controllerSocket={getSocket} setTeam={setPlayingTeam}/>
                    <DisplayMarquee />
                   </> : <LoadingNextEvent playingTeam={playingTeam}/>
                   
               }
            
            </> 
            
        </div>
    )
}