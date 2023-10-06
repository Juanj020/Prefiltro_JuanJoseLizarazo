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

  //nombre apellido sueldo turno  idCargo fechaNacimiento 
  // {nombre, apellido, sueldo, turno, Cargo , fecha}

  let history = useHistory();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [sueldo, setSueldo] = useState('');
  const [turno, setTurno] = useState('');
  const [Cargo, setCargo] = useState('');
  const [fecha, setFecha] = useState('');

  

  const postData = () => {
    axios.post(`http://localhost:4002/api/personal`, {
      nombre,
      apellido,
      sueldo,
      turno,
      Cargo,
      fecha,
    }).then(() => {
      history.push("/create/personal")
      window.location.reload();
    })
  }

  return (
    <div className='mondal'>
      <button onClick={openModal}>Crear personal</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="">
      <h2 className='titulo-modal'>Ingrese el nuevo personal</h2>
        <Form className="create-form">
          <div className='conenido-modal'>
          <Form.Field className='input'>
            <label>Nombre de personal</label>
            <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </Form.Field>
          <Form.Field className='input'>
            <label>apellido</label>
            <input placeholder="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </Form.Field>
          <Form.Field className='input'>
            <label>sueldo</label>
            <input placeholder="sueldo" value={sueldo} onChange={(e) => setSueldo(e.target.value)} />
          </Form.Field>
          <Form.Field className='input'>
            <label>turno</label>
            <input placeholder="turno" value={turno} onChange={(e) => setTurno(e.target.value)} />
          </Form.Field>
          <Form.Field className='input'>
            <label>Cargo</label>
            <input placeholder="cargo" value={Cargo} onChange={(e) => setCargo(e.target.value)} />
          </Form.Field>
          <Form.Field className='input'>
            <label>Fecha</label>
            <input type='Date' placeholder="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />
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
