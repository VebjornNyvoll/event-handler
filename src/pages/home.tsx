import { FC, useState } from 'react';
import { useEvents } from '../queries/use-events.ts';

export const HomePage: FC = () => {
  const [page, setPage] = useState(0);
  const { events, maxPages } = useEvents({ country: 'US', page });

  return (
    <>
      <h1>Welcome to the event page</h1>
      <button onClick={() => setPage(0)}>Go to first page</button>
      <button onClick={() => setPage((s) => Math.min(s + 1, maxPages))}>Get next page</button>
      <button onClick={() => setPage((s) => Math.max(s - 1, 0))}>Get previous page</button>
      <button onClick={() => setPage(maxPages)}>Go to last page</button>

      <h1>
        On page {page}/{maxPages}
      </h1>
      <ul>
        {events.map((event: any) => (
          <li key={event.id}>
            <p>{event.name}</p> <a href={`/event/${event.id}`}>(info)</a>
          </li>
        ))}
      </ul>
    </>
  );
};
