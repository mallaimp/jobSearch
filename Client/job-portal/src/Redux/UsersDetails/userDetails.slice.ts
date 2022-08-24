import { createSlice, SerializedError } from "@reduxjs/toolkit";
import * as userDetailsactions from "./userDetails.actions";

export const adminUsersFeatureKey = "adminUsersFeatureKey";

export interface RootAdminUserState {
    [adminUsersFeatureKey]: InitialState
}

export interface InitialState{
    loading:boolean;
    errorMessage:SerializedError;
    user:any;
    successMessage:String;
}

const initialState:InitialState={
    loading: false,
    errorMessage: {} as SerializedError,
    user: [],
    successMessage: ""
}

export const adminUserSlice = createSlice({
    name:"adminUserSlice",
    initialState:initialState,
    reducers:{},
    extraReducers(builder) {
        //Get All User
        builder.addCase(userDetailsactions.getAllUsersAction.pending,(state)=>{
            state.loading=true;
        }).addCase(userDetailsactions.getAllUsersAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.successMessage=action.payload.message;
            state.user=action.payload.user;
        }).addCase(userDetailsactions.getAllUsersAction.rejected,(state,action)=>{
            state.loading=false;
            state.errorMessage=action.error;
            state.successMessage="";
        })
    },
});
