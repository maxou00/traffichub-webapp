
export interface IUser{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    verified: boolean;
    createdAt: number;
    updatedAt: number;
}

export interface IProject{
    _id: string;
    user: string;
    title: string;
    comment: string;
    createdAt: number;
    updatedAt: number;
}

export interface IWebTracker {
    _id: string;
    title: string;
    type: 'web';
    url: string;
    tag: string;
    createdAt: number;
    updatedAt: number;
}