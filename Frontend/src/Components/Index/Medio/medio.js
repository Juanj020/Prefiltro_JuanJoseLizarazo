import "./medio.css"
import imagen from './../../../img/a.webp'
import imagenCentro from './../../../img/planta.webp'

export default function Medio() {
    return (
        <div className="medio">
            <div className="centro">
                <img src={imagenCentro} alt="wenas"></img>
                <div>
                    <h1>Novedades</h1>
                </div>
                <div className="centro-centro">
                    <div className="izq">
                        <p>Te inivtamos a comer la mejor comida por a nivel internacional con la mejor reputación</p>
                    </div>
                    <hr class="linea"></hr>
                    <div className="der">
                        <button>Conocer más</button>
                    </div>
                </div>
            </div>
            <img src={imagen} alt="f"/>
        </div>
    )
}