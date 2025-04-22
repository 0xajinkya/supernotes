import { AxiosRequestConfig } from "axios";

export interface ICreateNotePayload {
    title: string;
    content: string;
    generateAiSummay: boolean;
}

export interface ICreateNoteArgs {
    data: ICreateNotePayload;
    config?: AxiosRequestConfig;
}