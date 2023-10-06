import { Router } from "express";
import { deletePersonal, getPersonal, postPersonal, updatePersonal } from "../controllers/personalControllers.js";
import { validateDocuments } from "../middleware/validateDocuments.js";
import { check } from "express-validator";


const ruta = Router();

//nombre, apellido, sueldo, turno, Cargo , fecha

ruta.get("/", getPersonal);
ruta.post("/",[
    check("nombre","El nombre del personal esta vacio").not().isEmpty(),
    check("apellido","El nombre del personal esta vacio").not().isEmpty(),
    check("sueldo","El sueldo esta vacio").not().isEmpty(),
    check("turno", "El tueno esta vacio").not().isEmpty(),
    check("Cargo","La dirección esta vacia").not().isEmpty(),
    check("Cargo","El idCargo es un objectId invalido ").isMongoId(),
    check("fecha", "La fecha nacimiento esta vacia").not().isEmpty(),
    validateDocuments
], postPersonal);
ruta.put("/:_id", updatePersonal)
ruta.delete("/:_id", deletePersonal);

export default ruta;