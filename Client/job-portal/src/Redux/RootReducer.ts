import { combineReducers } from "@reduxjs/toolkit";
import * as userReducer from "./User/user.slice";
import * as profileReducer from "./Profile/profile.slices";
import * as jobReducer from "./AdminJob/job.slice";
import * as testReducer from "./Test/test.slices";
import * as userJobReducer from "./UserJob/job.slice";

const RootReducer = combineReducers({
    [userReducer.usersFeatureKey]: userReducer.userSlice.reducer,
    [profileReducer.profileFeatureKey]: profileReducer.profileSlice.reducer,
    [jobReducer.jobFeatureKey]: jobReducer.jobSlice.reducer,
    // [testReducer.testFeatureKey]: testReducer.testSlice.reducer,
    [userJobReducer.userJobFeatureKey]: userJobReducer.userJobSlice.reducer,
});

export default RootReducer;