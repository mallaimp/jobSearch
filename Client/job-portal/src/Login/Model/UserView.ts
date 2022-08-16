export interface UserView {
    _id?: string;
    name?: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    avatarImg?: string;
    createdAt?: string;
    updatedAt?: string;
}