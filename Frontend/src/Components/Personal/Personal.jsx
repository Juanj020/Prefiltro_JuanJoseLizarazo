import React from "react";
import Modall from "./CrearPersonal";
import ReadPersonal from './ReadPersonal'

export default function Personal(){
    return(
        <div>
            <div className='contenedor-der-main'>
                <div className='titulo'>
                    <h1>Personal</h1>
                </div>
            </div>
            <Modall></Modall>
            <ReadPersonal></ReadPersonal>
        </div>
    )
}