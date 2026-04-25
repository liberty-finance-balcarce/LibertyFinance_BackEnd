export interface ResponseDTO<T = void> {
  statusCode: number;
  message: string | string[];
  data?: T | T[];
}
