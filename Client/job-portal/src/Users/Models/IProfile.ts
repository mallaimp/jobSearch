import {Schema} from 'mongoose';

export interface IExperience {
    _id?: string;
    title: string;
    company: string;
    location: string;
    from: string;
    to: string;
    current: boolean;
    description: string;
}

export interface IEducation {
    _id?: string;
    school: string;
    degree: string;
    passout: string;
    fieldOfStudy: string;
    description: string;
}

export interface IProfile {
    user: Schema.Types.ObjectId;
    _id?: string;
    name?: string;
    email?:string;
    avatarImg?: string;
    location: string;
    designation: string;
    skills: string[];
    experience: IExperience[],
    education: IEducation[],
    createdAt?: string;
    updatedAt?: string;
}