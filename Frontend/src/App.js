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
      <div>
        <Route path="/create/cliente" component={Contenedor}></Route>
      </div>
      <div>
        <Route path="/create/restaurante" component={Contenedor}></Route>
      </div>
      <div>
        <Route path="/create/personal" component={Contenedor}></Route>
      </div>
      <div>
        <Route path="/create/administrador" component={Contenedor}></Route>
      </div>
      <div>
        <Route path="/create/factura" component={Contenedor}></Route>
      </div>
    </Router >
  );
}

export default App;


/* 
db.Personal.aggregate([
            {
                $lookup: {
                    from: 'Cargos',
                    localField: "idCargo",
                    foreignField: "_id",
                    as: "cargo"
                },
            {
                $project: {
                    nombre: 1,
                    apellido: 1,
                    sueldo: '1,
                    turno: 1,
                    cargo.nombre: 1
                    fechaNacimiento: 1
                }
            }
            }])
            
            */