import React, { useContext, useState, useEffect } from 'react';
import { Table, Button, Row, c } from 'react-bootstrap';

const CatalogPenjualan = ({data}) => {
    return(
        <div>
            <h3 style={{textAlign: "center"}}>Daftar Belanja</h3>
          <Table>
                <thead>
                    <tr>
                        <th>Kode Barang</th>
                        <th>Nama Barang</th>
                        <th>Kategori</th>
                        <th>Harga</th>
                    </tr>
                </thead>
                <tbody>
                { data.length > 0 
                    ? data.map((row,index) => (
                        <tr>
                            <td>{row.id}</td>
                            <td>{row.NAMA_BARANG}</td>
                            <td>{row.KATEGORI}</td>
                            <td>{row.HARGA}</td>
                        </tr>
                    )) :
                    <tr>
                        <td>#Empty</td>
                        <td>#Empty</td>
                        <td>#Empty</td>
                        <td>#Empty</td>
                    </tr>
                }
                </tbody>
            </Table>
      </div>
    )
}

export default CatalogPenjualan;