import {useQuery} from '@tanstack/react-query';
import {apiKey} from '../query-provider.tsx';
import {useMemo} from 'react';

export const getEventData = (eventId: string) => {
  const { data, isLoading, ...query } = useQuery({
    queryFn: async ({ signal }) => {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${apiKey}&locale=*`,
        {
          signal,
        },
      );
      return await response.json();
    },
    queryKey: ['event', eventId],
  });

  const eventDetails = useMemo(() => {
    if (isLoading || !data) {
      return [];
    }
    return data;
  }, [data, isLoading]);

  return { eventDetails, isLoading, ...query };
};
