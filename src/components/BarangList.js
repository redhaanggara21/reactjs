import React, { useContext, useEffect, useState, useCallback } from 'react';
import _ from 'lodash';
import { Table, Button, InputGroup, FormControl } from 'react-bootstrap';
import { retrieveBarangs, deleteBarang, findById } from "../actions/barang";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import {Pagination} from "./PaginationIndex";

const BarangList = () => {
    
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [tempsearch, setSearchTemp] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalData, setTotalData] = useState(0);
    const [pageLimit, setPageLimit] = useState(0);

    const { data, dataselect, datapagination } = useSelector(
        state =>
        state.barangReducer
    );

    console.log(datapagination);
    console.log(data);


    const onPageChanged = useCallback(
        (event, page) => {
          event.preventDefault();
          setCurrentPage(page);
          getData(page);
          //
        },
        [currentPage]
    );
    
    
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
        // console.log(param);
        const p = !param?.page ? 1 : param?.page;
        setSearch(tempsearch);
        dispatch(retrieveBarangs(p, search));
    }

    const findBarang = () => {
        getData(null);
    }

    useEffect(() => {
        getData();
        setTotalData(datapagination?.total ? datapagination.total : 0);
        setPageLimit(datapagination?.per_page ? datapagination.per_page : 0);
        setCurrentPage(datapagination?.current_page ? datapagination.current_page : 0);
      }, [search, totalData, pageLimit]);

    return (
      <div>
          <InputGroup className="mb-3">
            <FormControl
                    placeholder="find a thing"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    type="text" 
                    onChange={e => {
                        setSearchTemp(e.target.value); 
                    }}
                    value={ tempsearch }
                />
            <InputGroup.Append>
            <Button variant="outline-secondary" onClick={() => findBarang() }>Search</Button>
            </InputGroup.Append>
        </InputGroup>
          <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
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
            {/* <PaginationCommon
                totalRecords={totalData}
                pageLimit={pageLimit}
                pageNeighbours={1}
                onPageChanged={onPageChanged}
                currentPage={currentPage}
            /> */}
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