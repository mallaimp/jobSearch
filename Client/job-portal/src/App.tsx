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
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './Router/Private.Router';
import Users from './Admin/Component/Users';
import PdfGenerate from './Admin/Component/PdfGenerate';

function App() {
  return (
   <>
     <React.Fragment>
        <BrowserRouter>
        <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            <Routes>
                <Route path='/dashboard' element={
                  <PrivateRoute>
                  <Home/>
                  </PrivateRoute>
                }/>
                <Route path='/jobs' element={
                  <PrivateRoute>  
                    <Jobs/>
                  </PrivateRoute>
                }/>
                <Route path='/myjobs' element={
                  <PrivateRoute>  
                    <MyJobs/>
                  </PrivateRoute>
                }/>
                <Route path='/profile' element={
                  <PrivateRoute>  
                    <Profile/>
                  </PrivateRoute>
                }/>
                <Route path='/' element={<Login/>}/>
                <Route path='/logout' element={<Logout/>}/>
                <Route path='/users/register' element={<Register/>}/>
                <Route path='/profile/addEducation' element={
                  <PrivateRoute>  
                    <AddEducation/>
                  </PrivateRoute>
                }/>
                <Route path='/profile/addExperiance' element={
                  <PrivateRoute>  
                    <AddExperience/>
                  </PrivateRoute>
                }/>
                <Route path='/profile/createProfile' element={
                  <PrivateRoute>  
                    <CreateProfile/>
                  </PrivateRoute>
                }/>
                <Route path='/admin/login' element={<AdminLogin/>}/>
                <Route path='/admin/register' element={<AdminRegister/>}/>
                <Route path='/admin/dashboard' element={
                  <PrivateRoute>  
                    <AdminHome/>
                  </PrivateRoute>
                }/>
                <Route path='/admin/jobs' element={
                  <PrivateRoute>  
                    <AdminJobs/>
                  </PrivateRoute>
                }/>
                <Route path='/admin/jobs/add' element={
                  <PrivateRoute>  
                    <AddJob/>
                  </PrivateRoute>
                }/>
                <Route path='/admin/jobs/update/:jobId' element={
                  <PrivateRoute>  
                  <UpdateJob/>
                </PrivateRoute>
                }/>
                <Route path='/admin/users' element={<Users/>}/>
                <Route path='/admin/users/details/:userId' element={<PdfGenerate/>}/>

            </Routes>
        </BrowserRouter>
        </React.Fragment>
   </>
  );
}

export default App;
