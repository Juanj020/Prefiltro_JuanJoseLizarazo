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
  const [direccion, setDireccion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [telefono, setTelefono] = useState('');



  const postData = () => {
    axios.post(`http://localhost:4002/api/restaurante`, {
      nombre,
      direccion,
      categoria,
      telefono
    }).then(() => {
      history.push("/create/restaurante")
      window.location.reload();
    })
  }

  return (
    <div className='mondal'>
      <button onClick={openModal}>Crear Restaurante - Sucursal</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Ejemplo de Modal">
      <h2 className='titulo-modal'>Ingrese el nuevo restaurante</h2>
        <Form className="create-form">
          <div className='conenido-modal'>
          <Form.Field className='input'>
            <label>Nombre de restaurante</label>
            <input placeholder="Nombre restaurante" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </Form.Field>
          <Form.Field className='input'>
            <label>Direccion</label>
            <input placeholder="Direccion restaurante" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          </Form.Field>
          <Form.Field className='input'>
            <label>Categoria</label>
            <input placeholder="Categoria restaurante" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
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
