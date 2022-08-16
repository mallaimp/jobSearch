import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate, useParams} from "react-router-dom";
import Navabar from '../../Layouts/AdminNavbar';
import { UserView } from '../../Login/Model/UserView';
import { jobFeatureKey, RooAdminJobState } from '../../Redux/AdminJob/job.slice';
import { AppDispatch } from '../../Redux/Store';
import * as jobActions from "../../Redux/AdminJob/job.actions";
import { ToastUtil } from '../../Util/ToastUtil';

interface IProps {
}

let UpdateJob: React.FC<IProps> = ({}) => {

    let {jobId} = useParams();
    const navigate = useNavigate();
    const jobState = useSelector((state: RooAdminJobState) => {
        return state[jobFeatureKey];
    });
    const dispatch: AppDispatch = useDispatch();
    let [user, setUser] = useState<UserView>();
    const [validated, setValidated] = useState(false);
    let {loading,errorMessage} = jobState;
    const [job, setJobs] = useState<any>(jobState.job);
    
    const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJobs((prevState:any) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            }
        })
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            dispatch(jobActions.updateJobAction(job)).then((response: any) => {
                
                if (response.error) {
                    ToastUtil.displayErrorToast(response.error.message);
                } else {
                    ToastUtil.displaySuccessToast('Education is Added!');
                    navigate('/admin/jobs');
                }
            })
        }
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    useEffect(()=>{
        dispatch(jobActions.getAJobAction(jobId));
    },[])
    return (
        <>
            <Navabar/>
            <pre>{JSON.stringify(job)}</pre>
            <Container className="mt-3">
                <Row>
                    <Col>
                        <h3 className="text-success">
                            <i className="fa fa-black-tie"></i> Update Job
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
                                    value={job.title}
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
                                    value={job.company}
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
                                    value={job.location}
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
                                <InputGroup.Text id="basic-addon1" className="bg-light-green text-dark">Skills</InputGroup.Text>
                                <Form.Control
                                    required
                                    value={job.skills}
                                    name={'skills'}
                                    onChange={updateInput}
                                    type="text"
                                    placeholder="Skills"
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Skils.
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text id="basic-addon1" className="bg-light-green text-dark">Experiance</InputGroup.Text>
                                <Form.Control
                                    required
                                    value={job.experiance}
                                    name={'experiance'}
                                    onChange={updateInput}
                                    type="text"
                                    placeholder="Experiance"
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Skils.
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text id="basic-addon1"
                                                 className="bg-light-green text-dark">Description</InputGroup.Text>
                                <Form.Control
                                    required
                                    value={job.description}
                                    name={'description'}
                                    onChange={updateInput}
                                    as="textarea" rows={3}
                                    placeholder="Description"
                                />
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Description.
                                </Form.Control.Feedback>
                            </InputGroup>
                            <Button variant="success" type="submit" className="me-1">
                                Update Job
                            </Button>
                            <Link to={'/admin/jobs'}>
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
export default UpdateJob;