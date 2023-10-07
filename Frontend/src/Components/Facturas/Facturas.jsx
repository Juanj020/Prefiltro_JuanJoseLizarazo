import React from "react";
import Modall from "./CrearFacturas";
import ReadFacturas from './ReadFacturas'

export default function Facturas(){
    return(
        <div>
            <div className='contenedor-der-main'>
                <div className='titulo'>
                    <h1>Facturas</h1>
                </div>
            </div>
            <Modall></Modall>
            <ReadFacturas></ReadFacturas>
        </div>
    )
}