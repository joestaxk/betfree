import { useState } from 'react'
import './App.css'
import io from 'socket.io-client';

const socket  = io('http://localhost:3000');

function App() {
  const [timer, setTimer] = useState<string>('');
  
  socket.on('running_countdown', function(res:string){
    setTimer(res)
  })
  
  return (
    <div className="App">
      <div className="timer">{timer}</div>
    </div>
  )
}

export default App