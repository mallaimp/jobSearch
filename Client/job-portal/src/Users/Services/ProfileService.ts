import axios from "axios";
import { AuthUtil } from "../../Util/AuthUtil";
import { TokenUtil } from "../../Util/TokenUtil";

export class ProfileService{
    private static serverurl:string | undefined = process.env.REACT_APP_SERVER_URL;

    public static getAllProfile(){
        // return axios.get(`${this.serverurl}/profile/${userId}`);
        return axios.get(`${this.serverurl}/profiles/`);
    }

    public static createProfile(profileData:any){
        // return new Promise((resolve,reject)=>{
        //     if(TokenUtil.isSetToken()){
        //         axios.post(`${this.serverurl}/profile/create`,profileData).then((response)=>{
        //             resolve(response);
        //         }).catch((error)=>{
        //             reject(error);
        //         });
        //     }
        // })
        return axios.post(`${this.serverurl}/profiles/create`,profileData);
        
    }

    public static addEducation(education:any){
        // return new Promise((resolve,reject)=>{
        //     if(TokenUtil.isSetToken()){
        //         axios.post(`${this.serverurl}/profile/education/`,education).then((response)=>{
        //             resolve(response);
        //         }).catch((error)=>{
        //             reject(error);
        //         });
        //     }
        // })
        return axios.post(`${this.serverurl}/profiles/education/`,education);
    }

    public static deleteEducation(eduId:any){
        // return new Promise((resolve,reject)=>{
        //     if(TokenUtil.isSetToken()){
        //         axios.delete(`${this.serverurl}/profile/education/${eduId}`).then((response)=>{
        //             resolve(response);
        //         }).catch((error)=>{
        //             reject(error);
        //         });
        //     }
        // })
        return axios.delete(`${this.serverurl}/profiles/education/${eduId}`)
    }

    public static addExperience(experience:any){
        // return new Promise((resolve,reject)=>{
        //     if(TokenUtil.isSetToken()){
        //         axios.post(`${this.serverurl}/profile/experience/`,experience).then((response)=>{
        //             resolve(response);
        //         }).catch((error)=>{
        //             reject(error);
        //         });
        //     }
        // })
        return axios.post(`${this.serverurl}/profiles/experience/`,experience);
    }

    public static deleteExperience(expId:any){
        // return new Promise((resolve,reject)=>{
        //     if(TokenUtil.isSetToken()){
        //         axios.delete(`${this.serverurl}/profile/experience/${expId}`).then((response)=>{
        //             resolve(response);
        //         }).catch((error)=>{
        //             reject(error);
        //         });
        //     }
        // })
        return axios.delete(`${this.serverurl}/profiles/experience/${expId}`)
    }
}
