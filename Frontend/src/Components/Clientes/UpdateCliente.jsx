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
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');

  useEffect(() => {
    if (isOpen && dataToUpdate) {
      setNombre(dataToUpdate.nombre);
      setApellido(dataToUpdate.apellido);
      setDireccion(dataToUpdate.direccion);
      setTelefono(dataToUpdate.telefono);
    }
  }, [isOpen, dataToUpdate]);

  const updateDataHandler = () => {
    axios
      .put(`http://localhost:4002/api/cliente/${dataToUpdate._id}`, {
        nombre,
        apellido,
        direccion,
        telefono
      })
      .then(() => {
        updateData(dataToUpdate._id, nombre, apellido, direccion, telefono);
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='mondal'>
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Actualizar Registro">
      <h2>Actualizar Registro</h2>
      <Form className="update-form">
      <div className='conenido-modal'>
        <Form.Field className='input'>
          <label>Nombre cliente</label>
          <input
            placeholder="Ej: 4"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Field>
        <Form.Field className='input'>
          <label>Apellido cliente</label>
          <input
            placeholder="Descripción"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </Form.Field>
        <Form.Field className='input'>
          <label>Direccion</label>
          <input
            placeholder="Descripción"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </Form.Field>
        <Form.Field className='input'>
          <label>Telefono</label>
          <input
            placeholder="Descripción"
            value={apellido}
            onChange={(e) => setDireccion(e.target.value)}
          />
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
