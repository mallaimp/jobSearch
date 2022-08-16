import {createAsyncThunk} from "@reduxjs/toolkit";
import {IJObs} from "../../Admin/Model/IJobs";
import JobsServices from "../../Admin/Services/JobsServices";
import { TokenUtil } from "../../Util/TokenUtil";

//getAllAdmin Jobs Data
export const getAllJObsActions = createAsyncThunk('getAllJObsActions',async()=>{
    if (TokenUtil.isSetToken()) {
        let response = await JobsServices.getAllJObs();
        return response.data;
    }
})  

//getAAdmin Job Data
export const getAJobAction = createAsyncThunk('getAJobAction', async (jobId: any) => {
    let response = await JobsServices.getAJob(jobId);
    return response.data;
});

//Add Admin Job Data
export const addJobAction = createAsyncThunk('addJobAction', async (jobIData: IJObs) => {
    if (TokenUtil.isSetToken()) {
        let response = await JobsServices.addJob(jobIData);
        return response.data;   
    }
});

//Update Admin Job Data
export const updateJobAction = createAsyncThunk('updateJobAction', async (jobIData: any) => {
    if (TokenUtil.isSetToken()) {
        let response = await JobsServices.updateJob(jobIData , jobIData._id);
        return response.data;   
    }
});

//Delete Admin Job Data
export const deleteJobAction = createAsyncThunk('deleteJobAction', async (jobId:any) => {
    if (TokenUtil.isSetToken()) {
        let response = await JobsServices.deleteJob(jobId);
        return response.data;   
    }
});