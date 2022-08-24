import {createSlice, SerializedError} from "@reduxjs/toolkit";
import {IProfile} from "../../Users/Models/IProfile";
import * as profileActions from './profile.actions';

export const profileFeatureKey = "profileFeatureKey";

export interface RootProfileState {
    [profileFeatureKey]: InitialState
}

export interface InitialState {
    loading: boolean;
    errorMessage: SerializedError;
    profile: IProfile;
    profiles: IProfile[];
    successMessage: string | null;
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    profile: {} as IProfile,
    profiles: [] as IProfile[],
    successMessage: null
};

export const profileSlice = createSlice({
    name: 'profileSlice',
    initialState: initialState,
    reducers: {
        profileLogoutAction:(state,action)=>{
            // state.profiles=[];
            // state.loading=false;
            // state.successMessage="";
            // state.errorMessage={}  as SerializedError;
            // state.profile={} as IProfile

            let  nsate = state as InitialState;
            nsate = initialState as InitialState;
            console.log(state);
        }
    },
    extraReducers: (builder) => {
        // createProfileAction
        builder.addCase(profileActions.createProfileAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(profileActions.createProfileAction.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;
        }).addCase(profileActions.createProfileAction.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.error;
            state.successMessage = null;
        })

        // get my profile
        .addCase(profileActions.getMyProfileAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(profileActions.getMyProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        // if (action.payload.profile) {
            state.profiles = action.payload.profile;
            state.profile = action.payload.profile;
            state.successMessage= action.payload.message;
        // }else{
        //     state.profile = action.payload.profile;
        // }

        }).addCase(profileActions.getMyProfileAction.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.error;
            state.successMessage = null;
        })

        //  Add an experience to a Profile
        .addCase(profileActions.addExperienceToProfileAction.pending, (state, action) => {
                state.loading = true;
            }).addCase(profileActions.addExperienceToProfileAction.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;
        }).addCase(profileActions.addExperienceToProfileAction.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.error;
            state.successMessage = null;
        })

        //  Delete an experience of a Profile
        .addCase(profileActions.deleteExperienceOfProfileAction.pending, (state, action) => {
                state.loading = true;
            }).addCase(profileActions.deleteExperienceOfProfileAction.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;
        }).addCase(profileActions.deleteExperienceOfProfileAction.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.error;
            state.successMessage = null;
        })

        //  Add an education to a Profile
        .addCase(profileActions.addEducationToProfileAction.pending, (state, action) => {
                state.loading = true;
            }).addCase(profileActions.addEducationToProfileAction.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;
        }).addCase(profileActions.addEducationToProfileAction.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.error;
            state.successMessage = null;
        })

        //  Delete an education of a Profile
        .addCase(profileActions.deleteEducationOfProfileAction.pending, (state, action) => {
                state.loading = true;
        }).addCase(profileActions.deleteEducationOfProfileAction.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;
        }).addCase(profileActions.deleteEducationOfProfileAction.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.error;
            state.successMessage = null;
        })
    }
});

export const {profileLogoutAction} = profileSlice.actions;