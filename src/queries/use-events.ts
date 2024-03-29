import { useQuery } from '@tanstack/react-query';
import { apiKey } from '../query-provider.tsx';
import { useMemo, useState } from 'react';

export type UseEventOptions = {
  country?: string;
  page?: number;
};

export const useEvents = ({ country = 'DE', page = 0 }: UseEventOptions) => {
  const [maxPages, setMaxPages] = useState(0);
  const { data, isLoading, ...query } = useQuery({
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams([
        ['apikey', apiKey],
        ['countryCode', country],
        ['page', page.toString()],
        ['size', '10'],
        ['sort', 'date,desc'],
      ]);
      const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events?${searchParams.toString()}`, {
        signal,
      });
      const json = await response.json();
      // Ticketmaster API pages are zero-indexed
      setMaxPages(json.page.totalPages - 1);
      return json;
    },
    queryKey: ['events', country, page],
  });

  const events = useMemo(() => {
    if (isLoading || !data) {
      return [];
    }
    return data._embedded.events;
  }, [data, isLoading]);

  return { events, maxPages, isLoading, ...query };
};
