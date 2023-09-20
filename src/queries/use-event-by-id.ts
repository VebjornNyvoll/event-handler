import { useQuery } from '@tanstack/react-query';
import { apiKey } from '../query-provider.tsx';

export type UseEventByIdOptions = {
  eventId: string;
};

export const useEventById = ({ eventId }: UseEventByIdOptions) => {
  return useQuery({
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams([['apikey', apiKey]]);

      const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}?${searchParams.toString()}`, {
        signal,
      });
      return await response.json();
    },
    queryKey: ['event', eventId],
  });
};
