import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Index from './Components/Index/Home';
import Contenedor from './Components/ContenedoresGene/Contendores';
import ImgCasita from './img/casa-removebg-preview.png'
import ImgAdmin from './img/admin.png'

function App() {
  return (
    <Router>
      <div className='mani'>
        <Link to='/'>
          <img src={ImgCasita} alt='se fue'></img>
        </Link>
        <Link to='/create/caja'>
          <img className='img-admin' src={ImgAdmin} alt='se fue'></img>
        </Link>
      </div>

      <div>
        <Route path="/create/caja" component={Contenedor}></Route>
      </div>
      <div>
        <Route exact path="/" component={Index}></Route>
      </div >
      <div>
        <Route path="/create/cargo" component={Contenedor}></Route>
      </div>
      <div>
        <Route path="/create/cliente" component={Contenedor}></Route>
      </div>

    </Router >
  );
}

export default App;
