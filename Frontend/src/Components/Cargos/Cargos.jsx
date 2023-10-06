import React from "react";
import Modall from "./CrearCargo";
import ReadCargo from "./ReadCargo";

export default function Cargos(){
    return(
        <div>
            <div className='contenedor-der-main'>
                <div className='titulo'>
                    <h1>Cargos</h1>
                </div>
            </div>
            <Modall></Modall>
            <ReadCargo></ReadCargo>
        </div>
    )
}