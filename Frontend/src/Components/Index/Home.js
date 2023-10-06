import './Index.css';
import miVideo from './../../img/video.mp4';
import Medio from './Medio/medio';
import Navbar from './Navbar/Navbar'
import { BrowserRouter as Router } from 'react-router-dom';


export default function Index() {
    return (
        <Router>
            <div className='main'>
                <Navbar></Navbar> 
                <video autoPlay loop muted>
                    <source src={miVideo} type="video/mp4" />
                </video>
                <div className=''>
                    <h1>Lo mejor de comida que podrás encontrar</h1>
                </div>
            </div>
            <div className='main-medio'>
                <h1>#FoodRicca</h1>
            </div>
            <div className='medio'>
                <Medio></Medio>
            </div>
        </Router>
    )
}
