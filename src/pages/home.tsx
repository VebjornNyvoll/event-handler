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
    setPage(0);
  };

  const { events, maxPages, isLoading } = useEvents({ page, country });
  return (
    <div className="home-container">
      <div className="home-section-list">
        <h1>Welcome to the event page</h1>
        <select className="countryDropdown" value={country} onChange={(event) => onCountryChange(event)}>
          <option value="US">United States</option>
          <option value="DE">Germany</option>
          <option value="NO">Norway</option>
          <option value="DK">Denmark</option>
        </select>

        <div className="pageHeader">
          <button className="arrowBtn" disabled={page === 0} onClick={() => onPageChange(Math.max(page - 1, 0))}>
            {' '}
            &#8249;{' '}
          </button>
          <h1>
            Page {page + 1}/{maxPages + 1}
          </h1>
          <button
            className="arrowBtn"
            disabled={page === maxPages}
            onClick={() => onPageChange(Math.min(page + 1, maxPages))}
          >
            {' '}
            &#8250;{' '}
          </button>
        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <ul className="home-section-list sidebar">
            {events.map((event: any) => (
              <li key={event.id}>
                <Link to={`/${event.id}?${searchParams.toString()}`}>
                  {event.name}
                  {favorites.includes(event.id) && '⭐'}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="home-section-event">
        {!params.eventId && (
          <h2 style={{ paddingLeft: 16 }}>Please select an event from the menu to see full information</h2>
        )}
        <Outlet />
      </div>
    </div>
  );
};
