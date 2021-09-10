import React, { useContext, useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

const FormPenjualan = ({user, total}) => {

    return(
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Pelanggan</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.name}</td>
                        <td>Rp. {total.toLocaleString()}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default FormPenjualan;