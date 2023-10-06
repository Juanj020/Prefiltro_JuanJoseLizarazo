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
  const [categoria, setCategoria] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');

  useEffect(() => {
    if (isOpen && dataToUpdate) {
      setNombre(dataToUpdate.nombre);
      setDireccion(dataToUpdate.direccion);
      setCategoria(dataToUpdate.categoria);
      setTelefono(dataToUpdate.telefono);
    }
  }, [isOpen, dataToUpdate]);

  const updateDataHandler = () => {
    axios
      .put(`http://localhost:4002/api/restaurante/${dataToUpdate._id}`, {
        nombre,
        direccion,
        categoria,
        telefono
      })
      .then(() => {
        updateData(dataToUpdate._id, nombre, direccion, categoria, telefono);
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='mondal'>
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Actualizar Registro">
      <h2>Actualizar Registro del restaurante</h2>
      <Form className="update-form">
      <div className='conenido-modal'>
        <Form.Field className='input'>
          <label>Nombre restaurante</label>
          <input
            placeholder="Nombre del restaurante"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Field>
        <Form.Field className='input'>
          <label>Direccion</label>
          <input
            placeholder="Escriba la direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </Form.Field>
        <Form.Field className='input'>
          <label>Categoria restaurante</label>
          <input
            placeholder="Categoria restaurante"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
        </Form.Field>
        <Form.Field className='input'>
          <label>Telefono</label>
          <input
            type='number'
            placeholder="Escriba el numero"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
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
