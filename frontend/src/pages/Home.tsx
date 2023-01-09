import { Link } from 'react-router-dom'
import '../App.css'

export function Home() {
    return (
        <div className="App">
            <h1>Betfree VFL</h1>
            
            <div className="bar-tab">
                <Link to="live">
                    <div className='live'>
                        <div className="tv">
                            Live TV
                        </div>
                    </div>
                </Link>
                
                <Link to="epl">
                    <div className='market'>
                        <div className="epl">Premier LEAGUE</div>
                    </div>
                </Link>
                
            </div>
        </div>
    )
}