import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { UserView } from "../../Login/Model/UserView";
import { AuthUtil } from "../../Util/AuthUtil";
import * as userActions from './user.actions';

export const usersFeatureKey = "usersFeatureKey";

export interface RootUserState {
    [usersFeatureKey]: InitialState
}

export interface InitialState{
    loading:boolean;
    errorMessage:SerializedError;
    user:UserView;
    token:String | null;
    isAuthenticated:boolean;
    successMessage:String;
}

const initialState:InitialState={
    loading: false,
    errorMessage: {} as SerializedError,
    user: {} as UserView,
    token: null,
    isAuthenticated: false,
    successMessage: ""
}

export const userSlice = createSlice({
    name:"userSlice",
    initialState:initialState,
    reducers:{
        logoutAction:(state,action)=>{
            AuthUtil.deleteToken();
            state.user={} as UserView;
            state.token="";
            state.isAuthenticated=false;
        }
    },
    extraReducers(builder) {
        //register user
        builder.addCase(userActions.registrationAction.pending,(state)=>{
            state.loading=true;
        }).addCase(userActions.registrationAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.successMessage=action.payload.message;
        }).addCase(userActions.registrationAction.rejected,(state,action)=>{
            state.loading=false;
            state.errorMessage=action.error;
            state.successMessage="";
        })

        //login user
        .addCase(userActions.loginUserAction.pending,(state)=>{
            state.loading=true;
        }).addCase(userActions.loginUserAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.successMessage=action.payload.message;
            state.token = action.payload.token;
            AuthUtil.saveToken(action.payload.token);
            state.isAuthenticated=true;
            state.user=action.payload.user;
        }).addCase(userActions.loginUserAction.rejected,(state,action)=>{
            state.loading=false;
            state.errorMessage=action.error;
            state.successMessage="";
            AuthUtil.deleteToken();
            state.isAuthenticated=false;
            state.token=null;
        })

        //Get User Info
        .addCase(userActions.getUserInfoAction.pending,(state)=>{
            state.loading=true;
        }).addCase(userActions.getUserInfoAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.successMessage = "";
            state.user = action.payload.user;
            state.isAuthenticated = true;
        }).addCase(userActions.getUserInfoAction.rejected,(state,action)=>{
            state.loading = false;
            state.errorMessage = action.error;
            state.successMessage = "";
            state.user = {} as UserView;
            state.token = null;
            state.isAuthenticated = false;
            AuthUtil.deleteToken(); // delete the token
        })
    },
});

export const {logoutAction} = userSlice.actions;