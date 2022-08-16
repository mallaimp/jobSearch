import {createAsyncThunk} from "@reduxjs/toolkit";
import {IJObs} from "../../Users/Models/IJobs";
import JobsServices from "../../Users/Services/JobsServices";
import { TokenUtil } from "../../Util/TokenUtil";

//getAll Jobs Data
export const getAllJObsActions = createAsyncThunk('getAllJObsActions',async()=>{
   
    let response = await JobsServices.getAllJobs();
    return response.data;
   
})  

//get applied Job Data
export const getAppliedJobAction = createAsyncThunk('getAppliedJobAction', async(userId:any) => {
    if (TokenUtil.isSetToken()) {
        let response = await JobsServices.getApplyJOb(userId);
        return response.data;
    }
});

//Apply Job Data
export const applyJobAction = createAsyncThunk('applyJobAction', async (jobIData: any) => {
    if (TokenUtil.isSetToken()) {
        let response = await JobsServices.applyJOb(jobIData);
        return response.data;   
    }
});
