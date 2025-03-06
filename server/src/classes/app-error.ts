import { AxiosError } from 'axios';

export default class AppError extends Error {
  statusCode: number;
  data?: any;

  constructor(message: string, statusCode: number = 500, data?: any) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }

  static handleAxiosError(
    err: AxiosError<any, any>,
    defaultMsg: string
  ): AppError {
    const statusCode = err.response?.status || 500;
    const message =
      err.response?.data?.error?.message || err.message || defaultMsg;

    return new AppError(message, statusCode, err.response?.data);
  }
}
