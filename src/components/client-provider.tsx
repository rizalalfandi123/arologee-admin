"use client";

import { QueryClient, QueryClientProvider } from "react-query";

interface ClientProviderProps extends React.PropsWithChildren {}

const queryClient = new QueryClient();

export default function ClientProvider({ children }: ClientProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
