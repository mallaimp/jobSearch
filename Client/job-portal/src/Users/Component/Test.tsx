import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Navabar from "../../Layouts/Navabar";
import { IEducation, IExperience, IProfile } from "../Models/IProfile";
import {Link, useNavigate} from "react-router-dom";
import { AppDispatch } from "../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import * as testActions from "../../Redux/Test/test.actions";
import { RootTestState, testFeatureKey } from "../../Redux/Test/test.slices";

interface IProps{}
let Test:React.FC<IProps> =() =>{
    const navigate = useNavigate();

    const dispatch: AppDispatch = useDispatch();

    // get user info from redux store
    const userDataState = useSelector((state: RootTestState) => {
        return state[testFeatureKey];
    });

    let {userData,successMessage} = userDataState;
    let [count, setcount] = useState(0);
    let changeName = () =>{
        dispatch(testActions.testAction("Nirav")).then((response)=>{
            alert(response.payload);
            console.log(response.payload);
        })
        // alert(userData);
        // setTimeout(()=>{
            dispatch(testActions.testAction("Mallappa")).then((response)=>{
                alert(response.payload);
                console.log(response.payload);
            })
            // alert(userData);
        // },2000)
    }
  
    // useEffect(() => {
    //     if(count>0){
    //         dispatch(testActions.testAction("Mallappa")).then((response)=>{
    //             console.log(response);
    //         })
    //     }
    //     // alert(userData);
    // }, [count>1]);


    return(
        <>
            <div className="grid mt-4">
                <div className="container">
                    <h1>Profile Details</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, corporis. Quaerat rem illum quasi. Saepe eos in omnis quaerat hic cum consequatur perspiciatis excepturi laboriosam et nulla dolore, non nostrum.</p>
                    <div className="row mt-1">
                        <div className="col">
                            <div className="card shadow-lg">
                                <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-11">
                                        <h3>Profile</h3>
                                    </div>
                                    <div className="col-sm-1">
                                        <button onClick={changeName} className="btn btn-success">Check</button>
                                    </div>
                                </div>
                                <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                            
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{userData}</td>
                                            </tr>
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

export default Test;