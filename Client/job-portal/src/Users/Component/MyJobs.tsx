import React, { useEffect, useState } from "react";
import Navabar from "../../Layouts/Navabar";
import { IJObs } from "../Models/IJobs";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import * as UserJobAction from "../../Redux/UserJob/job.actions";
import { RooUserJobState, userJobFeatureKey } from "../../Redux/UserJob/job.slice";
import { RootUserState, usersFeatureKey } from "../../Redux/User/user.slice";

interface IProps{}
interface IState{}

let MyJobs:React.FC<IProps> =() =>{

    const userJobState = useSelector((state: RooUserJobState) => {
        return state[userJobFeatureKey];
    });
    const dispatch: AppDispatch = useDispatch();

     // get user info from redux store
     const userState = useSelector((state: RootUserState) => {
        return state[usersFeatureKey];
    });

    let {appliedJobs,loading,successMessage} = userJobState;
    
    let {user} = userState;
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(UserJobAction.getAppliedJobAction(user._id));
        // if(user?.isAdmin){
        //     navigate("/");
        // }
        // if(!AuthUtil.isLoggedIn()){
        //     navigate("/") 
        // }
    },[])

    return(
        <>
            <Navabar/>  
            <div className="container mt-3">
                <h3>Applied Jobs</h3>
                <div className="row">
                    {
                        Object.keys(appliedJobs).length == 0 && 
                        <p className="text-center fw-bolder">No Data Found</p>
                    }
                    {
                        appliedJobs.map((job)=>{
                            return(
                                <div className="col-sm-6 d-flex align-items-stretch mt-3" key={job._id}>
                                    <div className="card shadow-lg">
                                        <div className="card-body">
                                            <p className="text-center fw-bolder">{job.title}</p>
                                            <p className="text-center"><i className='fas fa-landmark'></i>&nbsp;{job.company}</p>
                                            <p><i className="fa fa-suitcase" aria-hidden="true">&nbsp;&nbsp;</i>{job.experiance}
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <span className="fa-stack">
                                                <i className="fa fa-circle-thin fa-stack-2x"></i>
                                                <i className="fa fa-map-marker fa-stack-1x"></i>
                                                </span>&nbsp;&nbsp;{job.location} 
                                            </p>
                                            <p className="text">{job.skills}</p>
                                            <p><i className="far fa-file-alt" aria-hidden="true"></i>&nbsp;{job.description}</p>
                                            <br></br><br></br>
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                            )
                        })   
                    }
                </div>
            </div>
        </>
    );

}

export default MyJobs;