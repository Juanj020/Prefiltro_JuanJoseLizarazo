import React from "react";
import Modall from "./CrearAdmi";
import ReadAdmi from './ReadAdmi'

export default function Admi(){
    return(
        <div>
            <div className='contenedor-der-main'>
                <div className='titulo'>
                    <h1>ADMINISTRADORES</h1>
                </div>
            </div>
            <Modall></Modall>
            <ReadAdmi></ReadAdmi>
        </div>
    )
}