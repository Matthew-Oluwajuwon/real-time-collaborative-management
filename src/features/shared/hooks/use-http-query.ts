import {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";
import { QueryFunction, UseQueryOptions, useQuery } from "react-query";
export type UseHttpQueryAxiosOptions<Data> = Pick<
  AxiosRequestConfig<Data>,
  "url" | "data" | "method" | "headers" | "params"
>;

export interface BaseApiError {
  message: string;
  code: string;
}

export type ApiError = AxiosError<BaseApiError>;

export type UseHttpQueryOptions<Data, Response, Selected, Error> =
  UseHttpQueryAxiosOptions<Data> &
    UseQueryOptions<Response, Error, Selected> & {
      /** Optional axios instance */
      api?: AxiosInstance;
    };

export function useHttpQuery<
  Data = unknown,
  Response = unknown,
  Selected = Response,
  Error = ApiError
>({
  api,
  url,
  data,
  params,
  method = "GET",
  headers,
  ...queryOptions
}: UseHttpQueryOptions<Data, Response, Selected, Error>) {
  const queryFn: QueryFunction<Response> = async (): Promise<Response> => {
    const response: AxiosResponse<Response> = await (
      api || import.meta.env.VITE_SUPABASE_API_BASE_URL
    ).request({
      url,
      data,
      params,
      method,
      headers,
    });
    return response.data;
  };

  return useQuery<Response, Error, Selected>({
    queryFn,
    ...queryOptions,
  });
}
