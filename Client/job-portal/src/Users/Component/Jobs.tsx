import React, { useEffect, useState } from "react";
import Navabar from "../../Layouts/Navabar";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, ModalTitle } from "react-bootstrap";
import { IJObs } from "../Models/IJobs";
import JobsServices from "../Services/JobsServices";
import { UserView } from "../../Login/Model/UserView";
import { AuthUtil } from "../../Util/AuthUtil";
import {useNavigate} from "react-router-dom";
import { RootUserState } from "../../Redux/User/user.slice";
import { userJobFeatureKey, RooUserJobState } from "../../Redux/UserJob/job.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import * as UserJobAction from "../../Redux/UserJob/job.actions";
import { ToastUtil } from "../../Util/ToastUtil";

interface IProps{}
interface IState{}

let Jobs:React.FC<IProps> =() =>{

    const navigate = useNavigate();
    const jobState = useSelector((state: RooUserJobState) => {
        return state[userJobFeatureKey];
    });
    const dispatch: AppDispatch = useDispatch();

   
    let {jobs,loading,successMessage} = jobState;

    let [user, setUser] = useState<UserView>();
    
    useEffect(()=>{
        dispatch(UserJobAction.getAllJObsActions());
    },[]);

    let applyJob = (jobId:any) =>{
        let appliedData = {
            jobId:jobId
        }
        let selectedData = jobs.filter(job=>job._id == jobId);
        dispatch(UserJobAction.applyJobAction(appliedData)).then((response: any) => {
                
            if (response.error) {
                ToastUtil.displayErrorToast(response.error.message);
            } else {
                ToastUtil.displaySuccessToast('Applied Job Successfully!');
                navigate('/myjobs');
            }
        })
    }
   
    return(
        <>
            <Navabar/>  
            <div className="conatiner m-5">
                <h3>Lets Search Dream Job</h3>
                <div className="row">
                    {
                        jobs.map((job)=>{
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
                                            <div className="position-absolute bottom-0 end-50 m-4">
                                                <button onClick={()=>applyJob(job._id)} className="btn btn-primary">Apply</button>
                                            </div>
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

export default Jobs;