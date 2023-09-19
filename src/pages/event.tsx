import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { getEventData } from '../queries/get-event-data.ts';

type Params = { eventId: string };

export const EventPage: FC = () => {
  const params = useParams<Params>();
  const eventDetails = getEventData(params.eventId);
  

  return <h1>Hello world, this is event {eventDetails.name}</h1>;
};
