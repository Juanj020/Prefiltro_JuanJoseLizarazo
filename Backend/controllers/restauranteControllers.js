import dotenv from 'dotenv';
import mongo, {ObjectId} from 'mongodb';
dotenv.config();

const url = process.env.URL_MONGO

const cliente = new mongo.MongoClient(url);
cliente.connect();

const db = cliente.db("restaurante");
const coleccion = db.collection("Restaurantes");

const getRestaurantes = async (req, res) => {
    try {
        const resultado = await coleccion.find().toArray();
        res.json(resultado);
    } catch (error) {
        res.status(400).json({"error": "llorelo"})
        console.log(error);
    }
}

const postRestaurante = async (req, res) => {
    try {
        const { nombre, direccion, categoria, telefono } = req.body;
        const nombreExiste = await coleccion.findOne({nombre});
        if(nombreExiste){
            return res.status(400).json({
                msg: "El nombre ya existe!"
            })
        }
        const resultado = coleccion.insertOne({ nombre, direccion, categoria, telefono });
        res.json(req.body)
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"llorelo f"})
    }
}

const updateRestaurante = async (req, res) => {
    try {
        const {_id} = req.params;
        const { nombre, direccion, categoria, telefono } = req.body;

        const idRestaurante = new ObjectId(_id);
        const resultado = await coleccion.updateOne({ _id: idRestaurante }, { $set: { nombre, direccion, categoria, telefono } });
        res.json({mensaje:"Restaurante actualizado correctamente", info: req.body})
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"llorelo f"})
    }
}

const deleteRestaurante = async (req, res) => {
    try {
        const { _id } = req.params;
        const idRestaurante = new ObjectId(_id)
        await coleccion.deleteOne({ _id: idRestaurante });
        res.status(200).json({ mensaje: "Restaurante eliminado correctamente" });
    } catch (error) {
        res.status(400).json({error:"llorelo f"})
        console.log(error);
    }
}

export {getRestaurantes, postRestaurante, updateRestaurante, deleteRestaurante}
