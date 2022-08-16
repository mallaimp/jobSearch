import {createAsyncThunk} from "@reduxjs/toolkit";

export const testAction = createAsyncThunk('testAction',async(userData:string|null)=>{
    return userData;
})  
