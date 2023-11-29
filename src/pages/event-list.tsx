import { ChangeEvent, FC, useState } from 'react';
import { Link, Outlet, useSearchParams } from 'react-router-dom';
import { useFavoritesContext } from '../favorites-provider.tsx';
import { useEvents } from '../queries/use-events.ts';
import './event-list.css';
import { Button } from '../components/button.tsx';
import { Spinner } from '../components/spinner.tsx';

export const EventListPage: FC = () => {
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
    <div className="event-list-container">
      <div className="content-container event-container">
        <h2 className="content-heading">Events</h2>
        <p> Please select an event you like.</p>

        <div className="event-search-criteria">
          <label className="event-label" htmlFor="country">
            By country
          </label>
          <select
            className="event-list-dropdown"
            id="country"
            value={country}
            onChange={(event) => onCountryChange(event)}
          >
            <option value="US">United States</option>
            <option value="DE">Germany</option>
            <option value="NO">Norway</option>
            <option value="DK">Denmark</option>
          </select>
        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {events.length === 0 ? (
              <p>No events matched your search.</p>
            ) : (
              <>
                <p>This is a list of the events we could find matching your search.</p>
                <ul className="event-list">
                  {events.map((event: any) => (
                    <li className="event-list-item" key={event.id}>
                      <Link to={`/${event.id}?${searchParams.toString()}#event-info`}>
                        {event.name}
                        {favorites.includes(event.id) && '⭐'}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="event-list-controls">
                  <Button disabled={page === 0} onClick={() => onPageChange(Math.max(page - 1, 0))}>
                    {' '}
                    &#8249;{' '}
                  </Button>
                  <h1>
                    Page {page + 1}/{maxPages + 1}
                  </h1>
                  <Button disabled={page === maxPages} onClick={() => onPageChange(Math.min(page + 1, maxPages))}>
                    {' '}
                    &#8250;{' '}
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </div>

      <Outlet />
    </div>
  );
};
