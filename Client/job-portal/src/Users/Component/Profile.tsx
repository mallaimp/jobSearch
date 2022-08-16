import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Navabar from "../../Layouts/Navabar";
import { UserView } from "../../Login/Model/UserView";
import { AuthUtil } from "../../Util/AuthUtil";
import { IEducation, IExperience, IProfile } from "../Models/IProfile";
import { ProfileService } from "../Services/ProfileService";
import {Link, useNavigate} from "react-router-dom";
import LogRegService from "../../Login/Services/LogRegService";
import { AppDispatch } from "../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { profileFeatureKey, RootProfileState } from "../../Redux/Profile/profile.slices";
import { RootUserState, usersFeatureKey } from "../../Redux/User/user.slice";
import * as profileActions from "../../Redux/Profile/profile.actions";
import * as userActions from "../../Redux/User/user.actions";
import { ToastUtil } from "../../Util/ToastUtil";

interface IProps{}
interface IState{}

let Profile:React.FC<IProps> =() =>{
    const navigate = useNavigate();

    const dispatch: AppDispatch = useDispatch();

    // get profile state from redux
    const profileState = useSelector((state: RootProfileState) => {
        return state[profileFeatureKey];
    });

    // get user info from redux store
    const userState = useSelector((state: RootUserState) => {
        return state[usersFeatureKey];
    });

    let {loading, profiles, profile, successMessage} = profileState;
    let {user} = userState;

    let [experience,setExperiance] = useState<IExperience[]>([] as IExperience[]);
    let [education,setEducation] = useState<IEducation[]>([] as IEducation[]);
    useEffect(() => {
        dispatch(profileActions.getMyProfileAction());
        if(profile.experience.length > 0){
            setExperiance(profile.experience);
        }else{
            setExperiance(profile.experience);
        }

        if(profile.education.length > 0){
            setEducation(profile.education);
        }else{
            setEducation(profile.education);   
        }

    }, []);
    useEffect(() => {
        dispatch(profileActions.getMyProfileAction());
        
        if(profile.experience.length > 0){
            
            setExperiance(profile.experience);
            
        }else{
            setExperiance(profile.experience);
        }

        if(profile.education.length > 0){
            setEducation(profile.education);
        }else{
            setEducation(profile.education);   
        }
    }, [successMessage]);

    let deleteEducation = (educationId:any) =>{
        if (educationId) {
            dispatch(profileActions.deleteEducationOfProfileAction(educationId)).then((response: any) => {
                if (response.error) {
                    ToastUtil.displayErrorToast(response.error.message);
                } else {
                    ToastUtil.displayInfoToast('Education is Deleted!');
                }
            })
        }
        // ProfileService.deleteEducation(educationId).then((response:any)=>{
        //     setSuccess(response.data.message);
        // }).catch((error)=>{
        //     console.log(error);
        // })
    }
   
    let deleteExperiance = (experianceId:any) =>{
        if (experianceId) {
            dispatch(profileActions.deleteExperienceOfProfileAction(experianceId)).then((response: any) => {
                if (response.error) {
                    ToastUtil.displayErrorToast(response.error.message);
                } else {
                    ToastUtil.displayInfoToast('Experience is Deleted!');
                }
            })
        }
        // ProfileService.deleteExperience(experianceId).then((response:any)=>{
        //     setSuccess(response.data.message);
        // }).catch((error)=>{
        //     console.log(error);
        // })
    }
    return(
        <>
            <Navabar/> 

            <div className="grid mt-4">
                <div className="container">
                    <h1>Profile Details</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, corporis. Quaerat rem illum quasi. Saepe eos in omnis quaerat hic cum consequatur perspiciatis excepturi laboriosam et nulla dolore, non nostrum.</p>
                    {/* <div className="row">
                        <div className="col-sm-12">
                            <div className="card shadow-lg">
                                <div className="card-body justify-content-center text-center align-items-center">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <img className="rounded-circle" height={120} src={user?.avatarImg} alt="Image Not Found"/>
                                        </div>
                                        <div className="col-sm-5">
                                            <p>{basics.name}</p>
                                            <p>{basics.email}</p>
                                            <p>{basics.location}</p>
                                            <p>{basics.designation}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="row mt-1">
                        <div className="col">
                            <div className="card shadow-lg">
                                <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-11">
                                        <h3>Profile</h3>
                                    </div>
                                    <div className="col-sm-1">
                                        <Link to="/profile/createProfile" className="btn btn-success">Update</Link>
                                    </div>
                                </div>
                                <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Location</th>
                                                <th>Skills</th>
                                                <th>Designation</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{user?.name}</td>
                                                <td>{user?.email}</td>
                                                <td>{profile.location}</td>
                                                <td>{profile.skills}</td>
                                                <td>{profile.designation}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col">
                            <div className="card shadow-lg">
                                <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-11">
                                        <h3>Expreiance</h3>
                                    </div>
                                    <div className="col-sm-1">
                                        <Link to="/profile/addExperiance" className="btn btn-success">+</Link>
                                    </div>
                                </div>
                                <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th><p className="text-center">Title</p></th>
                                                <th><p className="text-center">Company</p></th>
                                                <th><p className="text-center">Location</p></th>
                                                <th><p className="text-center">From</p></th>
                                                <th><p className="text-center">To</p></th>
                                                <th><p className="text-center">Current</p></th>
                                                <th><p className="text-center">Action</p></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                experience.length==0 &&
                                                <tr>
                                                    <td className="text-center" colSpan={7}>No Data Found</td>
                                                </tr>
                                            }
                                            {
                                                experience.map((exp)=>{
                                                    return (
                                                        <tr>
                                                            <td><p className="text-center">{exp.title}</p></td>
                                                            <td><p className="text-center">{exp.company}</p></td>
                                                            <td><p className="text-center">{exp.location}</p></td>
                                                            <td><p className="text-center">{exp.from}</p></td>
                                                            <td><p className="text-center">{exp.to}
                                                            
                                                                {
                                                                    exp.to == "" &&
                                                                    <p className="text-center"> - </p>
                                                                }
                                                            </p></td>
                                                            <td>
                                                                {
                                                                    exp.current == true &&
                                                                    <p className="text-center">Yes</p>
                                                                }

{
                                                                    exp.current == false &&
                                                                    <p className="text-center">-</p>
                                                                }
                                                            
                                                            </td>
                                                            <td>
                                                                <p className="text-center"><i onClick={()=>deleteExperiance(exp._id)} className="fa fa-trash" aria-hidden="true"></i></p>

                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 mb-5">
                        <div className="col">
                            <div className="card shadow-lg">
                                <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-11">
                                        <h3>Education</h3>
                                    </div>
                                    <div className="col-sm-1">
                                        <Link to="/profile/addEducation" className="btn btn-success">+</Link>
                                    </div>
                                </div>
                                <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th><p className="text-center">School</p></th>
                                                <th><p className="text-center">Degree</p></th>
                                                <th><p className="text-center">fieldOfStudy</p></th>
                                                <th><p className="text-center">Pass-Out</p></th>
                                                <th><p className="text-center">Action</p></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                education.length==0 &&
                                                <tr>
                                                    <td className="text-center" colSpan={7}>No Data Found</td>
                                                </tr>
                                            }
                                            {
                                                education.map((ed)=>{
                                                    return (
                                                        <tr key={ed._id}>
                                                            <td><p className="text-center">{ed.school}</p></td>
                                                            <td><p className="text-center">{ed.degree}</p></td>
                                                            <td><p className="text-center">{ed.fieldOfStudy}</p></td>
                                                            <td><p className="text-center">{ed.passout}</p></td>
                                                            <td>
                                                            <p className="text-center"><i onClick={()=>deleteEducation(ed._id)} className="fa fa-trash" aria-hidden="true"></i></p>

                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;