import mongo, {ObjectId} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.URL_MONGO;
const cliente = new mongo.MongoClient(url);

cliente.connect();

const db = cliente.db("restaurante");
const coleccion = db.collection("Personal");

const getPersonal = async (req, res) => {
    try {
        const resultado = await coleccion.aggregate([
            {
                $lookup: {
                    from: 'Cargos',
                    localField: 'idCargo',
                    foreignField: '_id',
                    as: 'cargo'
                }
            },
            {
                $unwind: '$cargo'
            },
            {
                $project: {
                    _id: 1,
                    nombre: 1,
                    apellido: 1,
                    sueldo: 1,
                    turno: 1,
                    fechaNacimiento: 1,
                    idCargo: '$cargo.nombre'
                }
            }
        ]).toArray();
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(400).json({mensaje:"llorelo papá"})
    }
}

const postPersonal = async (req, res) => {
    try {
        const {nombre, apellido, sueldo, turno, Cargo , fecha} = req.body;
        const idCargo = new ObjectId(Cargo);
        const fechaNacimiento = new Date(fecha)
        const resultado = await coleccion.insertOne({nombre, apellido, sueldo, turno, idCargo, fechaNacimiento});
        res.status(200).json(req.body);
    } catch (error) {
        console.log(error);
        res.status(400).json({mensaje: "a llorarlo"})
    }
}


const updatePersonal = async (req, res) => {
    try {
        const {_id} = req.params;
        const idPersonal = new ObjectId(_id);
        const {nombre, apellido, sueldo, turno, Cargo, fecha} = req.body;
        const idCargo = new ObjectId(Cargo);
        const fechaNacimiento = new Date(fecha);
        const resultado = await coleccion.updateOne({_id:idPersonal},{$set : {nombre, apellido, sueldo, turno, idCargo, fechaNacimiento}});
        res.status(200).json({mensaje:"Personal actualizado correctamente" , info : req.body})
    } catch (error) {
        console.log(error);
        res.status(400).json({mensaje : "f en el chat"})
    }
}

const deletePersonal = async (req, res) => {
    try {
        const  {_id} = req.params;
        const idPersonal = new ObjectId(_id);
        const resultado = await coleccion.deleteOne({_id: idPersonal});
        res.status(200).json({mensaje:"Personal eliminado correctamente"});
    } catch (error) {
        console.log(error);
        res.status(400).json({mensaje:"Llorelo pana rabit"});
    }
}

export {getPersonal, postPersonal, updatePersonal, deletePersonal}