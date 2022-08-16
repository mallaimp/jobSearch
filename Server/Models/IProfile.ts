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
    fieldOfStudy: string;
    passout: string;
    description: string;
}

export interface IProfile {
    user: Schema.Types.ObjectId;
    _id?: string;
    location: string;
    designation: string;
    skills: string[];
    experience: IExperience[],
    education: IEducation[],
    createdAt?: string;
    updatedAt?: string;
}