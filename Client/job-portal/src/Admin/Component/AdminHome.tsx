import React, { useEffect, useState } from "react";
import Navabar from "../../Layouts/AdminNavbar";
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { RootUserState, usersFeatureKey } from "../../Redux/User/user.slice";


interface IProps{}
interface IState{}

let AdminHome:React.FC<IProps> =() =>{
    const navigate = useNavigate();
    const userState = useSelector((state: RootUserState) => {
        return state[usersFeatureKey];
    });

    let {user} = userState;
    if(Object.keys(user).length == 0 || user?.isAdmin==false){
        navigate("/") 
    }
    return(
        <>
          <Navabar/>  
          <div className="wrapper">
                <div className="landing">
                    <div className="d-flex flex-column justify-content-center text-center align-items-center h-75 d-inline-block">
                    </div>
                </div>
            </div>
           
        </>
    );

}

export default AdminHome;