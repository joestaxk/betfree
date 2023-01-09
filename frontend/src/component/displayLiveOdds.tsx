import { useEffect, useState } from "react";
import { s } from "./context/socket-context";
import { fixtureType } from "./displayLiveController";
import LogoModifier from "./logoModifier";

export default function  DisplayLiveOdds({count}:any) {
    const [odd,setOdd] = useState([])

    useEffect(() => {
       s.on('fixture', (res) => {
         res = JSON.parse(res);
         console.log(res);
         
         setOdd(res)
       })
    }, [odd])
    
    return (
      // i hate grid.
    <div className="grid grid-cols-12 gap-3 transition pt-[7rem] pl-3 pr-3 hidden" id="slide_2">
          <div className="w-[100%] col-start-1 place-content-center place-items-center col-span-12 divide-y-2 divide-[#121212] border border-2 border-[#000] rounde-xl">
              <div className="grid grid-cols-1  w-[100%] bg-[#212121] text-[2vmin] font-bold text-white">
                  <div className="leading-[60px] grid grid-col-3  place-content-center">Correct Score {count}</div>
              </div>
              
              
              <div className="relative grid grid-cols-6 w-[100%] text-[2vmin] font-bold text-white  divide-x-2  divide-[#121212] overflow-hidden">
                  <div className="grid place-content-center text-[2.5vmin] font-bold z-[9] bg-[rgb(182,184,184)]">
                      <div className="">Fixtures</div>
                  </div>
                  
                  {/* translate-x-[-82.25vw] z-0 */}
                  <div className="flex w-[164.5vw]  transition" data-slide-top={1}>
                    <div className="w-[100%] grid grid-cols-3 col-span-5">
                        <div className="grid grid-cols-5  divide-x-2 divide-gray-400">
                                <div className="leading-[60px] grid place-items-center">0-0</div>
                                <div className="leading-[60px] grid place-items-center">1-1</div>
                                <div className="leading-[60px] grid place-items-center">2-2</div>
                                <div className="leading-[60px] grid place-items-center">3-3</div>
                                <div className="leading-[60px] grid place-items-center"></div>
                        </div>
                        
                        <div className="grid grid-cols-6  divide-x-2 divide-gray-400">
                            <div className="leading-[60px] grid place-items-center">1-0</div>
                            <div className="leading-[60px] grid place-items-center">2-0</div>
                            <div className="leading-[60px] grid place-items-center">3-0</div>
                            <div className="leading-[60px] grid place-items-center">4-0</div>
                            <div className="leading-[60px] grid place-items-center">5-0</div>
                            <div className="leading-[60px] grid place-items-center">6-0</div>
                        </div>
                    
                        <div className="grid grid-cols-6  divide-x-2 divide-gray-400">
                            <div className="leading-[60px] grid place-items-center">2-1</div>
                            <div className="leading-[60px] grid place-items-center">3-1</div>
                            <div className="leading-[60px] grid place-items-center">4-1</div>
                            <div className="leading-[60px] grid place-items-center">5-1</div>
                            <div className="leading-[60px] grid place-items-center">3-2</div>
                            <div className="leading-[60px] grid place-items-center">4-2</div>
                        </div>
                        
                    </div>
                    <div className="w-[100%] grid grid-cols-3 col-span-5 divide-x-2 divide-[#212121]">
                        <div className="grid grid-cols-5  divide-x-2 divide-gray-400">
                            <div className="leading-[60px] grid place-items-center">0-0</div>
                            <div className="leading-[60px] grid place-items-center">1-1</div>
                            <div className="leading-[60px] grid place-items-center">2-2</div>
                            <div className="leading-[60px] grid place-items-center">3-3</div>
                            <div className="leading-[60px] grid place-items-center"></div>
                        </div>
                        
                        <div className="grid grid-cols-6  divide-x-2 divide-gray-400">
                            <div className="leading-[60px] grid place-items-center">0-1</div>
                            <div className="leading-[60px] grid place-items-center">0-2</div>
                            <div className="leading-[60px] grid place-items-center">0-3</div>
                            <div className="leading-[60px] grid place-items-center">0-4</div>
                            <div className="leading-[60px] grid place-items-center">0-5</div>
                            <div className="leading-[60px] grid place-items-center">0-6</div>
                        </div>
                    
                        <div className="grid grid-cols-6  divide-x-2 divide-gray-400">
                            <div className="leading-[60px] grid place-items-center">1-2</div>
                            <div className="leading-[60px] grid place-items-center">1-3</div>
                            <div className="leading-[60px] grid place-items-center">1-4</div>
                            <div className="leading-[60px] grid place-items-center">1-5</div>
                            <div className="leading-[60px] grid place-items-center">2-3</div>
                            <div className="leading-[60px] grid place-items-center">2-4</div>
                        </div>
                        
                    </div>
                  </div>
                  
              </div>
                      
              <div className="font-bold overflow-hidden">
               {
                  odd.length ? odd.map((res:fixtureType, i) => (
                  
                      <div className="w-[100%] grid grid-cols-6 odd:bg-[#ddd] leading-[60px] divide-x-2 divide-[#121212]" data-slide={1} key={i.toString()}>
                      
                       {/*  z-[9] border-b-2 border-r-[#212121] bg-[#ddd]  - 2/2 */}
                        <div className="flex justify-around" data-fixture={1}>  
                          <div className="">{i+1}</div>
                          
                          <div className="flex space-x-2">
                              <div className="flex items-center space-x-2">
                                  <LogoModifier logoName={res.teamA.team_name} />
                                  <div className="text-[1.1rem]">{res.teamA.code_name}</div>
                              </div>sta
                              
                              <div className="font-bolder">v</div>
                              
                              <div className="flex items-center space-x-2">
                                  <div className="text-[1.1rem]">{res.teamB.code_name}</div>
                                  <LogoModifier logoName={res.teamB.team_name} />
                              </div>
                           </div>                     
                        </div>
                        
                           {/* translate-x-[-82.25vw]  z-0  2/2 */}
                        <div className="flex  w-[164.5vw] transition" data-slide-odd={1}>
                            <div className="w-[100%] grid grid-cols-3 col-span-5 divide-x-2 divide-[#212121]">
                                    
                                    <div className="grid grid-cols-5  divide-x-2 divide-gray-400">
                                        <div className="grid place-items-center">{res.odds["+"]["0-0"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["1-1"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["2-2"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["3-3"]}</div>
                                        <div className="grid place-items-center"></div>
                                    </div>
                                    
                
                                    <div className="grid grid-cols-6 divide-x-2 divide-gray-400">
                                        <div className="grid place-items-center">{res.odds["+"]["1-0"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["2-0"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["3-0"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["4-0"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["5-0"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["6-0"]}</div>
                                    </div>
                                    
                                
                                    <div className="grid grid-cols-6 divide-x-2 divide-gray-400">
                                        <div className="grid place-items-center">{res.odds["+"]["2-1"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["3-1"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["4-1"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["5-1"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["3-2"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["4-2"]}</div>
                                    </div>          
                            </div>
                            <div className="w-[100%]  grid grid-cols-3 col-span-5 divide-x-2 divide-[#212121]">
                                    
                                    <div className="grid grid-cols-5  divide-x-2 divide-gray-400">
                                        <div className="grid place-items-center">{res.odds["+"]["0-0"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["1-1"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["2-2"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["3-3"]}</div>
                                        <div className="grid place-items-center"></div>
                                    </div>
                                    
                
                                    <div className="grid grid-cols-6 divide-x-2 divide-gray-400">
                                        <div className="grid place-items-center">{res.odds["+"]["0-1"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["0-2"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["0-3"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["0-4"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["0-5"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["0-6"]}</div>
                                    </div>
                                    
                                
                                    <div className="grid grid-cols-6 divide-x-2 divide-gray-400">
                                        <div className="grid place-items-center">{res.odds["+"]["1-2"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["1-3"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["1-4"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["1-5"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["2-3"]}</div>
                                        <div className="grid place-items-center">{res.odds["+"]["2-4"]}</div>
                                    </div>          
                            </div>
                        </div>
                  </div>
                 )) : <></>
               }
              </div>
              
          </div>
          
      </div>
  )
}