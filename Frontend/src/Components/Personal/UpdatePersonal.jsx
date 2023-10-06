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
  const [sueldo, setSueldo] = useState('');
  const [turno, setTurno] = useState('');
  const [Cargo, setCargo] = useState('');
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    if (isOpen && dataToUpdate) {
      setNombre(dataToUpdate.nombre);
      setApellido(dataToUpdate.apellido);
      setSueldo(dataToUpdate.sueldo);
      setTurno(dataToUpdate.turno);
      setCargo(dataToUpdate.Cargo);
      setFecha(dataToUpdate.fecha);
    }
  }, [isOpen, dataToUpdate]);

  const updateDataHandler = () => {
    axios
      .put(`http://localhost:4002/api/personal/${dataToUpdate._id}`, {
        nombre,
        apellido,
        sueldo,
        turno,
        Cargo,
        fecha,
      })
      .then(() => {
        updateData(dataToUpdate._id, nombre, apellido, sueldo, turno, Cargo, fecha,);
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='mondal'>
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Actualizar Registro">
      <h2>Actualizar Registro del Personal</h2>
      <Form className="update-form">
      <div className='conenido-modal'>
        <Form.Field className='input'>
          <label>Nombre personal</label>
          <input
            placeholder="Nombre del personal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Field>
        <Form.Field className='input'>
          <label>Apellido</label>
          <input
            placeholder="Escriba la Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </Form.Field>
        <Form.Field className='input'>
          <label>Sueldo personal</label>
          <input
            placeholder="Sueldo personal"
            value={sueldo}
            onChange={(e) => setSueldo(e.target.value)}
          />
        </Form.Field>
        <Form.Field className='input'>
          <label>Turno personal</label>
          <input placeholder="Turno personal" value={turno} onChange={(e) => setTurno(e.target.value)}/>
        </Form.Field>
        <Form.Field className='input'>
          <label>Cargo</label>
          <input placeholder="Escriba el numero" value={Cargo} onChange={(e) => setCargo(e.target.value)}
          />
        </Form.Field>
        <Form.Field className='input'>
            <label>Fecha</label>
            <input type='Date' placeholder="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />
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
