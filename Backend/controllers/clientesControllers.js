import dotenv from 'dotenv';
import mongo, {ObjectId} from 'mongodb' 
dotenv.config()

const url = process.env.URL_MONGO;

const cliente = new mongo.MongoClient(url);
cliente.connect();

const db = cliente.db("restaurante")
const coleccion = db.collection("Clientes");

const getCliente = async (req, res)=>{
    try {
        const resultado = await coleccion.find().toArray();
        res.json(resultado)
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "f" });
    }
}

const postCliente = async (req, res) => {
    try {
        const {nombre, apellido, direccion, telefono} = req.body
        const resultado = await coleccion.insertOne(req.body);
        res.json(req.body)
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "f" });
    }
}

const updatecliente = async (req, res) => {
    try {
        const { _id } = req.params;
        const { nombre, apellido, direccion, telefono } = req.body;

        const clienteId = new ObjectId(_id);

        const resultado = await coleccion.updateOne(
            { _id: clienteId },
            { $set: { nombre, apellido, direccion, telefono } }
        );

        res.json({ mensaje: "Cliente actualizado con éxito", info: req.body });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "f" });
    } 
}


const deleteCliente = async (req, res) => {
    try {
        const {_id} = req.params;

        const clienteId = new ObjectId(_id);
        const resultado = await coleccion.deleteOne({_id:clienteId})
        res.status(200).json({"mensaje":"Eliminado correctamente"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "f" });
    }
}

export {getCliente, postCliente, updatecliente, deleteCliente}