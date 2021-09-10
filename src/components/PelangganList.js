import { Table, Button } from 'react-bootstrap';

const PelangganList = ({updating, dataPelanggan}) => {

    const handleUpdating = (e) => {
        updating(e);
    }

    return(
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Status</th>
                        {/* <th>Date Creating</th>
                        <th>Date Updating</th> */}
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { dataPelanggan.map((row,index) => (
                        <tr>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td>{row.GENDER}</td>
                            <td>{row.status}</td>
                            {/* <td>{row.created_at}</td>
                            <td>{row.updated_at}</td> */}
                            <td>
                                <Button
                                    onClick={ () => handleUpdating(row) } 
                                    variant="outline-dark"
                                >Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default PelangganList;