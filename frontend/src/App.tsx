import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Live } from './pages/live';
import { Market } from './pages/market';
import { Socketio } from './component/context/socket-context';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="live" element={
          <Socketio.Consumer>
              { (socket) => (
                <Live getSocket={socket}/>
              )}
          </Socketio.Consumer>
          } />
      <Route path="epl" element={<Market />} />
    </Routes>
  )
}

export default App