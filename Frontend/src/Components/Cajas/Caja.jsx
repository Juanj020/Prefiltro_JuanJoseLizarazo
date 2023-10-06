import React from "react";
import Modall from "./CrearCaja";
import ReadCaja from './../Cajas/ReadCaja'

export default function Cajas(){
    return(
        <div>
            <div className='contenedor-der-main'>
                <div className='titulo'>
                    <h1>Cajas</h1>
                </div>
            </div>
            <Modall></Modall>
            <ReadCaja></ReadCaja>
        </div>
    )
}