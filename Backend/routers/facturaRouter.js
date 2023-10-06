import {Router} from 'express';
import { getFactura, postFactura, updateFactura, deleteFactura } from '../controllers/facturaControllers.js';
import { validateDocuments } from "../middleware/validateDocuments.js";
import { check } from "express-validator";

const ruta = Router();

ruta.get("/", getFactura)
ruta.post("/",[
    check("idClientee","El idCliente esta vacio").not().isEmpty(),
    check("idClientee","No idCliente es un objectId invalido ").isMongoId(),
    check("idCajaa","El idCaja esta vacio").not().isEmpty(),
    check("idCajaa","No idCaja es un objectId invalido ").isMongoId(),
    check("idPersonall","El idPersonal esta vacio").not().isEmpty(),
    check("idPersonall","No idPersonal es un objectId invalido ").isMongoId(),
    check("idRestaurantee","El idRestaurante esta vacio").not().isEmpty(),
    check("idRestaurantee","No idRestaurante es un objectId invalido ").isMongoId(),
    check("precioTotal","La precio total esta vacio").not().isEmpty(),
    check("fechaCompraa","La fecha esta vacia").not().isEmpty(),
    check("formaDePago","La forma de pago esta vacia").not().isEmpty(),
    validateDocuments
], postFactura);
ruta.put("/:_id", updateFactura);
ruta.delete("/:_id", deleteFactura);

export default ruta;