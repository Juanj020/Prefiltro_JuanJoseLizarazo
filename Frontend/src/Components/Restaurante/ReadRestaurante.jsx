import React, { useEffect, useState } from 'react';
import './Clientes.css';
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import UpdateModal from './UpdateCliente';
import imagenEditar from './../../img/editar.png'
import imagenBorrar from './../../img/eliminarxd-removebg-preview.png'

export default function Read() {
  const [APIData, setAPIData] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:4002/api/restaurante`);
        setAPIData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const onDelete = (_id) => {
    axios
      .delete(`http://localhost:4002/api/restaurante/${_id}`)
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getData = () => {
    axios.get(`http://localhost:4002/api/restaurante`).then((getData) => {
      setAPIData(getData.data);
    });
  };

  const openUpdateModal = (data) => {
    setDataToUpdate(data);
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
    setDataToUpdate(null);
  };

  const updateData = (_id, nombre, direccion, categoria, telefono) => {
    setAPIData((prevData) =>
      prevData.map((data) =>
        data._id === _id ? { ...data, nombre, direccion, categoria, telefono } : data
      )
    );
  };

  return (
    <div className='contenido-medio'>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Categoria</Table.HeaderCell>
            <Table.HeaderCell>Dirección</Table.HeaderCell>
            <Table.HeaderCell>Telefono</Table.HeaderCell>
            <Table.HeaderCell>Actualizar</Table.HeaderCell>
            <Table.HeaderCell>Eliminar</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {APIData.map((data) => (
            <Table.Row key={data._id}>
              <Table.Cell>{data.nombre}</Table.Cell>
              <Table.Cell>{data.categoria}</Table.Cell>
              <Table.Cell>{data.direccion}</Table.Cell>
              <Table.Cell>{data.telefono}</Table.Cell>
              <Table.Cell>
              <img src={imagenEditar} width={"30px"} alt='dasd' onClick={() => openUpdateModal(data)}></img>
              </Table.Cell>
              <Table.Cell>
                <img src={imagenBorrar} width={"30px"} alt='dasd' onClick={() => onDelete(data._id)}></img>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <UpdateModal
        isOpen={updateModalOpen}
        closeModal={closeUpdateModal}
        dataToUpdate={dataToUpdate}
        updateData={updateData}
      />
    </div>
  );
}
