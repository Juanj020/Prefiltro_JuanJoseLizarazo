import React, { useEffect, useState } from 'react';
import './Personal.css';
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import UpdateModal from './UpdatePersonal'
import imagenEditar from './../../img/editar.png'
import imagenBorrar from './../../img/eliminarxd-removebg-preview.png'

export default function Read() {
  const [APIData, setAPIData] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:4002/api/personal`);
        setAPIData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const onDelete = (_id) => {
    axios
      .delete(`http://localhost:4002/api/personal/${_id}`)
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getData = () => {
    axios.get(`http://localhost:4002/api/personal`).then((getData) => {
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

  const updateData = (_id, nombre, apellido, sueldo, turno, idCargo, fechaNacimiento) => {
    setAPIData((prevData) =>
      prevData.map((data) =>
        data._id === _id ? { ...data, nombre, apellido, sueldo, turno, idCargo, fechaNacimiento } : data
      )
    );
  };

  return (
    <div className='contenido-medio'>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Apellido</Table.HeaderCell>
            <Table.HeaderCell>Sueldo</Table.HeaderCell>
            <Table.HeaderCell>Turno</Table.HeaderCell>
            <Table.HeaderCell>Cargo</Table.HeaderCell>
            <Table.HeaderCell>Fecha Nac</Table.HeaderCell>
            <Table.HeaderCell>Actualizar</Table.HeaderCell>
            <Table.HeaderCell>Eliminar</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {APIData.map((data) => (
            <Table.Row key={data._id}>
              <Table.Cell>{data.nombre}</Table.Cell>
              <Table.Cell>{data.apellido}</Table.Cell>
              <Table.Cell>{data.sueldo}</Table.Cell>
              <Table.Cell>{data.turno}</Table.Cell>
              <Table.Cell>{data.idCargo}</Table.Cell>
              <Table.Cell>{data.fechaNacimiento}</Table.Cell>
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
