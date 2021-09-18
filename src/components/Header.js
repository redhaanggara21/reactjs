import React from "react";
import { NavDropdown, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import AppContext from "../contexts/appContext"; 

const Header = ({logoutEvent}) => {
    return (
        <AppContext.Consumer>
            {context => (
                // <label>{context}</label>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <div className="container">
                        <Navbar.Brand href="#home">
                            
                            RedBay
                        
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="barang" className={context.activeHeader == "barang" ? "active" : ""}>Barang</Nav.Link>
                                <Nav.Link href="preferences" className={context.activeHeader == "penjualan" ? "active" : ""}>Penjualan</Nav.Link>
                                <Nav.Link href="user" className={context.activeHeader == "pelanggan" ? "active" : ""}>Pelanggan</Nav.Link>
                                <NavDropdown title="User" id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={() => logoutEvent()}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Navbar>
             )}
        </AppContext.Consumer>
    );
};

export default Header;
