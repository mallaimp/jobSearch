import {createAsyncThunk} from "@reduxjs/toolkit";
import UsersServices from "../../Admin/Services/UsersServices";


export const getAllUsersAction = createAsyncThunk('getAllUsersAction',async()=>{
    let response = await UsersServices.getAllUsers();
    return response.data;
})  
