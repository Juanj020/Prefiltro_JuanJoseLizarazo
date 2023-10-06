import express from 'express';
import clienteRouter from './../routers/clientesRouter.js';
import cajaRouter from './../routers/cajaRouter.js';
import restauranteRouter from './../routers/restauranteRouter.js';
import cargoRouter from './../routers/cargoRouter.js';
import personalRouter from './../routers/personalRouter.js';
import administradorRouter from './../routers/adminsitradorRouter.js';
import facturaRouter from './../routers/facturaRouter.js'; 
import cors from 'cors';

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORTO;
        this.clientePath = "/api/cliente";
        this.cajaPath = "/api/caja";
        this.restaurantePath = "/api/restaurante";
        this.cargoPath = "/api/cargo";
        this.personalPath = "/api/personal";
        this.administradorPath = "/api/administrador"
        this.facturaPath = "/api/factura";

        this.middlewares(express.static);

        this.routes();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors())
    }

    routes(){
        this.app.use(this.clientePath, clienteRouter);
        this.app.use(this.cajaPath, cajaRouter);
        this.app.use(this.restaurantePath, restauranteRouter);
        this.app.use(this.cargoPath, cargoRouter)
        this.app.use(this.personalPath , personalRouter);
        this.app.use(this.administradorPath, administradorRouter);
        this.app.use(this.facturaPath, facturaRouter);
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Conectado en el puerto ${this.port}`);
        })
    }
}

export default Server;