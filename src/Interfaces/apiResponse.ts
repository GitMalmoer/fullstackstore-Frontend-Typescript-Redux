export default interface apiResponse {
  data?: {
    httpStatusCode?: number;
    isSuccess?: boolean;
    errorMessages?: Array<string>;
    result: { [key: string]: string };
  };
  error? : any,
}
