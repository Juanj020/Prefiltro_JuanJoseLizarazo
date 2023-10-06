import { Router } from 'express';
import { getCargo, postCargo, updateCargo, deleteCargo } from '../controllers/cargoControllers.js';
import { check } from "express-validator";
import { validateDocuments } from "../middleware/validateDocuments.js";

const ruta = Router();

ruta.get("/", getCargo);
ruta.post("/",[
    check("nombre","El nombre del cargo esta vacio").not().isEmpty(),
    check("descripcion","La descripción del cargo esta vacia").not().isEmpty(),
    validateDocuments
], postCargo);
ruta.put("/:_id", updateCargo)
ruta.delete("/:_id", deleteCargo)

export default ruta;
