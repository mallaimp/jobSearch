import axios from "axios";
import {AuthUtil} from "./AuthUtil";
import constants from '../constants.json';

export class TokenUtil {

    public static isSetToken(): boolean {
        let token: string | null = AuthUtil.getToken();
        if (token) {
            // @ts-ignore
            axios.defaults.headers[constants.REACT_APP.AUTH_TOKEN_KEY] = token;
            return true;
        } else {
            // @ts-ignore
            delete axios.defaults.headers[constants.REACT_APP.AUTH_TOKEN_KEY];
            return false;
        }
    }
}