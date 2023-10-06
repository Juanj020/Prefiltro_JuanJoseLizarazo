import React from "react";
import Modall from "./CrearRestaurante";
import ReadCliente from '../Clientes/ReadCliente'

export default function Restaurante(){
    return(
        <div>
            <div className='contenedor-der-main'>
                <div className='titulo'>
                    <h1>Restaurantes</h1>
                </div>
            </div>
            <Modall></Modall>
            <ReadCliente></ReadCliente>
        </div>
    )
}