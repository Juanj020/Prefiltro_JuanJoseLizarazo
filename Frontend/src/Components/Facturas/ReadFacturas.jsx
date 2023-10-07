import React, { useEffect, useState } from 'react';
import './Facturas.css';
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import UpdateModal from './UpdateFacturas'
import imagenEditar from './../../img/editar.png'
import imagenBorrar from './../../img/eliminarxd-removebg-preview.png'

export default function Read() {
  const [APIData, setAPIData] = useState([]);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:4002/api/factura`);
        setAPIData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const onDelete = (_id) => {
    axios
      .delete(`http://localhost:4002/api/factura/${_id}`)
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getData = () => {
    axios.get(`http://localhost:4002/api/factura`).then((getData) => {
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

  const updateData = (_id, idCliente, idCaja, idPersonal, precioTotal, fechaCompra, formaDePago, idRestaurante) => {
    setAPIData((prevData) =>
      prevData.map((data) =>
        data._id === _id ? { ...data, idCaja, idCliente, idPersonal, precioTotal, fechaCompra, formaDePago, idRestaurante } : data
      )
    );
  };

  return (
    <div className='contenido-medio'>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nombre Cliente</Table.HeaderCell>
            <Table.HeaderCell>Número Caja</Table.HeaderCell>
            <Table.HeaderCell>Nombre Persona</Table.HeaderCell>
            <Table.HeaderCell>Precio Total</Table.HeaderCell>
            <Table.HeaderCell>Fecha Compra</Table.HeaderCell>
            <Table.HeaderCell>Forma Pago</Table.HeaderCell>
            <Table.HeaderCell>Nombre Restaurante</Table.HeaderCell>
            <Table.HeaderCell>Actualizar</Table.HeaderCell>
            <Table.HeaderCell>Eliminar</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {APIData.map((data) => (
            <Table.Row key={data._id}>
              <Table.Cell>{data.idCliente}</Table.Cell>
              <Table.Cell>{data.idCaja}</Table.Cell>
              <Table.Cell>{data.idPersonal}</Table.Cell>
              <Table.Cell>{data.precioTotal}</Table.Cell>
              <Table.Cell>{data.fechaCompra}</Table.Cell>
              <Table.Cell>{data.formaDePago}</Table.Cell>
              <Table.Cell>{data.idRestaurante}</Table.Cell>
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
