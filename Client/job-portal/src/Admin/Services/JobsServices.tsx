import axios from "axios";
import { TokenUtil } from "../../Util/TokenUtil";

class JobsServices{
    private static serverurl:string | undefined = process.env.REACT_APP_SERVER_URL;


    public static getAllJObs(){
        // return new Promise((resolve,reject)=>{
        //     if(TokenUtil.isSetToken()){
        //         axios.get(`${this.serverurl}/jobs/admin/`).then((response)=>{
        //             resolve(response);
        //         }).catch((error)=>{
        //             reject(error);
        //         })
        //     }
        // })
        return axios.get(`${this.serverurl}/jobs/admin`);
    }

    public static getAJob(jobId:any){
        return axios.get(`${this.serverurl}/jobs/${jobId}`);
    }

    public static addJob(jobData:any){
        // return new Promise((resolve,reject)=>{
        //     if(TokenUtil.isSetToken()){
        //         axios.post(`${this.serverurl}/jobs/add`,jobData).then((response)=>{
        //             resolve(response);
        //         }).catch((error)=>{
        //             reject(error);
        //         })
        //     }
        // })
        return axios.post(`${this.serverurl}/jobs/add`,jobData);
    }

    public static updateJob(jobData:any,jobId:any){
        // return new Promise((resolve,reject)=>{
        //     if(TokenUtil.isSetToken()){
        //         axios.put(`${this.serverurl}/jobs/update/${jobId}`,jobData).then((response)=>{
        //             resolve(response);
        //         }).catch((error)=>{
        //             reject(error);
        //         })
        //     }
        // })
        return axios.put(`${this.serverurl}/jobs/update/${jobId}`,jobData);
    }

    public static deleteJob(jobId:any){
        return axios.delete(`${this.serverurl}/jobs/delete/${jobId}`);
    }
}

export default JobsServices;