import React, { useEffect, useState } from "react";
import Navabar from "../../../Layouts/Navabar";
import {useNavigate} from "react-router-dom";
import { AuthUtil } from "../../../Util/AuthUtil";
import { ToastUtil } from "../../../Util/ToastUtil";


let Logout:React.FC =() =>{
    
    const navigate = useNavigate();
    
    useEffect(()=>{
        AuthUtil.deleteToken();
        navigate("/");
    },[])

    ToastUtil.displaySuccessToast('Logout is Success!');
    
   
    return(
        <>
          
        </>
    );

}

export default Logout;