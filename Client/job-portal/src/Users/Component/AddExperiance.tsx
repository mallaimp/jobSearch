import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {Link, useNavigate} from "react-router-dom";
import Navabar from '../../Layouts/Navabar';
import Spinner from '../../Layouts/Spinner';
import { UserView } from '../../Login/Model/UserView';
import { RootProfileState, profileFeatureKey } from '../../Redux/Profile/profile.slices';
import { AppDispatch } from '../../Redux/Store';
import { IExperience } from '../Models/IProfile';
import * as profileActions from "../../Redux/Profile/profile.actions";
import { ToastUtil } from '../../Util/ToastUtil';

interface IProps {}

let AddExperience: React.FC<IProps> = ({}) => {

     // get profile Data from redux store
    const profileState = useSelector((state: RootProfileState) => {
        return state[profileFeatureKey];
    });

    const {loading} = profileState;

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();


    let [user, setUser] = useState<UserView>();

    const [validated, setValidated] = useState(false);
    let [currentExp, setCurrentExp] = useState<boolean>(false);

    const [experience, setExperience] = useState<IExperience>({
        title: "",
        company: "",
        location: "",
        description: "",
        from: "",
        to: "",
        current: false
    });

    const updateCurrent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentExp(event.target.checked);
        setExperience((prevState) => {
            return {
                ...prevState,
                current: event.target.checked
            }
        })
    };

    const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExperience((prevState) => {
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
            dispatch(profileActions.addExperienceToProfileAction(experience)).then((response: any) => {
                if (response.error) {
                    ToastUtil.displayErrorToast(response.error.message);
                } else {
                    ToastUtil.displaySuccessToast('Experience is Added!');
                    navigate('/profile');
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
        <>
            <Navabar/>
           
            <Container className="mt-3">
            {
                loading && <Spinner/>
            }
                <Row>
                    <Col>
                        <h3 className="text-success">
                            <i className="fa fa-black-tie"></i> Add Experience
                        </h3>
                        <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
                            ad adipisci, assumenda atque deleniti deserunt dolorem doloribus maxime neque, odit placeat
                            quas quibusdam quidem quis quisquam quos reprehenderit similique ut!</p>
                    </Col>
                </Row>

                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <InputGroup className="mb-2">
                                <InputGroup.Text id="basic-addon1"
                                                 className="bg-light-green text-dark">Title</InputGroup.Text>
                                <Form.Control
                                    value={experience.title}
                                    name={'title'}
                                    onChange={updateInput}
                                    type="text"
                                    placeholder="Title"
                                    required
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Title.
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text id="basic-addon1"
                                                 className="bg-light-green text-dark">Company</InputGroup.Text>
                                <Form.Control
                                    required
                                    value={experience.company}
                                    name={'company'}
                                    onChange={updateInput}
                                    type="text"
                                    placeholder="Company"
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Company.
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text id="basic-addon1"
                                                 className="bg-light-green text-dark">Location</InputGroup.Text>
                                <Form.Control
                                    required
                                    value={experience.location}
                                    name={'location'}
                                    onChange={updateInput}
                                    type="text"
                                    placeholder="Location"
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Location.
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text id="basic-addon1" className="bg-light-green text-dark">From
                                    Date</InputGroup.Text>
                                <Form.Control
                                    required
                                    value={experience.from}
                                    name={'from'}
                                    onChange={updateInput}
                                    type="date"
                                    placeholder="From Date"
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid From Date.
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text id="basic-addon1" className="bg-light-green text-dark">
                                    <Form.Check
                                        value={experience.to}
                                        name={'to'}
                                        onChange={updateCurrent}
                                        type={"checkbox"}/>
                                </InputGroup.Text>
                                <Form.Control
                                    disabled={true}
                                    type="text"
                                    placeholder="Current"
                                />
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text id="basic-addon1" className="bg-light-green text-dark">To
                                    Date</InputGroup.Text>
                                <Form.Control
                                    required
                                    value={experience.to}
                                    name={'to'}
                                    onChange={updateInput}
                                    disabled={currentExp}
                                    type="date"
                                    placeholder="To Date"
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid To Date.
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text id="basic-addon1"
                                                 className="bg-light-green text-dark">Description</InputGroup.Text>
                                <Form.Control
                                    // required
                                    value={experience.description}
                                    name={'description'}
                                    onChange={updateInput}
                                    as="textarea" rows={3}
                                    placeholder="Description"
                                />
                                {/* <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Description.
                                </Form.Control.Feedback> */}
                            </InputGroup>
                            <Button variant="success" type="submit" className="me-1">
                                Add Experience
                            </Button>
                            <Link to={'/profile/'}>
                                <Button variant="dark" type="button">
                                    Cancel
                                </Button>
                            </Link>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
};
export default AddExperience;