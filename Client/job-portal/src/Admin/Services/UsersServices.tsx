import axios from "axios";

class UsersServices{
    private static serverurl:string | undefined = process.env.REACT_APP_SERVER_URL;


    public static getAllUsers(){
        return axios.get(`${this.serverurl}/users/`);
    }

}

export default UsersServices;