import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { FC, PropsWithChildren, useState } from 'react';

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  // QueryClient wrapped in useState to avoid re-instantiation upon re-render
  const [queryClient] = useState(() => new QueryClient());
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export const apiKey = import.meta.env.VITE_TICKETMASTER_KEY as string;
