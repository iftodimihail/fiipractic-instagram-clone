import React from 'react';
import {Nav, Form, FormControl, Button, Navbar, NavDropdown} from 'react-bootstrap';
import logo from '../../assets/instaLogo.png';

const NavbarComponent = () => {

    return (
        <Navbar bg="light" expand="lg">
            <div className="container">
            <Navbar.Brand href="#home">
                <img src={logo} alt="instagram-logo" width="90"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto ml-auto">
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    </Form>
                </Nav>
                <Nav className="ml-0">
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            </div>
        </Navbar>
    )

}

export default NavbarComponent;