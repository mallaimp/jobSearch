import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Login/Component/User/Login';
import Home from './Users/Component/Home';
import MyJobs from './Users/Component/MyJobs';
import Jobs from './Users/Component/Jobs';
import Profile from './Users/Component/Profile';
import Register from './Login/Component/User/Register';
import Logout from './Login/Component/User/Logout';
import AddEducation from './Users/Component/AddEduction';
import AddExperience from './Users/Component/AddExperiance';
import CreateProfile from './Users/Component/CreateProfile';
import AdminLogin from './Login/Component/Admin/AdminLogin';
import AdminRegister from './Login/Component/Admin/AdminRegister';
import AdminHome from './Admin/Component/AdminHome';
import AdminJobs from './Admin/Component/AdminJobs';
import AddJob from './Admin/Component/AddJob';
import UpdateJob from './Admin/Component/UpdateJob';
import Test from './Users/Component/Test';

function App() {
  return (
   <>
     <React.Fragment>
        <BrowserRouter>
            <Routes>
                <Route path='/dashboard' element={<Home/>}/>
                <Route path='/jobs' element={<Jobs/>}/>
                <Route path='/myjobs' element={<MyJobs/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/' element={<Login/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/users/register' element={<Register/>}/>
                <Route path='/profile/addEducation' element={<AddEducation/>}/>
                <Route path='/profile/addExperiance' element={<AddExperience/>}/>
                <Route path='/profile/createProfile' element={<CreateProfile/>}/>
                <Route path='/admin/login' element={<AdminLogin/>}/>
                {/* <Route path='/logout' element={<Logout/>}/> */}
                <Route path='/admin/register' element={<AdminRegister/>}/>
                <Route path='/admin/dashboard' element={<AdminHome/>}/>
                <Route path='/admin/jobs' element={<AdminJobs/>}/>
                <Route path='/admin/jobs/add' element={<AddJob/>}/>
                <Route path='/admin/jobs/update/:jobId' element={<UpdateJob/>}/>
                <Route path='/test' element={<Test/>}/>

            </Routes>
        </BrowserRouter>
        </React.Fragment>
   </>
  );
}

export default App;
