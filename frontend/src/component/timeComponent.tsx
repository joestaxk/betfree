import DisplayRemainingTime from "./displayRemainingTime"
import io, { Socket } from 'socket.io-client';
import { useEffect, useState } from "react";

export function TimeComponent({timeSocket}:any) {
    const [week, setWeek]     = useState('-');
    const [league, setLeague] = useState('-');
    
    useEffect(() => {
        timeSocket.on('week', function(curweek:any){           
            setWeek(curweek)
        })
        
        timeSocket.on('league', function(curLeague:any){            
            setLeague(curLeague)
        })
        
      return () => {
      }
    }, [week,league])
    
    return (
        <div className="font-noto flex justify-end items-center min-h-[5vmin] absolute z-10 w-[100vw] top-0 left-0 bg-[rgb(10,14,26)] p-2">
        
            <div className="flex text-white h-full space-x-10 text-center">
                <DisplayRemainingTime countdownSocket={timeSocket}/>
                
                <div className="">
                    <div className="text-[4vmin]">{week}</div>
                    <div className="">Week</div>
                </div>
                
                <div className="">
                    <div className="text-[4vmin]">{league}</div>
                    <div className="">League</div>
                </div>
            </div>
        </div>
    )
}