import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { IJObs } from "../../Admin/Model/IJobs";
import * as jobActions from "../UserJob/job.actions";


export const userJobFeatureKey = "userJobFeatureKey";

export interface RooUserJobState {
    [userJobFeatureKey]: InitialState
}

export interface InitialState{
    loading:boolean;
    errorMessage:SerializedError;
    job:IJObs;
    appliedJobs:IJObs[];
    jobs:IJObs[];
    successMessage:String;
}

const initialState:InitialState={
    loading: false,
    errorMessage: {} as SerializedError,
    job: {} as IJObs,
    jobs:[] as IJObs[],
    appliedJobs:[] as IJObs[],
    successMessage: ""
}

export const userJobSlice = createSlice({
    name:"userJobSlice",
    initialState:initialState,
    reducers:{},
    extraReducers(builder) {
        // get All Jobs
        builder.addCase(jobActions.getAllJObsActions.pending,(state)=>{
            state.loading=true;
        }).addCase(jobActions.getAllJObsActions.fulfilled,(state,action)=>{
            state.loading=false;
            state.jobs= action.payload.jobs;
        }).addCase(jobActions.getAllJObsActions.rejected,(state,action)=>{
            state.loading=false;
            state.errorMessage=action.error;
        })

        //get Applied Job
        .addCase(jobActions.getAppliedJobAction.pending,(state)=>{
            state.loading=true;
        }).addCase(jobActions.getAppliedJobAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.appliedJobs=action.payload.jobs;
        }).addCase(jobActions.getAppliedJobAction.rejected,(state,action)=>{
            state.loading=false;
            state.errorMessage=action.error;
        })

        //Apply A Job
        .addCase(jobActions.applyJobAction.pending,(state)=>{
            state.loading=true;
        }).addCase(jobActions.applyJobAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.successMessage=action.payload.message;
        }).addCase(jobActions.applyJobAction.rejected,(state,action)=>{
            state.loading=false;
            state.errorMessage=action.error;
        })
    },
});
