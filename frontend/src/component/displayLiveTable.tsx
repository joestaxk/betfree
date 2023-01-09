import { useCallback, useEffect, useRef, useState } from "react";
import { s } from "./context/socket-context";
import LogoModifier from "./logoModifier";


type tableType = {
   code_name: string,
   point: number, 
   score_graph: string[],
   team_name: string
}

export default function DisplayLiveTable() {
    const [table, setTable] = useState([])
    useEffect(() => {
        s.on('table', (res) => {
          setTable(res)          
        })
     }, [])
     
     const measuredRef = useCallback((node:HTMLDivElement) => {
      if (node !== null) {
          node.animate([
            // keyframes
            { opacity: '.5' },
            { opactity: '1'}
          ], {
            // timing options
            duration: 1000,
            iterations: 1
          });
         }
    }, []);
    
    
     
  return (
    <div className="h-min-[100vh] col-span-3 mr-4 border-[#212121] border-2">
        <div className="grid grid-cols-3 w-[100%] bg-[#212121] text-[1.6vmin] font-bold  text-white  leading-[60px] divide-x-2 divide-[#000]">
            <div className="grid place-items-center">Teams</div>
            <div className="grid place-items-center">Points</div>
            <div className="grid place-items-center">Last 5 Games</div>
        </div>
      
          <div className="w-[100%]">
                {
                  table.length ? table.map((res:tableType, i) => (
                          <div className="even:bg-gray-100 grid grid-cols-3 w-[100%] rounded divide-x-2 divide-gray-400 leading-[34px] transition" ref={measuredRef}  key={i.toString()}>
                            
                              <div className="grid grid-cols-3 place-items-center font-bold">
                                 <b>{i+1}</b>
                                 <LogoModifier logoName={res?.team_name} />
                                 {res?.code_name}
                              </div>
                              
                              <div className="grid place-items-center">{res?.point}</div>
                              
                              <div className="flex justify-center space-x-4">
                                  {/* DOTS */}
                                  {
                                      res?.score_graph.length < 1 ? ['-','-','-','-','-'].map((c) => (
                                        <div className="">{c}</div>
                                      )) : res?.score_graph.map((graph:string, i) => (
                                          <div className={`w-[1vmin] h-[1vmin] rounded ${graph == 'w' ? 'bg-[green]' : graph == 'd' ? 'bg-[red]' : 'bg-[gray]'  }`} key={i.toString()}>000</div>
                                      ))
                                  }
                                  
                              </div>
                          </div>
                    ) 
                    
                  ) : <></>
                  }
        </div>
      </div>
  )
}
