import _ from 'lodash';
import { Table, Button } from 'react-bootstrap';

const PenjualanList = ({removing, updating, reading, dataPenjualan}) => {

    const handleRemoving = (e) => {
        removing(e);
    }

    const handleUpdating = (e) => {
        updating(e);
    }

    const handleRead = (e) => {
        reading(e);
    }

    return(
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Pelanggan</th>
                        <th>Total</th>
                        <th>Date Created</th>
                        <th>Date Updating</th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                { dataPenjualan.map((row,index) => (
                    <tr>
                        <td>{row.id}</td>
                        <td>{row.pelanggan.name}</td>
                        <td>{row.TOTAL}</td>
                        <td>{row.created_at}</td>
                        <td>{row.updated_at}</td>
                        <td>
                            <Button 
                                onClick={ () => handleRemoving(row.id) }
                                variant="outline-dark" 
                                >Remove</Button>
                            &nbsp;
                            <Button
                                onClick={ () => handleUpdating(row) } 
                                variant="outline-dark"
                            >Edit</Button>
                            &nbsp;
                            <Button 
                                onClick={ () => handleRead(row.barang_penjualan) }
                                variant="outline-dark"
                            >View Transaksi</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}

export default PenjualanList;