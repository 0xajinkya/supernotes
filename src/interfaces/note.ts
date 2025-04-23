import { AxiosRequestConfig } from "axios";

export interface ICreateNotePayload {
    title: string;
    content: string;
}

export interface ICreateNoteArgs {
    data: ICreateNotePayload;
    config?: AxiosRequestConfig;
};

export interface IUpdateNoteArgs {
    data: {
        title: string;
        content: string;
    };
    config?: AxiosRequestConfig;
};