import mongo, { ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.URL_MONGO;

const cliente = new mongo.MongoClient(url);
cliente.connect();

const db = cliente.db("restaurante");
const coleccion = db.collection("Facturas");

const getFactura = async (req, res) => {
    try {
        const resultado = await coleccion.find().toArray();
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).json({mensaje:"Pailas pai"})
        console.log(error);
    }
} //react dom 5.2.0

const postFactura = async (req, res) => {
    try {
        const {idClientee, idCajaa, idPersonall, precioTotal, fechaCompraa, formaDePago, idRestaurantee} = req.body; 
        const idCliente = new ObjectId(idClientee);
        const idCaja = new ObjectId(idCajaa);
        const idPersonal = new ObjectId(idPersonall);
        const fechaCompra = new Date(fechaCompraa);
        const idRestaurante = new ObjectId(idRestaurantee);
        const resultado = await coleccion.insertOne({idCliente, idCaja, idPersonal, precioTotal, fechaCompra, formaDePago, idRestaurante});
        res.status(200).json({resultado, data: req.body});
    } catch (error) {
        res.status(400).json({mensaje:"Pailas pai"})
        console.log(error);
    }
}

const updateFactura = async (req, res) => {
    try {
        const {_id} = req.params;
        const idFactura = new ObjectId(_id)
        const {idClientee, idCajaa, idPersonall, precioTotal, fechaCompraa, formaDePago, idRestaurantee} = req.body; 
        const idCliente = new ObjectId(idClientee);
        const idCaja = new ObjectId(idCajaa);
        const idPersonal = new ObjectId(idPersonall);
        const fechaCompra = new Date(fechaCompraa);
        const idRestaurante = new ObjectId(idRestaurantee);
        const resultado = await coleccion.updateOne({_id:idFactura},{$set : {idCliente, idCaja, idPersonal, precioTotal, fechaCompra, formaDePago, idRestaurante}});
        res.status(200).json({resultado, data:req.body})
    } catch (error) {
        res.status(400).json({mensaje:"Se fue"})
        console.log(error);
    }
}

const deleteFactura = async (req, res)=>{
    try {
        const {_id} = req.params;
        const idFactura = new ObjectId(_id)
        const resultado = await coleccion.deleteOne({_id:idFactura});
        res.status(200).json({mensaje:"Factura eliminada correctamente"});
    } catch (error) {
        console.log(error);
        res.status(400).json({mensaje:"No sirve, a llorarlo xd"})
    }
}

export {getFactura, postFactura, updateFactura, deleteFactura}
