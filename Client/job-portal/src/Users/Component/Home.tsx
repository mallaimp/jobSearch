import React, { useEffect, useState } from "react";
import Navabar from "../../Layouts/Navabar";
import { UserView } from "../../Login/Model/UserView";
import { AuthUtil } from "../../Util/AuthUtil";
import {useNavigate} from "react-router-dom";
import LogRegService from "../../Login/Services/LogRegService";
import { TokenUtil } from "../../Util/TokenUtil";
import { useSelector } from "react-redux";
import { RootUserState, usersFeatureKey } from "../../Redux/User/user.slice";


interface IProps{}
interface IState{}

let Home:React.FC<IProps> =() =>{
    const navigate = useNavigate();
    
    // get user info from redux store
    const userState = useSelector((state: RootUserState) => {
        return state[usersFeatureKey];
    });

    let {user} = userState;
    if(Object.keys(user).length == 0 || user?.isAdmin){
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

export default Home;