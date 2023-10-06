import dotenv from 'dotenv';
import mongo, {ObjectId} from 'mongodb' 
dotenv.config()

const url = process.env.URL_MONGO;

const cliente = new mongo.MongoClient(url);
cliente.connect();

const db = cliente.db("restaurante")
const coleccion = db.collection("Cajas");

const getCaja = async (req, res)=>{
    try {
        const resultado = await coleccion.find().toArray();
        res.json(resultado)
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "f" });
    }
}

const postCaja = async (req, res) => {
    try {
        const {numeroCaja, descripcion} = req.body
        const numeroExiste = await coleccion.findOne({numeroCaja});
        if(numeroExiste){
            return res.status(400).json({
                msg: "El número de la caja ya existe!"
            })
        }
        const resultado = await coleccion.insertOne(req.body);
        res.status(200).json(req.body)
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "f" });
    }
}

const updateCaja = async (req, res) => {
    try {
        const { _id } = req.params;
        const { numeroCaja, descripcion } = req.body;

        const clienteId = new ObjectId(_id);

        const resultado = await coleccion.updateOne(
            { _id: clienteId },
            { $set: { numeroCaja, descripcion } }
        );

        res.json({ mensaje: "Caja actualizado con éxito", info: req.body });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "f" });
    } 
}


const deleteCaja = async (req, res) => {
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

export {getCaja, postCaja, updateCaja, deleteCaja}