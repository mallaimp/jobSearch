import { rejects } from "assert";
import axios from "axios";
import { resolve } from "path";
import { UserView } from "../Model/UserView";
import constants from "../../constants.json";
import { TokenUtil } from "../../Util/TokenUtil";

class LogRegService{
    private static serverurl:string | undefined = process.env.REACT_APP_SERVER_URL;


    public static userRegister(users:UserView){
        return axios.post(`${this.serverurl}/users/register`,users);
    }

    public static userLogin(users:UserView){
        return axios.post(`${this.serverurl}/users/login`,users);
    }

    public static userAuthenticate(){
        // return new Promise((resolve,rejects)=>{
        //     if(TokenUtil.isSetToken()){
        //         axios.get(`${this.serverurl}/users/me`).then((response)=>{
        //             resolve(response);
        //         }).catch((error)=>{
        //             rejects(error);
        //         });
        //     }
        // })
        return axios.get(`${this.serverurl}/users/me`);
        
    }
}

export default LogRegService;