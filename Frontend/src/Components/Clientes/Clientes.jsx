import React from "react";
import Modall from "./CrearCliente";
import ReadCliente from '../Clientes/ReadCliente'

export default function Cliente(){
    return(
        <div>
            <div className='contenedor-der-main'>
                <div className='titulo'>
                    <h1>Cliente</h1>
                </div>
            </div>
            <Modall></Modall>
            <ReadCliente></ReadCliente>
        </div>
    )
}