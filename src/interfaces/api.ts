import { AxiosError } from "axios";

export interface IResponseMultiple<T = Record<string, unknown>> {
  status: boolean;
  content: {
    meta: {
      total?: number;
      filter_count: number;
      pages: number;
    };
    data: T[];
  };
};

export interface IError {
  message?: string;
  code?: string;
  param?: string;
};

export type IErrorResponse = AxiosError<{
  status: boolean;
  errors: IError[];
}>;

export interface IResponseSingle<T = Record<string, unknown>, U = unknown> {
  status: boolean;
  content: {
    data: T;
    meta?: {
      page: number;
      total: number
    };
  };
};

export interface IMetaType {
  pages: number;
  total: number;
};

export interface IQueryInterface {
  where?: unknown;
  sort?: Record<string, 'asc' | 'desc'>;
  query?: {
    page?: number;
    limit?: number;
  };
  page?: number;
  limit?: number;
  search?: string;
  select?: Record<string, unknown>;
  include?: Record<string, boolean | IncludeOptions>;
};

interface IncludeOptions {
  select?: Record<string, boolean>;
};

export type FieldType = string | number | Date | boolean | null;

export type ComparableFieldType = number | Date;

export interface FilterOperator {
  equals?: FieldType;
  not?: FieldType;
  in?: FieldType[];
  not_in?: FieldType[];
  gt?: ComparableFieldType;
  gte?: ComparableFieldType;
  lt?: ComparableFieldType;
  lte?: ComparableFieldType;
  contains?: string;
  not_contains?: string;
  starts_with?: string;
  not_starts_with?: string;
  ends_with?: string;
  not_ends_with?: string;
  empty?: boolean;
  has?: Record<string, FieldType>;
  mode?: 'insensitive';
};