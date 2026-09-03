import { Response } from 'express';
import { IApiResponse, IApiResponseMeta } from '../types/api.types';

export class ApiResponse {
  static success<T>(
    res: Response,
    data: T,
    message = 'Operation successful',
    statusCode = 200,
    meta?: IApiResponseMeta
  ): Response<IApiResponse<T>> {
    const payload: IApiResponse<T> = {
      success: true,
      message,
      data,
      ...(meta && { meta })
    };
    return res.status(statusCode).json(payload);
  }

  static created<T>(
    res: Response,
    data: T,
    message = 'Resource created successfully',
    meta?: IApiResponseMeta
  ): Response<IApiResponse<T>> {
    return ApiResponse.success(res, data, message, 201, meta);
  }

  static paginated<T>(
    res: Response,
    data: T,
    page: number,
    limit: number,
    total: number,
    message = 'Data retrieved successfully'
  ): Response<IApiResponse<T>> {
    const totalPages = Math.ceil(total / limit);
    return ApiResponse.success(res, data, message, 200, {
      page,
      limit,
      total,
      totalPages
    });
  }

  static error(
    res: Response,
    message = 'An error occurred',
    statusCode = 500,
    errors?: unknown
  ): Response<IApiResponse> {
    const payload: IApiResponse = {
      success: false,
      message,
      ...(errors !== undefined && { errors })
    };
    return res.status(statusCode).json(payload);
  }
}
