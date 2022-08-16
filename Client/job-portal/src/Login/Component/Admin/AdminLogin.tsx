import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
    MDBInput,
    MDBBtn,
    MDBCheckbox,
    MDBRow,
    MDBCol
  } from 'mdb-react-ui-kit';
import { UserView } from "../../Model/UserView";
import {useNavigate} from "react-router-dom";

import {Link} from "react-router-dom";
import LogRegService from "../../Services/LogRegService";
import { AuthUtil } from "../../../Util/AuthUtil";
import { useDispatch, useSelector } from "react-redux";
import { RootUserState, usersFeatureKey } from "../../../Redux/User/user.slice";
import { AppDispatch } from "../../../Redux/Store";
import * as userActions from "../../../Redux/User/user.actions";
import Spinner from "../../../Layouts/Spinner";
import { ToastUtil } from "../../../Util/ToastUtil";

interface IProps{}
interface IState{}

let AdminLogin:React.FC<IProps> =() =>{
    const userState = useSelector((state: RootUserState) => {
        return state[usersFeatureKey];
    });

    let {loading,errorMessage} = userState;

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState<UserView>({
        email: "",
        password: "",
        isAdmin:true
    });

    const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            dispatch(userActions.loginUserAction(user)).then((response:any)=>{
                if (response.error) {
                    ToastUtil.displayErrorToast("Unauthorized! User Name or Password Incorrect");
                } else {
                    ToastUtil.displaySuccessToast('Login is Success!');
                    navigate('/admin/dashboard');
                }
            })
        }
        
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };


    return(
        <>
            <div className="login d-flex align-items-center justify-content-center">
            <Container>
            {
                loading && <Spinner/>
            }
                <Row>
                    <Col></Col>
                    <Col>
                    <Row>
                        <Col>
                            {/* <h3 className="mt-3 text-danger">{errorMessage}</h3> */}
                            <h3 className="mt-3 text-success">
                                <i className="fa fa-sign-in align-items-center"></i> Admin Login</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        name={'email'}
                                        value={user.email}
                                        onChange={updateInput}
                                        type="email" placeholder="Email" required></Form.Control>
                                    <Form.Control.Feedback>
                                        Looks Good!
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a valid Email.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        name={'password'}
                                        value={user.password}
                                        onChange={updateInput}
                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{5,20}$"
                                        type="password" placeholder="Password" required></Form.Control>
                                    <Form.Control.Feedback>
                                        Looks Good!
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a Strong Password.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button variant="success" type="submit">
                                    Login
                                </Button>
                            </Form>
                            <small className="mt-2">Don't have an Account ?
                                <Link to={'/admin/register'} className="text-decoration-none text-primary fw-bold"> Register</Link>
                            </small>
                            <br />
                            <small className="mt-2">User ?
                                <Link to={'/'} className="text-decoration-none text-primary fw-bold"> Login</Link>
                            </small>
                        </Col>
                    </Row>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
            </div> 
        </>
    );

}

export default AdminLogin;