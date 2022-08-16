import React, { useEffect, useState } from "react";
import Navabar from "../../Layouts/AdminNavbar";
import { Container, ModalTitle, Table } from "react-bootstrap";
import { UserView } from "../../Login/Model/UserView";
import { AuthUtil } from "../../Util/AuthUtil";
import {useNavigate , Link} from "react-router-dom";
import { IJObs } from "../Model/IJobs";
import LogRegService from "../../Login/Services/LogRegService";
import * as adminJobActions from "../../Redux/AdminJob/job.actions";
import { useDispatch, useSelector } from "react-redux";
import { jobFeatureKey, RooAdminJobState } from "../../Redux/AdminJob/job.slice";
import { AppDispatch } from "../../Redux/Store";
import { ToastUtil } from "../../Util/ToastUtil";

interface IProps{}
interface IState{}

let AdminJobs:React.FC<IProps> =() =>{

    const navigate = useNavigate();
    const jobState = useSelector((state: RooAdminJobState) => {
        return state[jobFeatureKey];
    });
    const dispatch: AppDispatch = useDispatch();

    let [user, setUser] = useState<UserView>();
    let [success, setSuccess] = useState("");
    let {jobs,loading,successMessage} = jobState;
    useEffect(()=>{
        dispatch(adminJobActions.getAllJObsActions());
        // if(user?.isAdmin === false){
        //     navigate("/admin/login");
        // }
        // if(!AuthUtil.isLoggedIn()){
        //     navigate("/admin/login");
        // }
    },[successMessage])
    

    let deleteJob = (jobId:any) =>{
        dispatch(adminJobActions.deleteJobAction(jobId)).then((response:any)=>{
            if (response.error) {
                ToastUtil.displayErrorToast(response.error.message);
            } else {
                ToastUtil.displaySuccessToast('Education is Added!');
            }
        })
    }

    return(
        <>
            <Navabar/>  
            <div className="grid mt-4">
                <div className="container">
                     <div className="row mt-5 mb-5">
                        <div className="col">
                            <div className="card shadow-lg">
                                <div className="card-body">
                                
                                <div className="row">
                                    <div className="col-sm-11">
                                        <h1>Job Details</h1>
                                    </div>
                                    <div className="col-sm-1">
                                        <Link to="/admin/jobs/add" className="btn btn-success">+</Link>
                                    </div>
                                </div>
                                <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th><p className="text-center">Title</p></th>
                                                <th><p className="text-center">Company</p></th>
                                                <th><p className="text-center">Location</p></th>
                                                <th><p className="text-center">Experiance</p></th>
                                                <th><p className="text-center">Skills</p></th>
                                                <th><p className="text-center">Action</p></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                jobs.length==0 &&
                                                <tr>
                                                    <td className="text-center" colSpan={7}>No Data Found</td>
                                                </tr>
                                            }
                                            {
                                                // job.
                                                jobs.map((job)=>{
                                                    return (
                                                        <tr key={job._id}>
                                                            <td><p className="text-center">{job.title}</p></td>
                                                            <td><p className="text-center">{job.company}</p></td>
                                                            <td><p className="text-center">{job.location}</p></td>
                                                            <td><p className="text-center">{job.experiance}</p></td>
                                                            <td><p className="text-center">{job.skills}</p></td>
                                                            
                                                            <td>
                                                                <span className="text-center"><i onClick={()=>deleteJob(job._id)} className="fa fa-trash" aria-hidden="true"></i></span>
                                                                &nbsp;&nbsp;<Link to={`/admin/jobs/update/${job._id}`}><i className="fa fa-pencil" aria-hidden="true"></i></Link>

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

export default AdminJobs;