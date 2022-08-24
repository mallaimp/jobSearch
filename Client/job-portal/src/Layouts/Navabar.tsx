import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import "../assets/newCss/css/style.css";
import { profileLogoutAction } from "../Redux/Profile/profile.slices";
import { AppDispatch } from "../Redux/Store";
import {logoutAction, RootUserState, usersFeatureKey} from "../Redux/User/user.slice";
import { ToastUtil } from "../Util/ToastUtil";
interface IProps{}
interface IState{}

let Navabar:React.FC<IProps> =() =>{
    const dispatch: AppDispatch = useDispatch();
    const clickLogOut = () => {
         dispatch(logoutAction({}));
         dispatch(profileLogoutAction({}));
         ToastUtil.displaySuccessToast('Logout is Success!');
     };
    return(
        <>
            
            {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
                        </Nav.Link> */}
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
                    {/* </Nav>
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
            </Navbar> */}
            <section className="ftco-section">
                <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light navbarOverride" id="ftco-navbar">
                <div className="container">
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="fa fa-bars"></span> Menu
                </button>
                        <form className="searchform order-lg-last">
                <div className="form-group d-flex">
                
                            <Link to={'/dashboard'} onClick={clickLogOut} className="nav-link text-decoration-none text-light">Logout</Link>
                            
                </div>
                </form>
                <div className="collapse navbar-collapse" id="ftco-nav">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                            <Link to={'/dashboard'} className="nav-link text-decoration-none text-light">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/jobs'} className="nav-link text-decoration-none text-light">Jobs</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/myjobs'} className="nav-link text-decoration-none text-light">My Jobs</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/profile'} className="nav-link text-decoration-none text-light">Profile</Link>
                        </li>
                        {/* <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Page</a>
                    <div className="dropdown-menu" aria-labelledby="dropdown04">
                        <a className="dropdown-item" href="#">Page 1</a>
                        <a className="dropdown-item" href="#">Page 2</a>
                        <a className="dropdown-item" href="#">Page 3</a>
                        <a className="dropdown-item" href="#">Page 4</a>
                    </div>
                    </li>
                        <li className="nav-item"><a href="#" className="nav-link">Catalog</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Blog</a></li>
                    <li className="nav-item"><a href="#" className="nav-link">Contact</a></li> */}
                    </ul>
                </div>
                </div>
            </nav>
        </section>
        </>
    );

}

export default Navabar;