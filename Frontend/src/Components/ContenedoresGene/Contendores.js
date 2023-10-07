import './Contenedores.css'

import imagen from './../../img/a.webp'
import casa from './../../img/casa-removebg-preview.png'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Cajas from './../Cajas/Caja'
import Cargos from './../Cargos/Cargos'
import Cliente from '../Clientes/Clientes'
import Resta from '../Restaurantes/Resta'
import Personal from '../Personal/Personal'
import Admi from '../Administradores/Admi'
import Facturas from '../Facturas/Facturas'

export default function Contenedor(){
    return(
        <div className='Contenedor'>
            <Router>
            <div className='contenedor-izq'>
                <img className='imagen-izq' src={imagen} alt='dasda'></img>
                <Link to="/create/">
                    <a href="/"><img className="imagen-casita" src={casa} alt='Holi'></img></a>
                </Link>
                <Link to="/create/caja">Cajas</Link>
                <Link to="/create/cargo">Cargos</Link>
                <Link to="/create/cliente">Clientes</Link>
                <Link to="/create/factura">Facturas</Link> 
                <Link to="/create/personal">Personal</Link>
                <Link to="/create/restaurante">Restaurantes</Link>
                <Link to="/create/administrador">Administradores</Link>
            </div>
            <Switch>
                <Route exact path="/create/caja">
                    <div className='contenedor-der'>
                        <Cajas></Cajas>
                    </div>
                </Route>
                <Route path="/create/cargo">
                    <div className='contenedor-der'>
                        <Cargos></Cargos>
                    </div>
                </Route>
                <Route path="/create/cliente">
                    <div className='contenedor-der'>
                        <Cliente></Cliente>
                    </div>
                </Route>
                <Route path="/create/restaurante">
                    <div className='contenedor-der'>
                        <Resta></Resta>
                    </div>
                </Route>
                <Route path="/create/personal">
                    <div className='contenedor-der'>
                        <Personal></Personal>
                    </div>
                </Route>
                <Route path="/create/administrador">
                    <div className='contenedor-der'>
                        <Admi></Admi>
                    </div>
                </Route>
                <Route path="/create/factura">
                    <div className='contenedor-der'>
                        <Facturas></Facturas>
                    </div>
                </Route>
            </Switch>
        </Router>
        </div>
    )
} 