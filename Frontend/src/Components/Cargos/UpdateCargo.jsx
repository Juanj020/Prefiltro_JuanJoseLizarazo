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
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (isOpen && dataToUpdate) {
      setNombre(dataToUpdate.nombre);
      setDescripcion(dataToUpdate.descripcion);
    }
  }, [isOpen, dataToUpdate]);

  const updateDataHandler = () => {
    axios
      .put(`http://localhost:4002/api/caja/${dataToUpdate._id}`, {
        nombre,
        descripcion,
      })
      .then(() => {
        updateData(dataToUpdate._id, nombre, descripcion);
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='mondal'>
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Actualizar Registro">
      <h2>Actualizar Cargo</h2>
      <Form className="update-form">
      <div className='conenido-modal'>
        <Form.Field className='input'>
          <label>Nombre del cargo</label>
          <input
            placeholder="Ej: 4"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Field>
        <Form.Field className='input'>
          <label>Descripción del cargo</label>
          <input
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
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
