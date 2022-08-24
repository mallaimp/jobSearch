import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Navabar from "../../Layouts/Navabar";
import { IEducation, IExperience, IProfile } from "../Models/IProfile";
import {Link, useNavigate} from "react-router-dom";
import { AppDispatch } from "../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { profileFeatureKey, RootProfileState } from "../../Redux/Profile/profile.slices";
import { RootUserState, usersFeatureKey } from "../../Redux/User/user.slice";
import * as profileActions from "../../Redux/Profile/profile.actions";
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
       
        if(profile){
            if(Object.keys(profile).length>0){
                if(Object.keys(profile.experience).length>0){
                    // if(profile.experience.length > 0){
                        setExperiance(profile.experience);
                    }else{
                        setExperiance(profile.experience);
                    }
        
                    if(Object.keys(profile.education).length>0){
                    // if(profile.education.length > 0){
                        setEducation(profile.education);
                    }else{
                        setEducation(profile.education);   
                    }
            }
        }
        
        

    }, []);
    useEffect(() => {
        dispatch(profileActions.getMyProfileAction());
        
        if(profile){
            if(Object.keys(profile).length>0){
                if(Object.keys(profile.experience).length>0){
                    setExperiance(profile.experience);
                }else{
                    setExperiance(profile.experience);
                }

                if(Object.keys(profile.education).length>0){
                    setEducation(profile.education);
                }else{
                    setEducation(profile.education);   
                }
            }
        }
    }, [profile]);

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
                                                <td>{profile==null?"":profile.location}</td>
                                                <td>{profile==null?"":profile.skills}</td>
                                                <td>{profile==null?"":profile.designation}</td>
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
                                                <th><p className="text-center fw-bold pOverride">Title</p></th>
                                                <th><p className="text-center fw-bold pOverride">Company</p></th>
                                                <th><p className="text-center pOverride fw-bold">Location</p></th>
                                                <th><p className="text-center pOverride fw-bold">From</p></th>
                                                <th><p className="text-center pOverride fw-bold">To</p></th>
                                                <th><p className="text-center pOverride fw-bold">Current</p></th>
                                                <th><p className="text-center pOverride fw-bold">Action</p></th>
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
                                                            <td><p className="text-center pOverride">{exp.title}</p></td>
                                                            <td><p className="text-center pOverride">{exp.company}</p></td>
                                                            <td><p className="text-center pOverride">{exp.location}</p></td>
                                                            <td><p className="text-center pOverride">{exp.from}</p></td>
                                                            <td><p className="text-center pOverride">{exp.to}
                                                            
                                                                {
                                                                    exp.to == "" &&
                                                                    <p className="text-center pOverride"> - </p>
                                                                }
                                                            </p></td>
                                                            <td>
                                                                {
                                                                    exp.current == true &&
                                                                    <p className="text-center pOverride">Yes</p>
                                                                }

{
                                                                    exp.current == false &&
                                                                    <p className="text-center pOverride">-</p>
                                                                }
                                                            
                                                            </td>
                                                            <td>
                                                                <p className="text-center pOverride"><i onClick={()=>deleteExperiance(exp._id)} className="fa fa-trash" aria-hidden="true"></i></p>

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
                    <div className="row mt-5 mb-14">
                        <div className="col">
                            <div className="card shadow-lg mb-10">
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
                                                <th><p className="text-center pOverride fw-bold">School</p></th>
                                                <th><p className="text-center pOverride fw-bold">Degree</p></th>
                                                <th><p className="text-center pOverride fw-bold">fieldOfStudy</p></th>
                                                <th><p className="text-center pOverride fw-bold">Pass-Out</p></th>
                                                <th><p className="text-center pOverride fw-bold">Action</p></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                education.length==0 &&
                                                <tr>
                                                    <td className="text-center pOverride" colSpan={7}>No Data Found</td>
                                                </tr>
                                            }
                                            {
                                                education.map((ed)=>{
                                                    return (
                                                        <tr key={ed._id}>
                                                            <td><p className="text-center pOverride">{ed.school}</p></td>
                                                            <td><p className="text-center pOverride">{ed.degree}</p></td>
                                                            <td><p className="text-center pOverride">{ed.fieldOfStudy}</p></td>
                                                            <td><p className="text-center pOverride">{ed.passout}</p></td>
                                                            <td>
                                                            <p className="text-center pOverride"><i onClick={()=>deleteEducation(ed._id)} className="fa fa-trash" aria-hidden="true"></i></p>

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
                    <br />
                    <br />
                </div>
            </div>
        </>
    );
}

export default Profile;