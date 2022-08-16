export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    avatarImg: string;
    isAdmin: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}