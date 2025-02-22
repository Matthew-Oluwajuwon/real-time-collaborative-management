import {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    Method,
} from "axios";
import { UseMutationOptions, useMutation } from "react-query";

export type UseHttpMutationAxiosOptions<Data> = Pick<
  AxiosRequestConfig<Data>,
  "url" | "data" | "method" | "headers"
>;

export type UseHttpMutationFunctionProps<Data> = {
  data?: Data;
  config?: AxiosRequestConfig;
};

type UseHttpMutationOptions<Data, Response, Error> = {
  url?: string;
  data?: Data;
  method?: Method | string;
  headers?: Record<string, string>;
  api?: AxiosInstance; // New: Accept an Axios instance
  isAuthorized?: boolean; // New: flag for authorization
} & UseMutationOptions<Response, Error, Data>;

export function useHttpMutation<
  Data = unknown,
  Response = unknown,
  Error = unknown
>(
  options?: UseHttpMutationOptions<
    UseHttpMutationFunctionProps<Data>,
    Response,
    Error
  >
) {
  // Extract the axios options from the mutation options
  const {
    url,
    api,
    headers,
    onError,
    method = "POST",
    ...mutationOptions
  } = options || {};

  // Define the mutation function with an object containing data and optional config
  // This optional config can be used to provide additional axios settings at the time of mutation
  const mutationFn = async ({
    data,
    config,
  }: UseHttpMutationFunctionProps<Data>): Promise<Response> => {
    const response: AxiosResponse<Response> = await (
      api || import.meta.env.VITE_SUPABASE_API_BASE_URL
    ).request({
      url,
      data,
      method,
      headers: {
        ...headers,
      },
      ...config, // Spread the config to allow overriding default settings
    });

    return response.data;
  };

  return useMutation<Response, Error, UseHttpMutationFunctionProps<Data>>({
    mutationFn,
    ...mutationOptions,
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
  });
}
