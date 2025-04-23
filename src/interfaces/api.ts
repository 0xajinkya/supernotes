import { AxiosError } from "axios";

export interface IError {
  message?: string;
  code?: string;
  param?: string;
};

export type IErrorResponse = AxiosError<{
  status: boolean;
  errors: IError[];
}>;

export interface IResponseSingle<T = Record<string, unknown>> {
  status: boolean;
  content: {
    data: T;
    meta?: {
      page: number;
      total: number
    };
  };
};