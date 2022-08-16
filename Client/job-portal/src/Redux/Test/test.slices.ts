import { createSlice, SerializedError } from "@reduxjs/toolkit";
import * as testActions from './test.actions'
export const testFeatureKey = "testFeatureKey";

export interface RootTestState {
    [testFeatureKey]: InitialState
}

export interface InitialState{
    userData:string|null;
    successMessage:string;
}

const initialState:InitialState={
   
    userData: "",
    successMessage: ""
}

export const testSlice = createSlice({
    name:"testSlice",
    initialState:initialState,
    reducers:{
    },
    extraReducers(builder) {
        //Test user
        builder.addCase(testActions.testAction.fulfilled,(state,action)=>{
            state.userData=action.payload
            state.successMessage="Success";
        })
    },
});
