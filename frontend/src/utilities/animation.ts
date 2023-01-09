import { CSSProperties, RefObject } from "react"

export function $(getNode?:string, getNodeList?:string){
   if(getNodeList) {
      return document.querySelectorAll(getNodeList)
   }else if(getNode){
     return document.querySelector(getNode)
   }
}

export function $getFrom(element:HTMLDivElement|any, target:string):HTMLElement[]{
   return element.querySelectorAll(target)
}

type intervalType ={
  duration: number
  cb:()=>void,
  useTimeout: boolean,
  arg?: any[]
}

export function Interval({cb, duration,useTimeout, arg}:intervalType) {
    // declare setintervals and timeout
    if(useTimeout){
       return setTimeout(cb, duration, arg)
    }else {
       return setInterval(cb, duration, arg)
    }
}

export function Animation(element:HTMLElement|any, css:Keyframe[], options:KeyframeAnimationOptions){
   console.log(element);
   
    return element.animate(css, options)
}

export function css(element:HTMLElement|any, style:CSSProperties) {
   let toCssText = "";
   
   function toCSSprop(str:string) {
       // backgroundColor = background-color; zIndex: z-index; borderRight = border-right;
       let formCssString = '';
       let strLowerCase = str.toLowerCase();
       if(str === strLowerCase) {
         return str;
       }
       for(let i =0, j = str.length; i < j; i++) {
        let aStr = str[i];
         // check if it is on capital, if not form css string;
         if(aStr !== strLowerCase[i]){
            formCssString += `-${strLowerCase[i]}`
         }else {
           formCssString += aStr
         }
       }
       
       return formCssString
   }
   
   let props:string[] = Object.keys(style);
   let value:any[] = Object.values(style);
   
   for(let i = 0; i < props.length; i++) {
     toCssText += `${toCSSprop(props[i])}:${value[i]};`;
   }
   
   element.style.cssText= toCssText
}

export function on(ev:keyof WindowEventMap, element:HTMLElement, cb: () => void) {
   element.addEventListener(ev, cb)
}

export function BeginTransitionAnimation(parentSlide:RefObject<HTMLDivElement>, setCount:any) {
   // each animation section will take only 20seconds before the next on
   const [slide1, slide2] = $getFrom(parentSlide.current, '#slide_1, #slide_2');
   
   // once slide calls, remove slide1.
   css(slide1, {
      transition: '.5s',
      opacity: 0,
   })
   
   // once removed, wait for transition to finish
   on('transitionend', slide1, () => {
      // Once that finish, bring in slide2
      css(slide1, {display: 'none'});
      css(slide2, {display: 'grid', transition: '.5s'});
      
      // Gradually fades in
      Animation(slide2, [
         {opacity: '1'}
         ], {
         duration: 1000,
         iterations: 1
      })
      
      
      
      //  left-right animation
      let slideElement:any = $('', '[data-slide]')
      slideOddEven(slideElement)
      
      // slide odds
      let getTopOdd = $('[data-slide-top]');
      let getTeamOdds:any= $('', '[data-slide-odd]');
      let getFixturePanel:any = $('', '[data-fixture]');
      
      // before slide 2 animation comes in wait for 10s
      let prepare10Sec =  (1000*10);
      
      Interval({
        cb: () => {
            setCount('2/2')
         
            css(getTopOdd, {
               transform: 'translateX(-82.25vw)',
               zIndex: 0,
               transition: '.5s'
            })
            
            getTeamOdds.forEach((node:HTMLElement, i:number) => {
                  css(node, {
                  transform: 'translateX(-82.25vw)',
                  zIndex: 0,
                  transition: '.9s'
                  })
                  
                  css(getFixturePanel[i], {
                     zIndex:9,
                     borderBottom: '2px solid #ccc',
                     borderRight:'2px solid #212121',
                     background: '#ccc',
                     transition: '.9s'
                  })
            })
         },
      
         duration: prepare10Sec,
         useTimeout: true
      })
      
      // after another 5 seconds return to default.
      Interval({
      cb: () => {
         css(slide2, {
            transition: '.5s',
            opacity: 0,
         })

         css(slide2, {display: 'none'});
         css(slide1, {display: 'grid', transition: '.5s'});
         
         // Gradually fades in
         Animation(slide1, [
            {opacity: '.5'},
            {opacity: '1'}
            ], {
            duration: 1000,
            iterations: 1
         })
         
         lineUpTable()
         
         setCount('1/2')
         
         css(getTopOdd, {
            transform: 'translateX(0)',
            zIndex: 0,
            transition: '.5s'
         })
         
         getTeamOdds.forEach((node:HTMLElement, i:number) => {
               css(node, {
               transform: 'translateX(0)',
               zIndex: 0,
               transition: '.9s'
               })
               
               css(getFixturePanel[i], {
                  zIndex:0,
                  borderBottom: 'none',
                  borderRight:'none',
                  background: 'tranparent',
                  transition: '.5s'
               })
         })
   },
      
      duration: (1000*18),
      useTimeout: true
   })
   })
}



function slideOddEven(slideElements: NodeListOf<HTMLElement>) {
    function reuse(opacity?:string, transformOdd?: string, transformEven?: string) {
    
       for(let i =0; i < slideElements.length; i++) {
          //  take odd number to the left and even number to the right
          let getOddItems = (i+1) % 2 !== 0;
          if(getOddItems){
          //  odd number
          css(slideElements[i], {
             transform: `translateX(${transformOdd})`,
             opacity: `${opacity}`,
             transition: '.5s'
          })
          }else {
          // even number
          css(slideElements[i], {
             transform: `translateX(${transformEven})`,
             transition: '.5s',
             opacity: `${opacity}`
             })
          }
       }
    
    }
    
    reuse('0','-50rem','50rem');
    
    Interval({
       cb: reuse.bind(null, arguments[0]['arg']),
      duration: 1000,
      useTimeout: true,
      arg: ['1', '0rem', '0rem']
    })
}


function lineUpTable( ){
   const tables:any = $('', '[data-tables]');
   
   tables.forEach((table:HTMLElement) => {
      css(table, {opacity: 0})
   });
   
   tables.forEach((table:HTMLElement) => {
      setTimeout(() => {
         css(table, {opacity: 1})
      }, 1000)
   });
   
}