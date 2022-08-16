import React from 'react';
import { useSelector } from 'react-redux';
import {Navigate} from 'react-router-dom';
import { RootUserState, usersFeatureKey } from '../Redux/User/user.slice';
import { AuthUtil } from '../Util/AuthUtil';

function PrivateRoute({children}: any) {

    const userState = useSelector((state: RootUserState) => {
        return state[usersFeatureKey];
    })

    const {isAuthenticated} = userState;

    const auth = AuthUtil.isLoggedIn();
    return auth ? children : <>
        <Navigate to="/"/>
    </>;
}

export default PrivateRoute;