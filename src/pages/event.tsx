import { FC } from 'react';
import { useParams } from 'react-router-dom';

type Params = { eventId: string };

export const EventPage: FC = () => {
  const params = useParams<Params>();

  return <h1>Hello world, this is event {params.eventId}</h1>;
};
