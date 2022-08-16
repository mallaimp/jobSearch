import {Schema} from 'mongoose';
export interface IJObs {
    user: Schema.Types.ObjectId;
    _id?: string;
    title: string;
    company: string;
    description: string;
    experiance: string;
    location: string;
    skills: string[];
    createdAt?: Date;
    updatedAt?: Date;
}