import React, { useEffect, useState } from "react";
import Navabar from "../../../Layouts/Navabar";
import {useNavigate} from "react-router-dom";
import { AuthUtil } from "../../../Util/AuthUtil";


let Logout:React.FC =() =>{
    
    const navigate = useNavigate();
    
    useEffect(()=>{
        AuthUtil.deleteToken();
        navigate("/");
    },[])
    
   
    return(
        <>
          
        </>
    );

}

export default Logout;