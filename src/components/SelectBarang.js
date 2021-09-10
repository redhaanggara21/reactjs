import React, { useState, useEffect } from "react"
import Select from "react-select";
import { Row, Col, Form, Container, Button } from "react-bootstrap";

const SelectBarang = ({idx, removing}) => {

    const [indexForm,setIndexForm] = useState(idx);
    const [formValues, setFormValues] = useState([{ qty: 0, barang: ""}]);

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ];

    const handleremove = (e) =>{
        removing(indexForm);
    }

    const [choose,selectedOption] = useState();

    useEffect(() => { 

        return () => {

        };
    },[]);

    return(
        <Container>
            <Form>
                <Form.Row className="align-items-center">
                    <Col xs={3} className="my-1">
                            <Form.Label htmlFor="inlineFormInputName1">QTY</Form.Label>
                            <Form.Control
                                className="mb-2 mr-sm-2"
                                id="inlineFormInputName1"
                                placeholder="Quantity"
                            />
                    </Col>
                    <Col xs={6} className="my-1 mr-sm-2">
                            <Form.Label htmlFor="inlineFormInputName2">State</Form.Label>
                            <Form.Control
                                as="select"
                                className="my-1 mr-sm-2"
                                id="inlineFormInputName2">
                                    <option value="0">Choose...</option>
                                    <option value="1">One</option>
                            </Form.Control>
                    </Col>
                    <Col xs={3} className="my-1 mr-sm-2">
                            <Button
                                className="float-end"
                                variant="warning"
                                onClick={e => handleremove() }>
                                -
                            </Button>
                    </Col>
                </Form.Row>
            </Form>
        </Container>
        )
}

export default SelectBarang;
