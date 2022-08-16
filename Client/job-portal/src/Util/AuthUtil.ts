import { json } from 'stream/consumers';
import constants from '../constants.json';
import { UserView } from '../Login/Model/UserView';

export class AuthUtil {

    public static saveToken(token: string) {
        sessionStorage.setItem(constants.REACT_APP.AUTH_USERS, token);
    }

    public static deleteToken() {
        sessionStorage.removeItem(constants.REACT_APP.AUTH_USERS);
    }

    public static getToken(): string | null {
        return sessionStorage.getItem(constants.REACT_APP.AUTH_USERS);
    }

    public static isLoggedIn(): boolean {
        let token: string | null = this.getToken();
        return !!token;
    }

    public static isAdmin():boolean{
        let data:any = this.getToken();
        data = JSON.parse(data);
        return data.isAdmin;
    }
}