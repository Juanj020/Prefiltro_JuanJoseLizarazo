import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from "axios";
import { Button, Form } from "semantic-ui-react";
import { useHistory } from "react-router";
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

export default function Modall() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  let history = useHistory();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');

  

  const postData = () => {
    axios.post(`http://localhost:4002/api/cliente`, {
      nombre,
      apellido,
      direccion,
      telefono
    }).then(() => {
      history.push("/create/cliente")
      window.location.reload();
    })
  }

  return (
    <div className='mondal'>
      <button onClick={openModal}>Crear Cliente</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Ejemplo de Modal">
      <h2 className='titulo-modal'>Ingrese el nuevo Cliente</h2>
        <Form className="create-form">
          <div className='conenido-modal'>
          <Form.Field className='input'>
            <label>Nombre de cliente</label>
            <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </Form.Field>
          <Form.Field className='input'>
            <label>Apellido</label>
            <input placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </Form.Field>
          <Form.Field className='input'>
            <label>Direccion</label>
            <input placeholder="Direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          </Form.Field>
          <Form.Field className='input'>
            <label>Telefono</label>
            <input placeholder="Telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          </Form.Field>
          </div>
          <div className='botones'>
          <Button type="submit" onClick={postData}>Crear</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
