import React, { useState, useEffect } from 'react';
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

 /*  "idPersonal": "6512fc3bb904e54c72c718d3",
  "idRestaurante": "6511c25385caff6112c5f2ac",
  "correo": "admin1@example.com",
  "telefono": 1234567890 */

  let history = useHistory();
  const [idPersonall, setIdPersonal] = useState('');
  const [idRestaurantee, setIdRestaurante] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [APIDataa, setAPIDataa] = useState([]);
  const [APIData2, setAPIData2] = useState([]);

  const postData = () => {
    axios.post(`http://localhost:4002/api/administrador`, {
      idPersonall,
      idRestaurantee,
      correo,
      telefono
    }).then(() => {
      history.push("/create/administrador")
      window.location.reload();
    })
  }
  const getDataa = () => {
    axios.get(`http://localhost:4002/api/personal`).then((response) => {
    setAPIDataa(response.data);
    });
  }

  const getDataRes = () => {
    axios.get(`http://localhost:4002/api/restaurante`).then((response) => {
    setAPIData2(response.data);
    });
  }

  useEffect(() => {
    getDataa();
  }, []);
  useEffect(() => {
    getDataRes();
  }, []);

  

  return (
    <div className='mondal'>
      <button onClick={openModal}>Nuevo</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="">
      <h2 className='titulo-modal'>Ingrese el nuevo administrador del restaurante</h2>
        <Form className="create-form">
          <div className='conenido-modal'>
          <Form.Field className='input'>
          <label>Cargo</label>
          <select value={idPersonall} onChange={(e) => setIdPersonal(e.target.value)}>
              <option value="">Selecciona un cargo</option>
              {APIDataa.map((data) => (
                <option key={data._id} value={data._id}>
                  {data.nombre}
                </option>
              ))}
          </select>
        </Form.Field>
        <Form.Field className='input'>
          <label>Nombre restaurante</label>
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
            <input type='email' placeholder="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </Form.Field>
          <Form.Field className='input'>
            <label>Telefono</label>
            <input type='number' placeholder="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
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
