"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ClientProviderProps extends React.PropsWithChildren {}

const queryClient = new QueryClient({
   defaultOptions: { queries: { staleTime: 10 * 1000 } },
});

export default function ClientProvider({ children }: ClientProviderProps) {
   return (
      <QueryClientProvider client={queryClient}>
         <ReactQueryDevtools initialIsOpen={false} />
         {children}
      </QueryClientProvider>
   );
}
