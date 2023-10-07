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
  const [descripcion, setDescripcion] = useState('');

  const postData = () => {
    axios.post(`http://localhost:4002/api/cargo`, {
      nombre,
      descripcion
    }).then(() => {
      history.push("/create/cargo")
      window.location.reload();
    })
  }

  return (
    <div className='mondal'>
      <Button onClick={openModal}>Crear Cargo del Personal</Button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="">
      <h2 className='titulo-modal'>Ingrese el nuevo Cargo del personal</h2>
        <Form className="create-form">
          <div className='conenido-modal'>
          <Form.Field className='input'>
            <label>Nombre del cargo</label>
            <input placeholder="Nom cargo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </Form.Field>
          <Form.Field className='input'>
            <label>Descripción del cargo</label>
            <input placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
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
