import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserView} from "../../Login/Model/UserView";
import LogRegService from "../../Login/Services/LogRegService";
import { TokenUtil } from "../../Util/TokenUtil";


export const registrationAction = createAsyncThunk('registerAction',async(user:UserView)=>{
    let response = await LogRegService.userRegister(user);
    return response.data;
})  

export const loginUserAction = createAsyncThunk('loginUserAction', async (user: UserView) => {
    let response = await LogRegService.userLogin(user);
    return response.data;
});

// private url
export const getUserInfoAction = createAsyncThunk('getUserInfoAction', async () => {
    if (TokenUtil.isSetToken()) {
        let response = await LogRegService.userAuthenticate();
        return response.data;
    }
});