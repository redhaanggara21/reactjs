import React, {useState} from 'react'
import { Table } from 'react-bootstrap';

const BarangAlreadyBuy = React.memo(({ datas }) => {
    const [dataBarang, setDataBarang] = useState(datas.barang_penjualan);
    const [dataPenjualan, setDataPenjualan] = useState(datas.item_penjualan);

    // console.log("Barang Already Buy");
    // console.log(dataBarang);
    // console.log(dataPenjualan);

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama</th>
                        <th>KODE BARANG</th>
                        <th>HARGA</th>
                        <th>QTY</th>
                        <th>SUB TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    { dataBarang.map((row, index) => (
                        <tr>
                            <td>{index+1}</td>
                            <td>{row.NAMA_BARANG}</td>
                            <td>{row.id}</td>
                            <td>{row.HARGA}</td>
                            <td>{dataPenjualan[index].QTY}</td>
                            <td>{row.HARGA * dataPenjualan[index].QTY}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
  });

export default BarangAlreadyBuy;
