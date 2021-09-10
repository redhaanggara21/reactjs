import React, { useContext } from 'react';
import _ from 'lodash';
import { Table, Button } from 'react-bootstrap';

const BarangList = ({editEvent, removeEvent, dataBarang}) => {

    const handleRemoveBook = (id,index) => {
        dataBarang.splice(index, 1);
        removeEvent(id);
    };

    const handleEditBook = (id) => {
        editEvent(dataBarang.filter((barang) => barang.id === id));
    };
  
    return (
      <div>
          <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama Barang</th>
                        <th>Kategori</th>
                        <th>Harga</th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                { dataBarang.map((row,index) => (
                    <tr>
                        <td>{row.id}</td>
                        <td>{row.NAMA_BARANG}</td>
                        <td>{row.KATEGORI}</td>
                        <td>{row.HARGA}</td>
                        <td>
                            <Button variant="outline-dark" onClick={() => handleRemoveBook(row.id, index)}>Remove</Button>
                            &nbsp;
                            <Button variant="outline-dark" onClick={() => handleEditBook(row.id)}>Edit</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
      </div>
    );
};

export default BarangList;