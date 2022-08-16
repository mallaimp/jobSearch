import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from "react-router-dom";
import Navabar from '../../Layouts/Navabar';
import { UserView } from '../../Login/Model/UserView';
import LogRegService from '../../Login/Services/LogRegService';
import { profileFeatureKey, RootProfileState } from '../../Redux/Profile/profile.slices';
import { AppDispatch } from '../../Redux/Store';
import { AuthUtil } from '../../Util/AuthUtil';
import { IProfile } from '../Models/IProfile';
import { ProfileService } from '../Services/ProfileService';

interface IProps {
}

let CreateProfile: React.FC<IProps> = ({}) => {
    const navigate = useNavigate();

    const dispatch: AppDispatch = useDispatch();

    // get profile state from redux
    const profileState = useSelector((state: RootProfileState) => {
        return state[profileFeatureKey];
    });
    
    let {loading, profiles, successMessage} = profileState;

    const [validated, setValidated] = useState(false);
    let [user, setUser] = useState<UserView>();
    useEffect(()=>{
        LogRegService.userAuthenticate().then((response:any)=>{
            let results:any = response.data.user;
            setUser(results);
        }).catch((error)=>{
            console.log(error)
        })
        if(user?.isAdmin){
           navigate("/") 
        }
    },[])

    const [designations] = useState<string[]>([
        "Software Engineer",
        "Sr. Software Engineer",
        "Tech Lead",
        "QA Lead",
        "Project Manager",
        "Director",
        "Other"
    ]);

    const [profile, setProfile] = useState<any>({
        location: "",
        skills: "",
        designation: "",
        user:"",
    });

    useEffect(()=>{
        if(user){
            ProfileService.getAllProfile().then((response)=>{
                let data = response.data.profile;
                if(data){
                    setProfile((prevState: any)=>{
                        return{
                            ...prevState,
                            location:data.location,
                            skills:data.skills[0],
                            designation:data.designation,
                            user:user?._id
                        }
                    })
                }
            }).catch((error)=>{

            })
        }
    },[user])

    const updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setProfile((prevState: any) => {
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
            ProfileService.createProfile(profile).then((response)=>{
                navigate("/profile")
            }).catch((error)=>{
                console.log(error);
            });
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
                <Row>
                    <Col>
                        <h3 className="text-success">
                            <i className="fa fa-user-circle"></i> Create a Profile
                        </h3>
                        <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus
                            quisquam, suscipit! Ab aut dicta doloribus enim iure laboriosam, maxime nam nihil, odio
                            officia reiciendis repudiandae sapiente similique sunt tempora voluptates.</p>
                    </Col>
                </Row>

                <Row>
                    <Col xs={5}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <p>Profile Details</p>
                            
                           

                            <Form.Group className="mb-2">
                                <Form.Control
                                    name={'location'}
                                    value={profile.location}
                                    onChange={updateInput}
                                    type="text" placeholder="Location" required></Form.Control>
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Location.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Control
                                    name={'skills'}
                                    value={profile.skills}
                                    onChange={updateInput}
                                    type="text" placeholder="Skills" required></Form.Control>
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Skills.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Select
                                    name={'designation'}
                                    value={profile.designation}
                                    onChange={updateInput} required>
                                    <option
                                        value=""
                                    >Select Designation
                                    </option>
                                    {
                                        designations.map(designation => {
                                            return (
                                                <option key={designation}
                                                        value={designation}
                                                >{designation}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                                <Form.Control.Feedback>
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please choose a valid Designation.
                                </Form.Control.Feedback>
                            </Form.Group>

                            
                            <Button variant="success" type="submit" className="me-1">
                                Create
                            </Button>
                            <Link to={'/profiles/dashboard'}>
                                <Button variant="dark" type="button">
                                    Cancel
                                </Button>
                            </Link>
                        </Form>
                    </Col>
                </Row>
            </Container>

            <div style={{marginBottom: '100px'}}></div>
        </>
    )
};
export default CreateProfile;