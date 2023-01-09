import DisplayLiveTable from "./displayLiveTable";
import { useEffect, useState } from "react";
import { s } from "./context/socket-context";
import { fixtureType, marketType } from "./displayLiveController";
import LogoModifier from "./logoModifier";

export default function  DisplayLiveBoard({setPlayingTeam}:any) {
  const [odd,setOdd] = useState([])

  useEffect(() => {
     s.on('fixture', (res) => {
       res = JSON.parse(res);
       setOdd(res)
       
       const teams = res.map((t:any) => {
          return {teamA: t.teamA, teamB: t.teamB}
       })
       setPlayingTeam(teams)
     })
  }, [odd])
  
  return (
    // i hate grid.
    <div className="grid grid-cols-12 gap-3 transition pt-[7rem] pl-3" id="slide_1">
        <div className="w-[100%] col-start-1 place-content-center place-items-center col-span-9 divide-y-2 divide-[#121212] border border-2 border-[#000] rounde-xl">
            <div className="grid grid-cols-5  w-[100%] bg-[#212121] text-[2vmin] font-bold text-white divide-x-2 divide-[#121212]">
                <div className="leading-[60px] grid grid-col-1 place-content-center">Wk1</div>
                <div className="leading-[60px] grid grid-col-3 place-content-center">Main</div>
                <div className="leading-[60px] grid grid-col-3  place-content-center">Double chances</div>
                <div className="leading-[60px] grid grid-col-2 grid place-content-center">Ov/2.5</div>
                <div className="leading-[60px] grid grid-col-2 grid place-content-center">GG/NG</div>
            </div>
            
            
            <div className="grid grid-cols-5  w-[100%] text-[2vmin] font-bold text-white  divide-x-2  divide-[#121212]">
                <div className="grid grid-col-1 place-content-center text-[2.5vmin] font-bold">
                    <div className="">Fixtures</div>
                </div>
                <div className="grid grid-cols-3  divide-x-2 divide-gray-400">
                    <div className="leading-[60px] grid place-items-center">1</div>
                    <div className="leading-[60px] grid place-items-center">X</div>
                    <div className="leading-[60px] grid place-items-center">2</div>
                </div>
                
                <div className="grid grid-cols-3  divide-x-2 divide-gray-400">
                    <div className="leading-[60px] grid place-items-center">1-x</div>
                    <div className="leading-[60px] grid place-items-center">12</div>
                    <div className="leading-[60px] grid place-items-center">x-2</div>
                </div>
            
                <div className="grid grid-cols-2  divide-x-2 divide-gray-400">
                    <div className="leading-[60px] grid place-items-center">OV</div>
                    <div className="leading-[60px] grid place-items-center">UN</div>
                </div>
                
                <div className="grid grid-cols-2  divide-x-2 divide-gray-400">
                    <div className="leading-[60px] grid place-items-center">GG</div>
                    <div className="leading-[60px] grid place-items-center">NG</div>
                </div>
            </div>
                    
            <div className="font-bold">
             {
                odd.length ? odd.map((res:fixtureType, i) => (
                
                    <div className="w-[100%] grid grid-cols-5 odd:bg-[#ddd]  leading-[62px] divide-x-2 divide-[#121212]" key={i.toString()}>
                    
                    <div className="flex justify-around">  
                        <div className="">{i+1}</div>
                        
                        <div className="flex space-x-2">
                            <div className="flex items-center space-x-2">
                                <LogoModifier logoName={res.teamA.team_name} />
                                <div className="text-[1.1rem]">{res.teamA.code_name}</div>
                            </div>
                            
                            <div className="font-bolder">V</div>
                            
                            <div className="flex items-center space-x-2">
                                <div className="text-[1.1rem]">{res.teamB.code_name}</div>
                                <LogoModifier logoName={res.teamB.team_name} />
                            </div>
                         </div>
                    </div>
                    
                    {/* MAIN */}
                    <div className="grid grid-cols-3  divide-x-2 divide-gray-400">
                        <div className="grid place-items-center">{res.odds[1]}</div>
                        <div className="grid place-items-center">{res.odds.x}</div>
                        <div className="grid place-items-center">{res.odds[2]}</div>
                    </div>
                    
                    {/* DC */}
                    <div className="grid grid-cols-3 divide-x-2 divide-gray-400">
                        <div className="grid place-items-center">{res.odds.dc["1x"]}</div>
                        <div className="grid place-items-center">{res.odds.dc["12"]}</div>
                        <div className="grid place-items-center">{res.odds.dc["2x"]}</div>
                    </div>
                    
                    {/* OV */}
                    <div className="grid grid-cols-2 divide-x-2 divide-gray-400">
                        <div className="grid place-items-center">{res.odds.ov2}</div>
                        <div className="grid place-items-center">{res.odds.un2}</div>
                    </div>
                    {/* GG */}
                    <div className="grid grid-cols-2 divide-x-2 divide-gray-400">
                        <div className="grid place-items-center">{res.odds.gg}</div>
                        <div className="grid place-items-center">{res.odds.ng}</div>
                    </div>
                </div>
               )) : <></>
             }
            </div>
            
        </div>
        
        <DisplayLiveTable />
    </div>
  )
}
