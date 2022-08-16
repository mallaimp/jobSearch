import axios from "axios";
import { TokenUtil } from "../../Util/TokenUtil";

class JobsServices{
    private static serverurl:string | undefined = process.env.REACT_APP_SERVER_URL;


    public static getAllJobs(){
        return axios.get(`${this.serverurl}/jobs`);
    }

    public static applyJOb(jobData:any){
        // console.log(jobData);
        // return new Promise((resolve,reject)=>{
        //     if(TokenUtil.isSetToken()){
        //         axios.post(`${this.serverurl}/jobs/apply/`,jobData).then((response)=>{
        //             resolve(response);
        //         }).catch((error)=>{
        //             reject(error);
        //         })
        //     }
        // })
        return axios.post(`${this.serverurl}/jobs/apply/`,jobData);
    }

    public static getApplyJOb(userId:any){
        return axios.get(`${this.serverurl}/jobs/apply/${userId}`);
    }
}

export default JobsServices;