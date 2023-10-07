import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
import './Modal.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(95, 95, 95, 0.93)',
    width:'900px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
};

Modal.setAppElement('#root');

export default function UpdateModal({ isOpen, closeModal, dataToUpdate, updateData }) {
  const [idPersonall, setIdPersonal] = useState('');
  const [idRestaurantee, setIdRestaurante] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [APIData, setAPIData] = useState([]);
  const [APIData2, setAPIData2] = useState([]);

  useEffect(() => {
    if (isOpen && dataToUpdate) {
      setIdPersonal(dataToUpdate.idPersonall);
      setIdRestaurante(dataToUpdate.idRestaurantee);
      setCorreo(dataToUpdate.correo);
      setTelefono(dataToUpdate.telefono);
    }
  }, [isOpen, dataToUpdate]);

  const updateDataHandler = () => {
    axios
      .put(`http://localhost:4002/api/administrador/${dataToUpdate._id}`, {
        idPersonall,
        idRestaurantee,
        correo,
        telefono
      })
      .then(() => {
        updateData(dataToUpdate._id, idPersonall, idRestaurantee, correo, telefono);
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getData = () => {
    axios.get(`http://localhost:4002/api/personal`).then((response) => {
    setAPIData(response.data);
    });
  }

  const getDataRes = () => {
    axios.get(`http://localhost:4002/api/restaurante`).then((response) => {
    setAPIData2(response.data);
    });
  }

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getDataRes();
  }, []);

  return (
    <div className='mondal'>
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Actualizar Registro">
      <h2>Actualizar Registro del administrador</h2>
      <Form className="update-form">
      <div className='conenido-modal'>
        <Form.Field className='input'>
          <label>Cargo</label>
          <select value={idPersonall} onChange={(e) => setIdPersonal(e.target.value)}>
              <option value="">Selecciona un cargo</option>
              {APIData.map((data) => (
                <option key={data._id} value={data._id}>
                  {data.nombre}
                </option>
              ))}
          </select>
        </Form.Field>
        <Form.Field className='input'>
          <label>Restaurante</label>
          <select value={idRestaurantee} onChange={(e) => setIdRestaurante(e.target.value)}>
          <option value="">Selecciona un restaurante</option>
              {APIData2.map((data) => (
                <option key={data._id} value={data._id}>
                  {data.nombre}
                </option>
              ))}
          </select>
        </Form.Field>
        <Form.Field className='input'>
          <label>Correo</label>
          <input
          type='email'
            placeholder="Correo personal"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </Form.Field>
        <Form.Field className='input'>
          <label>Telefono</label>
          <input placeholder="Telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
        </Form.Field>
        <Form.Field className='input'>

        </Form.Field>
        </div>
        <div className='botones'>
        <Button type="button" onClick={updateDataHandler}>
          Actualizar
        </Button>
        </div>
      </Form>
    </Modal>
    </div>
  );
}
