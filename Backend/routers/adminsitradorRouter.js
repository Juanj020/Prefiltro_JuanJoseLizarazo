import { Router } from "express";
import {getAdministrador, postAdministrador, updateAdministrador, deleteAdministrador } from "../controllers/administradorControllers.js";
import { validateDocuments } from "../middleware/validateDocuments.js";
import { check } from "express-validator";

const ruta = Router();

ruta.get("/",getAdministrador);
ruta.post("/",[
    check("idPersonall","El idPersonal esta vacio").not().isEmpty(),
    check("idPersonall","No idPersonal es un objectId invalido ").isMongoId(),
    check("idRestaurantee","El idRestaurante esta vacio").not().isEmpty(),
    check("idRestaurantee","No idRestaurante es un objectId invalido ").isMongoId(),
    check("correo", "No tiene formato de correo").isEmail(),
    check("correo", "El correo esta vacio").not().isEmpty(),
    validateDocuments
], postAdministrador);

ruta.put("/:_id", updateAdministrador);

ruta.delete("/:_id", deleteAdministrador);

export default ruta;

