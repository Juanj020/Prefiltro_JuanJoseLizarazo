import React from "react";
import Modall from "./CrearResta";
import Restaa from './ReadResta'

export default function Resta(){
    return(
        <div>
            <div className='contenedor-der-main'>
                <div className='titulo'>
                    <h1>Restaurantes</h1>
                </div>
            </div>
            <Modall></Modall>
            <Restaa></Restaa>
        </div>
    )
}