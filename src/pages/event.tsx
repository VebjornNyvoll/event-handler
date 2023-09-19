import { FC, useCallback, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEventById } from '../queries/use-event-by-id.ts';
import { Spinner } from '../components/spinner.tsx';
import { useFavoritesContext } from '../favorites-provider.tsx';
import './event.css';

type Params = { eventId: string };

export const EventPage: FC = () => {
  const params = useParams<Params>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const { favorites, setFavorites } = useFavoritesContext();
  const { data, isLoading } = useEventById({ eventId: params.eventId! });
  const onInputChange = useCallback(() => {
    if (inputRef.current === null) {
      return;
    }
    const isAlreadyFavorite = favorites.includes(params.eventId!);
    if (isAlreadyFavorite) {
      setFavorites((v) => v.filter((s) => s != params.eventId));
    } else {
      setFavorites((v) => v.concat(params.eventId!));
    }
  }, [params.eventId, favorites.length]);

  return (
    <div className="event-page">
      {isLoading && !data ? (
        <Spinner />
      ) : (
        <div>
          <h1>{data.name}</h1>
          <input
            ref={inputRef}
            checked={favorites.includes(params.eventId!)}
            onChange={onInputChange}
            type="checkbox"
          />
          <span>Set favorite</span>
          <button
            onClick={() =>
              navigate(
                {
                  pathname: '/',
                  search: searchParams.toString(),
                },
                {},
              )
            }
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};
