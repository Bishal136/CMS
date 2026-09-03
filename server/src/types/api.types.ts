export interface IApiResponseMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  [key: string]: unknown;
}

export interface IApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: IApiResponseMeta;
  errors?: unknown;
}

export interface IPaginationOptions {
  page: number;
  limit: number;
  skip: number;
}
