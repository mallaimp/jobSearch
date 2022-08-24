import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Navabar from "../../Layouts/Navabar";
import { IEducation, IExperience, IProfile } from "../../Users/Models/IProfile";
import {Link, useNavigate} from "react-router-dom";
import { AppDispatch } from "../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { profileFeatureKey, RootProfileState } from "../../Redux/Profile/profile.slices";
import { RootUserState, usersFeatureKey } from "../../Redux/User/user.slice";
import * as profileActions from "../../Redux/Profile/profile.actions";
import { ToastUtil } from "../../Util/ToastUtil";
import AdminNavbar from "../../Layouts/AdminNavbar";

import * as userDetailsactions from "../../Redux/UsersDetails/userDetails.actions";
import { adminUsersFeatureKey, RootAdminUserState } from "../../Redux/UsersDetails/userDetails.slice";

interface IProps{}
interface IState{}

let Users:React.FC<IProps> =() =>{
    const navigate = useNavigate();

    const dispatch: AppDispatch = useDispatch();

    // get user info from redux store
    const userState = useSelector((state: RootAdminUserState) => {
        return state[adminUsersFeatureKey];
    });

    let {user,loading} = userState;
    useEffect(() => {
        dispatch(userDetailsactions.getAllUsersAction());
      
    }, []);
    
    return(
        <>
           <div className="landing1">
            <AdminNavbar/> 
           <br />
            <div className="grid">
                <div className="container divMargin">
                    <h1>User Details</h1>
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
                            <div className="">
                                <div className="card-body text-center">
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
                                            {
                                                user.map((users:any)=>{
                                                    return(
                                                        <tr>
                                                        <td>{users.name}</td>
                                                        <td>{users.email}</td>
                                                        <td>{users.location}</td>
                                                        <td>{users.skills}</td>
                                                        <td>{users.designation}</td>
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

export default Users;