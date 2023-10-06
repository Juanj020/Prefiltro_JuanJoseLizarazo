import dotenv from 'dotenv';
import mongo, {ObjectId} from 'mongodb';
dotenv.config();

const url = process.env.URL_MONGO;
const usuario = new mongo.MongoClient(url);
usuario.connect()

const db = usuario.db("restaurante");
const coleccion = db.collection("Cargos");

const getCargo = async (req, res) => {
    try {
        const resultado = await coleccion.find().toArray();
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.json({mensaje:"Llorelo f"})
    }
}

const postCargo = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const nombreExiste = await coleccion.findOne({nombre});
        if(nombreExiste){
            return res.status(400).json({
                msg: "El nombre del cargo ya existe!"
            })
        }
        const resultado = await coleccion.insertOne({nombre, descripcion});
        res.json(req.body);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Llorelo" });
    }
}

const updateCargo = async (req, res) => {
    try {
        const { _id } = req.params;
        const idCargo = new ObjectId(_id);
        const { nombre, descripcion } = req.body;
        await coleccion.updateOne({ _id: idCargo }, { $set: { nombre, descripcion } });
        res.json({mensaje:"Cargo actualizado correctamente"});
    } catch (error) {
        res.json({error : "Llorelo pai"})
        console.log(error);
    }
}

const deleteCargo = async (req, res) => {
    try {
        const { _id } = req.params;
        const idCargo = new ObjectId(_id);
        await coleccion.deleteOne({ _id: idCargo });
        res.json({mensaje:"Eliminado exitosamente pai"});
    } catch (error) {
        res.json({error:"Llorelo f"})
        console.log(error);
    }
}

export {getCargo, postCargo, updateCargo, deleteCargo}