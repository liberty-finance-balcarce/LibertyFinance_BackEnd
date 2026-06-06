export interface ResponseDTO<T = void> {
  statusCode: number;
  message: string;
  data?: T;
}
