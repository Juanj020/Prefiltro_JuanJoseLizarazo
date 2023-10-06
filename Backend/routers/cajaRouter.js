import { Router } from "express";
import { getCaja, postCaja, updateCaja, deleteCaja } from "../controllers/cajaControllers.js";
import { check } from "express-validator";
import { validateDocuments } from "../middleware/validateDocuments.js";

const ruta = Router();

ruta.get("/", getCaja);
ruta.post("/",[
    check("numeroCaja","El número de la caja esta vacio").not().isEmpty(),
    check("descripcion","La descripción esta vacia").not().isEmpty(),
    validateDocuments
], postCaja);
ruta.put("/:_id", updateCaja);
ruta.delete("/:_id", deleteCaja);

export default ruta;