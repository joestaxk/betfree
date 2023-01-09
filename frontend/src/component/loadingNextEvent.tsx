import { RefObject, useEffect, useRef, useState } from "react"
import { $, Animation, css } from "../utilities/animation"
import { s } from "./context/socket-context"
import LogoModifier from "./logoModifier"

export default function LoadingNextEvent({playingTeam}:any) {
  const div1:RefObject<HTMLElement|any> = useRef(null)
  const div2:RefObject<HTMLElement|any> = useRef(null)
  const div3:RefObject<HTMLElement|any> = useRef(null)
  const div4:RefObject<HTMLElement|any> = useRef([])
  
  const [countdown, setCountDown] = useState(3)
  
  useEffect(() => {
        div1.current.style.cssText = "transform: translateX(-19rem) translateY(-2rem) skewX(-45deg); transition: .5s";
        div2.current.style.cssText = "background: #212121; transform: translateX(30rem) translateY(25rem) rotate(45deg); transition: .5s;";
        
        Animation(div3.current, [
         {opacity: .5, transition: '.5s'},
         {opacity: 1, transition: '.5s'}
        ], {iterations: 4, duration: 1000, delay: 1000})
        
        s.on('warmingup', (count) => {
           console.log(count);
           
           setCountDown(count)
        })
  }, [])
      
      
      
  return (
    <div className="bg-[#212121] absolute w-[100vw] h-[100vh] flex justify-between overflow-hidden bg-[url('/ball.jpg')] bg-no-repeat bg-contain  bg-origin-content">
       <div className="w-[50vh] h-[50vh] bg-[#4caf50] skew-x-[-40deg] translate-x-[-50rem] translate-y-[-2rem] border-[2rem] border-[gray]" ref={div1}></div>
       
       <div className="w-[80rem] bg-[rgb(181 9 9)] skew-x-[-30deg] translate-x-[8rem] translate-y-[0rem] relative">
           <div className="relative rotate-[360deg] bg-[#d10505] z-9  h-full w-[150rem]">
             
           </div>
       </div>
    
       <div className="absolute rotate-4 translate-x-[50rem] translate-y-[70rem] h-[100vh] w-[70%] border border-[rgb(240 248 255)]" ref={div2}>
       </div>
       
       
       <div className="w-[40vh] h-[70vh] transition border border-[rgb(240 248 255)] translate-x-[35rem] translate-y-[15rem] bg-[#212121]  absolute divide-y-2" ref={div4}>
        {
           playingTeam.length ? playingTeam.map((res:any, i:number) => (
            <div className="flex items-center justify-around p-4" key={i.toString()} data-team={1}>
                <div className="flex items-center space-x-2">
                    <LogoModifier logoName={res.teamA.team_name} />
                    <div className="text-[1.3rem] text-[#ccc] font-bold">{res.teamA.code_name}</div>
                </div>
                
                <div className="font-bolder text-white">V</div>
                
                <div className="flex items-center space-x-2">
                    <div className="text-[1.3rem] text-[#ccc] font-bold">{res.teamB.code_name}</div>
                    <LogoModifier logoName={res.teamB.team_name} />
                </div>
            </div> 
           )): <></>
        }
      
       </div>
       
       {/* counter */}
       <div className="absolute top-[50%] text-[11rem] right-[30%]">
            <div className="text-[#ccc] text-[1rem] font-bold">Starts In</div>
            <div className="text-white font-bolder p-0 m-0" ref={div3}>{countdown}</div>
       </div>
       
       <div className="absolute bottom-0 right-[25%]">
         <span className="text-[red] font-bold text-[3rem] italic">bet</span>
         <span className="text-[yellow] font-bold text-[3rem] italic">Free </span>
         <span className="text-[#ccc] font-bold text-[1rem] italic">V 0.1</span>
       </div>
       
    </div>
  )
}
