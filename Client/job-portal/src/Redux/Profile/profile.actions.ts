import {createAsyncThunk} from "@reduxjs/toolkit";
import {ProfileService} from "../../Users/Services/ProfileService";
import {IEducation, IExperience, IProfile} from "../../Users/Models/IProfile";
import { TokenUtil } from "../../Util/TokenUtil";

// private : createProfile
export const createProfileAction = createAsyncThunk('createProfileAction', async (profile: any) => {
    if (TokenUtil.isSetToken()) {
        let response = await ProfileService.createProfile(profile);
        return response.data;
    }
});

// private : getMyProfile
export const getMyProfileAction = createAsyncThunk('getMyProfileAction', async () => {
    if (TokenUtil.isSetToken()) {
        let response = await ProfileService.getAllProfile();
        return response.data;
    }
});

// private : addExperienceToProfile
export const addExperienceToProfileAction = createAsyncThunk('addExperienceAction', async (experience: IExperience) => {
    if (TokenUtil.isSetToken()) {
        let response = await ProfileService.addExperience(experience);
        return response.data;
    }
});


// private : deleteExperienceOfProfile
export const deleteExperienceOfProfileAction = createAsyncThunk('deleteExperienceAction', async (experienceId: string, {dispatch}) => {
    if (TokenUtil.isSetToken()) {
        let response = await ProfileService.deleteExperience(experienceId);
        return response.data;
    }
});

// private : addEducationToProfile
export const addEducationToProfileAction = createAsyncThunk('addEducationAction', async (education: IEducation) => {
    if (TokenUtil.isSetToken()) {
        let response = await ProfileService.addEducation(education);
        return response.data;
    }
});


// private : deleteEducationOfProfile
export const deleteEducationOfProfileAction = createAsyncThunk('deleteEducationAction', async (educationId: string) => {
    if (TokenUtil.isSetToken()) {
        let response = await ProfileService.deleteEducation(educationId);
        return response.data;
    }
});