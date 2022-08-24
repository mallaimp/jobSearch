import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import { AppDispatch } from "../Redux/Store";
import {logoutAction, RootUserState, usersFeatureKey} from "../Redux/User/user.slice";
import { ToastUtil } from "../Util/ToastUtil";

import "../assets/fonts/icomoon/style.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/style.css";
interface IProps{}
interface IState{}

let AdminNavbar:React.FC<IProps> =() =>{
   let mystyle:any ={
    // position: "relative",
    // top: "3px",
    'backgroud-color': "#34567",
   };
   const dispatch: AppDispatch = useDispatch();
   const clickLogOut = () => {
        dispatch(logoutAction({}));
        ToastUtil.displaySuccessToast('Logout is Success!');
    };

    return(
        <>
            
            {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                <Link to={'/admin/dashboard'} className="text-decoration-none text-light">Job Hire</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Link to={'/admin/dashboard'} className="text-decoration-none text-light">Home</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to={'/admin/jobs'} className="text-decoration-none text-light">Jobs</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to={'/admin/users'} className="text-decoration-none text-light">Users</Link>
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
                <Nav> */}
                    {/* <Nav.Link>
                        <Link to={'/profile'} className="text-decoration-none text-light">Profile</Link>
                    </Nav.Link> */}
                    {/* <Nav.Link>
                        <Link to={'/logout'} className="text-decoration-none text-light">Log Out</Link>
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar> */}
            {/* <div className="site-mobile-menu">
                <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close mt-3">
                    <span className="icon-close2 js-menu-toggle"></span>
                    </div>
                </div>
                <div className="site-mobile-menu-body"></div>
            </div> */}
                
            <header className="site-navbar" role="navabar">
                <div className="row align-items-center">
                    
                    <div className="col-11 col-xl-2">
                        <h1 className="mb-0 site-logo"><a href="index.html" className="text-white mb-0"></a></h1>
                    </div>
                    <div className="col-12 col-md-10 d-none d-xl-block">
                        <nav className="site-navigation position-relative text-center" role="navigation">

                        <ul className="site-menu js-clone-nav mr-auto d-none d-lg-block">
                            <li className="active"><Link to={'/admin/dashboard'} className="text-decoration-none text-light"><span>Home</span></Link></li>
                            {/* <li className="has-children">
                            <a href="about.html"><span>Dropdown</span></a>
                            <ul className="dropdown arrow-top">
                                <li><a href="#">Menu One</a></li>
                                <li><a href="#">Menu Two</a></li>
                                <li><a href="#">Menu Three</a></li>
                                <li className="has-children">
                                <a href="#">Dropdown</a>
                                <ul className="dropdown">
                                    <li><a href="#">Menu One</a></li>
                                    <li><a href="#">Menu Two</a></li>
                                    <li><a href="#">Menu Three</a></li>
                                    <li><a href="#">Menu Four</a></li>
                                </ul>
                                </li>
                            </ul>
                            </li> */}
                            

                            &nbsp;&nbsp;
                            <li className="active"><Link to={'/admin/jobs'} className="text-decoration-none text-light"><span>Jobs</span></Link></li>
                            &nbsp;&nbsp;
                            <li className="active"><Link to={'/admin/users'} className="text-decoration-none text-light"><span>Users</span></Link></li>
                            <li><a ><span></span></a></li>
                            <li><a ><span></span></a></li>
                            <li><a ><span></span></a></li>
                            <li><a ><span></span></a></li>
                            <li><a ><span></span></a></li>
                            <li><a ><span></span></a></li>
                            <li><a ><span></span></a></li>
                            <li><a ><span></span></a></li>
                            <li><a ><span></span></a></li>
                            <li className="active" style={mystyle}>
                                {/* <Link to={'/logout'} className="text-decoration-none text-light"><span>Log Out</span>
                                
                                </Link> */}
                                <Link to={'/admin/dashboard'}
                                              className="text-decoration-none text-light"
                                              onClick={clickLogOut}>
                                           <span>LogOut</span></Link>
                                </li>
                            
                        </ul>
                        </nav>
                    </div>


                    {/* <div className="d-inline-block d-xl-none ml-md-0" style={mystyle}><a href="#" className="site-menu-toggle js-menu-toggle text-white"><span className="icon-menu h3"></span></a></div> */}

                </div>
            </header>
            
        </>
    );

}

export default AdminNavbar;