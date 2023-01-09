// We will be displaying 3 SLIDES of live
// 1. LIVE with team lineups, odds, tables
// 2. LIVE with comparing both teams.

import { useCallback, useEffect, useRef, useState } from "react";
import { BeginTransitionAnimation } from "../utilities/animation";
import DisplayLiveBoard from "./displayLiveBoard";
import DisplayLiveOdds from "./displayLiveOdds";

export type teamType = {
  id: string,
  team_name: string,
    code_name: string,
  skill_point: number,
  lose?: number,
  draw?: number,
  win?: number,
  odds?: number,
  strength?:number,
}

export type marketType<T>= {
  '1' : T,
  'x' : T,
  '2' : T,
  
  'dc': {
      '1x': T,
      '12': T,
      '2x': T
  }
  
  '+' : {
  // home
  '1-0': T,
  '2-0': T,
  '3-0': T,
  '4-0': T,
  '5-0': T,
  '6-0': T,
  
  //  draw
  '0-0': T,
  '1-1': T,
  '2-2': T,
  '3-3': T,
      
  //  away
  '0-1': T,
  '0-2': T,
  '0-3': T,
  '0-4': T,
  '0-5': T,
  '0-6': T,
      
  //  combine home
  '2-1': T,
  '3-1': T,
  '3-2': T,
  '4-1': T,
  '4-2': T,
  '5-1': T
  // combine away
  '1-2': T,
  '1-3': T,
  '2-3': T,
  '1-4': T,
  '2-4': T,
  '1-5': T
  
  }
   
  'ov2': T,
  'un2': T,
  
  'gg': T,
  'ng': T
}



export type fixtureType = {
   teamA: teamType,
   teamB: teamType,
   strategy: 'computer',
   odds: marketType<number>
}

// 3. LIVE with team lineup and correctscores
export default function DisplayLiveController({controllerSocket, setTeam}:any) {
  const slides = useRef<HTMLDivElement>(null);
  const [slide,setSlide] = useState(false);
  const [count, setCount] = useState('1/2')

  useEffect(()  => {
    //  animation for slide.
    controllerSocket.on('slide', function(time:any){
      // get slide instructions here
      BeginTransitionAnimation(slides, setCount);
    })
  },[])
  
  return (
    <div ref={slides}>
        <DisplayLiveBoard  setPlayingTeam={setTeam}/>
        <DisplayLiveOdds count={count}/>
    </div>
  )
}
