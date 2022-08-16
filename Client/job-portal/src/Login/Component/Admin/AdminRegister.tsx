import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import { UserView } from '../../Model/UserView';
import LogRegService from '../../Services/LogRegService';
import { AppDispatch } from '../../../Redux/Store';
import { RootUserState, usersFeatureKey } from '../../../Redux/User/user.slice';
import * as userActions from "../../../Redux/User/user.actions";
import { ToastUtil } from '../../../Util/ToastUtil';
import Spinner from '../../../Layouts/Spinner';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

interface IProps {
}

let AdminRegister: React.FC<IProps> = ({}) => {

    const navigate = useNavigate();
    const userState = useSelector((state: RootUserState) => {
        return state[usersFeatureKey];
    });

    let {loading} = userState;
    const dispatch: AppDispatch = useDispatch();

    const [validated, setValidated] = useState(false);

    const [user, setUser] = useState<UserView>({
        name: "",
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
            dispatch(userActions.registrationAction(user)).then((response: any) => {
                if (response.error) {
                    ToastUtil.displayErrorToast(response.error.message);
                } else {
                    ToastUtil.displaySuccessToast('Registration is Success!');
                    navigate('/admin/login');
                }
            })
        }
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <div className="login d-flex align-items-center justify-content-center">
            <Container>
                {
                    loading && <Spinner/>
                }
                <Row>
                    <Col xs={4}></Col>
                    <Col>
                        <Row>
                            <Col>
                                <h3 className="mt-3 text-success">
                                <i className="fa fa-user-secret"></i> Admin Registration</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            name={'name'}
                                            value={user.name}
                                            onChange={updateInput}
                                            pattern="[a-zA-Z0-9]{4,10}"
                                            type="text" placeholder="Username" required></Form.Control>
                                        <Form.Control.Feedback>
                                            Looks Good!
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            Please choose a valid Username.
                                        </Form.Control.Feedback>
                                    </Form.Group>
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
                                        Register
                                    </Button>
                                </Form>
                                <small className="mt-2">Already have an Account ?
                                    <Link to={'/admin/login'}
                                        className="text-decoration-none text-primary fw-bold"> Login</Link>
                                </small>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default AdminRegister;