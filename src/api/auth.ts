import { IResponseSingle } from "@/interfaces/api";
import { http } from "@/lib/http";
import { User } from "@prisma/client";
import { Session } from "@supabase/supabase-js";
import { AxiosRequestConfig } from "axios"

export const signUp = async (data: {
    firstName: string,
    lastName?: string,
    email: string,
    password: string
}, config?: AxiosRequestConfig) => {
    const response = await http.post<IResponseSingle<User>>(
        '/api/auth/signup',
        data,
        config
    );

    return response?.data;
};

export const logIn = async (data: {
    email: string,
    password: string
}, config?: AxiosRequestConfig) => {
    const response = await http.post<IResponseSingle<User & {
        session: Session
    }>>(
        '/api/auth/login',
        data,
        config
    );

    return response?.data;
};

export const getSession = async () => {
    const response = await http.get<IResponseSingle<{
        user: User,
        session: Session
    }>>(
        '/api/auth/get-me'
    );

    return response?.data;
};

export const googleOauth = async ({type}: {
    type: "login" | "signup"
}) => {
    const response = await http.get<IResponseSingle<{
        url: string
    }>>(
        `/api/auth/oauth/google?type=${type}`
    );

    return response?.data;
};