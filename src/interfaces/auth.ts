import { AxiosRequestConfig } from "axios";

export interface ISignUpPayload {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
  }
  
  export interface ISignUpArgs {
    data: ISignUpPayload;
    config?: AxiosRequestConfig;
  }

export interface ILoginPayload {
  email: string;
  password: string;
}
  
export interface ILoginArgs {
  data: ILoginPayload;
  config?: AxiosRequestConfig;
}