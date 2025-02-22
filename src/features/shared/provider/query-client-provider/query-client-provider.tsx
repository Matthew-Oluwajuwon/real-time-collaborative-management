import { PropsWithChildren } from "react";
import { QueryClientProvider } from "react-query";
import { getQueryClient } from "./query-client-config";

export function AppQueryClientProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
