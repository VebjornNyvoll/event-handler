import { ChangeEvent, FC, useState } from 'react';
import { useEvents } from '../queries/use-events.ts';
import './home.css';
import { Link, Outlet, useParams, useSearchParams } from 'react-router-dom';
import { useFavoritesContext } from '../favorites-provider.tsx';
import { Spinner } from '../components/spinner.tsx';

type Params = { eventId?: string };

export const HomePage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(() => {
    if (searchParams.has('page')) {
      return parseInt(searchParams.get('page')!, 10);
    }
    return 0;
  });
  const onPageChange = (next: number) => {
    setPage(next);
    setSearchParams((s) => {
      const newParams = new URLSearchParams(s);
      newParams.set('page', next.toString(10));
      return newParams;
    });
  };
  const params = useParams<Params>();
  const { favorites } = useFavoritesContext();

  const [country, setCountry] = useState(() => {
    if (searchParams.has('country')) {
      return searchParams.get('country')!;
    }
    // Default country is germany
    return 'DE';
  });

  const onCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
    setSearchParams((s) => {
      const newParams = new URLSearchParams(s);
      newParams.set('country', event.target.value);
      return newParams;
    });
  };

  const { events, maxPages, isLoading } = useEvents({ page, country });

  return (
    <div className="home-container">
      <div className="home-section-list">
        <h1>Welcome to the event page</h1>
        <button onClick={() => onPageChange(Math.min(page + 1, maxPages))}>Get next page</button>
        <button onClick={() => onPageChange(Math.max(page - 1, 0))}>Get previous page</button>
        <select value={country} onChange={(event) => onCountryChange(event)}>
          <option value="US">United States</option>
          <option value="DE">Germany</option>
          <option value="NO">Norway</option>
          <option value="DK">Denmark</option>
        </select>

        <h1>
          On page {page}/{maxPages}
        </h1>
        {isLoading ? (
          <Spinner />
        ) : (
          <ul>
            {events.map((event: any) => (
              <li key={event.id}>
                <p>{event.name}</p> <Link to={`/${event.id}?${searchParams}`}>(info)</Link>
                {favorites.includes(event.id) && '⭐'}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="home-section-event">
        {!params.eventId && <h2>Select an event on the left side</h2>}
        <Outlet />
      </div>
    </div>
  );
};
