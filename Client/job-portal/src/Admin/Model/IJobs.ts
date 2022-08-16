export interface IJObs {
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