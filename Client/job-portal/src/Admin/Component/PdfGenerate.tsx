import React, { useEffect, useRef, useState } from "react";
import "../../assets/PDFGeneration/style.css";
import { useReactToPrint } from "react-to-print";
import AdminNavbar from "../../Layouts/AdminNavbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import * as userDetailsactions from "../../Redux/UsersDetails/userDetails.actions";
import { adminUsersFeatureKey, RootAdminUserState } from "../../Redux/UsersDetails/userDetails.slice";
import { jsPDF } from 'jspdf';


interface IProps{}
let PdfGenerate:React.FC<IProps> =() =>{

    let {userId} = useParams();
    const dispatch: AppDispatch = useDispatch();

    // get user info from redux store
    const userState = useSelector((state: RootAdminUserState) => {
        return state[adminUsersFeatureKey];
    });

    let {user,loading} = userState;
    useEffect(() => {
        dispatch(userDetailsactions.getAllUsersAction());
    }, []);

    let [experience, setExperience] = useState<any>();
    let [education, setEducation] = useState<any>();

    let userData = user.filter((users: { id: string | undefined; })=>users.id == userId);
    

    const componentRef:any = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
      
    return(
        <div className="landing2">
        <AdminNavbar/>
        <br />
        <div className="mt-5 mb-10 container">
        <div className="col-md-12 text-center">
        <button onClick={handlePrint} className="btn btn-success mt-5 text-center ">  Download </button> 
        </div>
            
            {
                    userData !== null &&
                    Object.keys(userData).length > 0 &&
                        userData.map((userd: any)=>{
                            return(
        <div ref={componentRef} className="resume-main" id="report">
            <div className="left-box">
                <br/><br/>
                <div className="profile">
                    <img src={userd.avatarImg}/>
                </div>
                <div className="content-box">
                    <h2>Profile Info</h2>
                    <hr className="hr1"/>
                    <p className="p1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>

                    <h3>Language:</h3>
                    <p className="p2">English</p>
                    <div id="progress"></div>
                    <p className="p2">Hindi</p>
                    <div id="progress1"></div>

                    <br/><br/>
                    <h2>My Skills</h2>
                    <hr className="hr1"/>
                    
                    <div className="col-div-6"><p className="p2">{userd.skills}</p></div>
                    {/* <div className="col-div-6">
                        <i className="fa fa-circle circle"></i>
                        <i className="fa fa-circle circle"></i>
                        <i className="fa fa-circle circle"></i>
                        <i className="fa fa-circle circle1"></i>
                        <i className="fa fa-circle circle1"></i>
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-div-6"><p className="p2">CSS</p></div>
                    <div className="col-div-6">
                        <i className="fa fa-circle circle"></i>
                        <i className="fa fa-circle circle"></i>
                        <i className="fa fa-circle circle"></i>
                        <i className="fa fa-circle circle"></i>
                        <i className="fa fa-circle circle1"></i>
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-div-6"><p className="p2">JQUERY</p></div>
                    <div className="col-div-6">
                        <i className="fa fa-circle circle"></i>
                        <i className="fa fa-circle circle"></i>
                        <i className="fa fa-circle circle"></i>
                        <i className="fa fa-circle circle1"></i>
                        <i className="fa fa-circle circle1"></i>
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-div-6"><p className="p2">JAVASCRIPT</p></div>
                    <div className="col-div-6">
                        <i className="fa fa-circle circle"></i>
                        <i className="fa fa-circle circle"></i>
                        <i className="fa fa-circle circle1"></i>
                        <i className="fa fa-circle circle1"></i>
                        <i className="fa fa-circle circle1"></i>
                    </div> */}

                    <div className="clearfix"></div>
                    <br/>
                    <h2>interests</h2>
                    <hr className="hr1"/>
                    <br/>
                    <div className="col-div-3 col3">
                        <i className="fa fa-futbol-o in"></i>
                        <span className="inp">Sports</span>
                    </div>
                    <div className="col-div-3 col3">
                        <i className="fa fa-futbol-o in"></i>
                        <span className="inp">Drive</span>
                    </div>
                    <div className="col-div-3 col3">
                        <i className="fa fa-futbol-o in"></i>
                        <span className="inp">Sports</span>
                    </div>
                    <div className="col-div-3 col3 mb-5">
                        <i className="fa fa-futbol-o in"></i>
                        <span className="inp">Sports</span>
                    </div>
                </div>
            </div>
            
            <div className="right-box">
                <h1>
                   
                    <span>{userd.name}</span>
                </h1>
                <p className="p3">{userd.designation}</p>

                <br/>	
                <h2 className="heading">Work Experience</h2>
                <hr className="hr2"/>
                <br/>
                {/* {
                    userd.experience.map((exp:any)=>{
                        return(
                            <h1>{exp.title}</h1>
                        )
                    })
                } */}
                {
                    Object.keys(userd.experience).length>0 &&
                    userd.experience.map((exp:any)=>{
                        return(
                            <><div className="col-div-4">
                                <p className="p5">{exp.from} - {exp.to?exp.to:"Present"}</p>
                                <span className="p5">Company Name</span>
                            </div><div className="col-div-8">
                                    <p className="p5">{exp.title}</p>
                                    <span className="p5">{exp.company}</span>
                                </div><div className="clearfix"></div>
                                <br/></>
                        )
                    })
                }
               
                
                <br />
                <h2 className="heading">My Education</h2>
                {
                    Object.keys(userd.education).length>0 &&
                    userd.education.map((edu:any)=>{
                        return(
                            <>
                                <hr className="hr2"/>
                                <br/>
                                <div className="col-div-4">
                                    <p className="p5">Degree</p>
                                    <span className="p5">Stream</span>
                                </div>
                                <div className="col-div-8">
                                    <p className="p5">{edu.degree} - {edu.passout}</p>
                                    <span className="p5">{edu.fieldOfStudy}</span>
                                </div>
                                <div className="clearfix"></div>
                                <br/>
                            </>
                        )
                    })
                }
                            
                

                <br/>	
            </div>
            <div className="clearfix"></div>

        </div>
         )
        })
    }
        <br />
        </div>
        </div>
    )
}

export default PdfGenerate;

