import dotenv from 'dotenv';
import mongo, {ObjectId} from 'mongodb' 
dotenv.config()

const url = process.env.URL_MONGO;

const cliente = new mongo.MongoClient(url);
cliente.connect();

const db = cliente.db("restaurante")
const coleccion = db.collection("Administrador");

const getAdministrador = async (req, res)=>{
    try {
        const resultado = await coleccion.aggregate([
            {
              $lookup: {
                from: 'Personal',
                localField: 'idPersonal',
                foreignField: '_id',
                as: 'persona',
              },
            },
            {
              $lookup: {
                from: 'Restaurantes',
                localField: 'idRestaurante',
                foreignField: '_id',
                as: 'restaurante',
              },
            },
            {
              $unwind: '$persona',
            },
            {
              $unwind: '$restaurante',
            },
            {
              $project: {
                _id: 1,
                idPersonal: '$persona.nombre',
                idRestaurante: '$restaurante.nombre',
                correo: 1,
                telefono: 1,
              },
            },
          ]).toArray();
        res.json(resultado)
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "f" });
    }
}

const postAdministrador = async (req, res) => {
    try {
        const {idPersonall, idRestaurantee, correo, telefono} = req.body
        const idPersonal = new ObjectId(idPersonall) 
        const idRestaurante = new ObjectId(idRestaurantee)

        const correoExiste = await coleccion.findOne({correo});
        if(correoExiste){
            return res.status(400).json({
                msg: "El correo ya existe!"
            })
        }

        const resultado = await coleccion.insertOne({idPersonal, idRestaurante, correo, telefono});
        res.status(200).json(req.body)
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "f" });
    }
}

const updateAdministrador = async (req, res) => {
    try {
        const { _id } = req.params;
        const { idPersonall, idRestaurantee, correo, telefono } = req.body;
        const idPersonal = new ObjectId(idPersonall) 
        const idRestaurante = new ObjectId(idRestaurantee) 
        const administradorId = new ObjectId(_id);

        const adminisExiste = await coleccion.findOne({_id: administradorId});
        if(!adminisExiste){
             return res.json({error: `El _id es incorrecto`});
        }

        const resultado = await coleccion.updateOne(
            { _id: administradorId },
            { $set: { idPersonal, idRestaurante, correo, telefono } }
        );

        res.json({ mensaje: "Personal actualizado con éxito", info: req.body });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "f" });
    } 
}


const deleteAdministrador = async (req, res) => {
    try {
        const {_id} = req.params;

        const administradorId = new ObjectId(_id);
        const adminisExiste = await coleccion.findOne({_id: administradorId});
        if(!adminisExiste){
             return res.json({error: `El _id es incorrecto`});
        }
        const resultado = await coleccion.deleteOne({_id:administradorId})
        res.status(200).json({"mensaje":"Personal eliminado correctamente"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ "error": "f" });
    }
}

export {getAdministrador, postAdministrador, updateAdministrador, deleteAdministrador};