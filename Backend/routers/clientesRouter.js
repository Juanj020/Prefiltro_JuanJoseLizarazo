import { Router } from "express";
import { getCliente, postCliente, updatecliente, deleteCliente} from "../controllers/clientesControllers.js";
import { check } from "express-validator";
import { validateDocuments } from "../middleware/validateDocuments.js";

const ruta = Router();

ruta.get("/", getCliente);
ruta.post("/",[
    check("nombre","El nombre del cliente esta vacio").not().isEmpty(),
    check("apellido","El apellido del cliente esta vacio").not().isEmpty(),
    check("direccion","La direccion del cliente esta vacio").not().isEmpty(),
    check("telefono","El telefono del cliente esta vacio").not().isEmpty(),
    validateDocuments
], postCliente);
ruta.put("/:_id", updatecliente);
ruta.delete("/:_id", deleteCliente);

export default ruta;