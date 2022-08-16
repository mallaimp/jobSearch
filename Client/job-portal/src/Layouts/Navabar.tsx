import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom";

interface IProps{}
interface IState{}

let Navabar:React.FC<IProps> =() =>{
   
    return(
        <>
            
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                <Link to={'/dashboard'} className="text-decoration-none text-light">Job Hire</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Link to={'/dashboard'} className="text-decoration-none text-light">Home</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to={'/jobs'} className="text-decoration-none text-light">Jobs</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to={'/myjobs'} className="text-decoration-none text-light">My Jobs</Link>
                        </Nav.Link>
                        {/* <Nav.Link>
                            <Link to={'/test'} className="text-decoration-none text-light">Testing</Link>
                        </Nav.Link> */}
                        {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#">Something</NavDropdown.Item>
                        <NavDropdown.Item href="#">
                            Separated link
                        </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                <Nav>
                    <Nav.Link>
                        <Link to={'/profile'} className="text-decoration-none text-light">Profile</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to={'/logout'} className="text-decoration-none text-light">Log Out</Link>
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
           
        </>
    );

}

export default Navabar;