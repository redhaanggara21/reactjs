import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { Table, Button } from 'react-bootstrap';
import { retrieveBarangs, deleteBarang, findById } from "../actions/barang";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { Pagination } from 'react-laravel-paginex';

const BarangList = () => {
    
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);

    const { data, dataselect, datapagination } = useSelector(
        state =>
        state.barangReducer
    );
      
    // console.log(datapagination);

    const handleRemoveBook = (id,index) => {
        dispatch(deleteBarang(id)).then(() => {
            if(data.length < 5){
                getData();
            }
        }).catch(error => {
            console.log(error);
        })
    };

    const handleEditBook = (id) => {
        dispatch(findById(id));
    };
    
    const getData = (param) => {
        const p = !param?.page ? 1 : param?.page;
        dispatch(retrieveBarangs(p));
    }

    useEffect(() => {
        getData();
      }, []);

    return (
      <div>
          <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama Barang</th>
                        <th>Kategori</th>
                        <th>Harga</th>
                        <th>KETERANGAN</th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                { data && data.map((row,index) => (
                    <tr>
                        <td>{row.id}</td>
                        <td>{row.NAMA_BARANG}</td>
                        <td>{row.KATEGORI}</td>
                        <td>{row.HARGA}</td>
                        <td>{row.KETERANGAN}</td>
                        <td>
                            <Button variant="outline-dark" onClick={() => handleRemoveBook(row.id, index)}>Remove</Button>
                            &nbsp;
                            <Button variant="outline-dark" onClick={() => handleEditBook(row.id)}>Edit</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Pagination changePage={getData} data={datapagination}/>
      </div>
    );
};

// export default BarangList;

const mapStateToProps = (state) => {
    return {
        data: state.data,
        dataselect: state.dataselect
    };
  };
  
  export default connect(mapStateToProps, {
    retrieveBarangs,
    deleteBarang,
    findById
  })(BarangList);