import React from "react";
import { GetServerSideProps } from "next";
import { IUser } from "../core";
import Cookies from "cookies";
import jwt from "jsonwebtoken";

interface IAuth {
    profile?: IUser;
}

export const AuthContext = React.createContext<IAuth>({});

export function useAuthProfile() {
    return React.useContext<IAuth>(AuthContext).profile;
}

interface AuthProviderProps extends IAuth{
    children?: React.ReactNode;
}
    
export function AuthProvider(props: AuthProviderProps) {
    return <AuthContext.Provider value={{profile: props.profile}}>
        {
            props.children
        }
    </AuthContext.Provider>
}