import React from "react";
import { NavDropdown, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

const Header = ({logoutEvent}) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <div className="container">
            <Navbar.Brand href="#home">RedBay</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="barang">Barang</Nav.Link>
                <Nav.Link href="preferences">Penjualan</Nav.Link>
                <Nav.Link href="user">Pelanggan</Nav.Link>
                <NavDropdown title="User" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => logoutEvent()}>Logout</NavDropdown.Item>
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </div>
        </Navbar>
    );
};

export default Header;
