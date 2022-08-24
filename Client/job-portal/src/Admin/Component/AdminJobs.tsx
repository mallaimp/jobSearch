import React, { useEffect, useState } from "react";
import Navabar from "../../Layouts/AdminNavbar";
import { Container, ModalTitle, Table } from "react-bootstrap";
import { UserView } from "../../Login/Model/UserView";
import {useNavigate , Link} from "react-router-dom";
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
    },[successMessage])
    

    let deleteJob = (jobId:any) =>{
        dispatch(adminJobActions.deleteJobAction(jobId)).then((response:any)=>{
            if (response.error) {
                ToastUtil.displayErrorToast(response.error.message);
            } else {
                ToastUtil.displaySuccessToast('Job is Deleted Successfully!');
            }
        })
    }

    return(
        <>
        <div className="landing1">
            <Navabar/>  
            <br />
            <div className="grid">
                <div className="container divMargin">
                     <div className="row">
                        <div className="col">
                            <div className="">
                                
                                
                                <div className="row">
                                    <div className="col-sm-11">
                                        <h1>Job Details</h1>
                                    </div>
                                    <div className="col-sm-1">
                                        <Link to="/admin/jobs/add" className="btn btn-success">+</Link>
                                    </div>
                                </div>
                                <div className="card-body text-center">
                                <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Company</th>
                                                <th>Location</th>
                                                <th>Experiance</th>
                                                <th>Skills</th>
                                                <th>Action</th>
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
                                                            <td>{job.title}</td>
                                                            <td>{job.company}</td>
                                                            <td>{job.location}</td>
                                                            <td>{job.experiance}</td>
                                                            <td>{job.skills}</td>
                                                            
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
            </div>
        </>
    );

}

export default AdminJobs;