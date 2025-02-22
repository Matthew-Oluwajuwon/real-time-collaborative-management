import { defaultStaleTime } from "@/configs";
import { QueryClient } from "react-query";

const makeQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: defaultStaleTime,
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = (): QueryClient => {
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
};
