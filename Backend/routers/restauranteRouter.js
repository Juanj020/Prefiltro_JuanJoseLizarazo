import { Router } from "express";
import { getRestaurantes, postRestaurante, updateRestaurante, deleteRestaurante } from "../controllers/restauranteControllers.js";
import { validateDocuments } from "../middleware/validateDocuments.js";
import { check } from "express-validator";

const ruta = new Router();
//nombre, direccion, categoria, telefono
ruta.get("/", getRestaurantes);
ruta.post("/",[
    check("nombre","El nombre del restaurante esta vacio").not().isEmpty(),
    check("direccion","La direccion del restaurante esta vacio").not().isEmpty(),
    check("categoria","La categoria del restaurante esta vacia").not().isEmpty(),
    check("telefono","El telefono del restaurante esta vacia").not().isEmpty(),
    validateDocuments
], postRestaurante);
ruta.put("/:_id", updateRestaurante);
ruta.delete("/:_id", deleteRestaurante);

export default ruta;
