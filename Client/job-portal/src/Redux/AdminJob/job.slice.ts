import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { IJObs } from "../../Admin/Model/IJobs";
import { AuthUtil } from "../../Util/AuthUtil";
import * as jobActions from "../AdminJob/job.actions";


export const jobFeatureKey = "jobFeatureKey";

export interface RooAdminJobState {
    [jobFeatureKey]: InitialState
}

export interface InitialState{
    loading:boolean;
    errorMessage:SerializedError;
    job:IJObs;
    jobs:IJObs[];
    successMessage:String;
}

const initialState:InitialState={
    loading: false,
    errorMessage: {} as SerializedError,
    job: {} as IJObs,
    jobs:[] as IJObs[],
    successMessage: ""
}

export const jobSlice = createSlice({
    name:"jobSlice",
    initialState:initialState,
    reducers:{},
    extraReducers(builder) {
        // get All Admin Jobs
        builder.addCase(jobActions.getAllJObsActions.pending,(state)=>{
            state.loading=true;
        }).addCase(jobActions.getAllJObsActions.fulfilled,(state,action)=>{
            state.loading=false;
            state.jobs= action.payload.jobs;
        }).addCase(jobActions.getAllJObsActions.rejected,(state,action)=>{
            state.loading=false;
            state.errorMessage=action.error;
        })

        //get A Admin Job
        .addCase(jobActions.getAJobAction.pending,(state)=>{
            state.loading=true;
        }).addCase(jobActions.getAJobAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.successMessage=action.payload.message;
            state.job= action.payload.job;
        }).addCase(jobActions.getAJobAction.rejected,(state,action)=>{
            state.loading=false;
            state.errorMessage=action.error;
        })

        //Add admin A Job
        .addCase(jobActions.addJobAction.pending,(state)=>{
            state.loading=true;
        }).addCase(jobActions.addJobAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.successMessage=action.payload.message;
        }).addCase(jobActions.addJobAction.rejected,(state,action)=>{
            state.loading=false;
            state.errorMessage=action.error;
        })

        //Update admin A Job
        .addCase(jobActions.updateJobAction.pending,(state)=>{
            state.loading=true;
        }).addCase(jobActions.updateJobAction.fulfilled,(state,action)=>{
            state.loading=false;
            // state.successMessage=action.payload.message;
        }).addCase(jobActions.updateJobAction.rejected,(state,action)=>{
            state.loading=false;
            state.errorMessage=action.error;
        })

        //Delete admin A Job
        .addCase(jobActions.deleteJobAction.pending,(state)=>{
            state.loading=true;
        }).addCase(jobActions.deleteJobAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.successMessage=action.payload.message;
        }).addCase(jobActions.deleteJobAction.rejected,(state,action)=>{
            state.loading=false;
            state.errorMessage=action.error;
        })
    },
});
