import React from 'react';
import {Nav, Form, FormControl, Button, Navbar, NavDropdown} from 'react-bootstrap';
import logo from '../../assets/instaLogo.png';
import {Home, Send, Compass, Heart} from 'react-feather';

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
                    <Nav.Link href="#link">
                        <Home strokeWidth={1.5}/>
                    </Nav.Link>
                    <Nav.Link href="#link">
                        <Send strokeWidth={1.5}/>
                    </Nav.Link>
                    <Nav.Link href="#link">
                        <Compass strokeWidth={1.5}/>
                    </Nav.Link>
                    <Nav.Link href="#link">
                        <Heart strokeWidth={1.5}/>
                    </Nav.Link>
                    <Nav.Link href="#link">
                        <img src="https://hbimg.huabanimg.com/fa75af2c4dece37248d6d8027d9ce37d48bc273c17e48-uEXjis_fw658/format/webp" alt="profile" width="26px" height="25px" style={{borderRadius: '50%'}}/>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </div>
        </Navbar>
    )

}

export default NavbarComponent;