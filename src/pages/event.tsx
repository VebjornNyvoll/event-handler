import { FC, useCallback, useRef } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useEventById } from '../queries/use-event-by-id.ts';
import { Spinner } from '../components/spinner.tsx';
import { useFavoritesContext } from '../favorites-provider.tsx';
import './event.css';

type Params = { eventId: string };
type Event = {
  name: string;
  images: { url: string }[];
  dates: {
    start: {
      localDate: string;
      localTime: string;
    };
  };
  classifications: {
    segment: {
      name: string;
    };
  }[];
  promoter: {
    name: string;
  };
  priceRanges: {
    min: string;
  }[];
  _embedded: {
    venues: {
      name: string;
    }[];
  };
};

export const EventPage: FC = () => {
  const params = useParams<Params>();
  const [searchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const { favorites, setFavorites } = useFavoritesContext();
  const { data, isLoading } = useEventById({ eventId: params.eventId! });
  const eventData: Event = data as Event;

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

  const imgUrl: string = eventData?.images?.[0]?.url ? eventData.images[0].url : 'No image found';
  const startDate: string = eventData?.dates?.start?.localDate
    ? 'Start date: ' + eventData.dates.start.localDate
    : 'Start date unknown';
  const startTime: string = eventData?.dates?.start?.localTime
    ? 'Start time: ' + eventData.dates.start.localTime
    : 'Start time unknown';
  const category: string = eventData?.classifications?.[0].segment?.name
    ? 'Category: ' + eventData.classifications[0].segment.name
    : 'Category unknown';
  const promoter: string = eventData?.promoter?.name ? 'Promoter: ' + eventData.promoter.name : 'Promoter unknown';
  const price: string = eventData?.priceRanges?.[0].min
    ? 'Tickets from: ' + eventData.priceRanges[0].min
    : 'Price unknown';
  const venue: string = eventData?._embedded?.venues?.[0].name
    ? 'Venue: ' + eventData._embedded.venues[0].name
    : 'Venue unknown';

  return (
    <div className="event-page">
      {isLoading && !data ? (
        <Spinner />
      ) : (
        <div>
          <div className="actions">
            <Link to={`/${searchParams.toString()}`}>Go back</Link>
            <div>
              <input
                ref={inputRef}
                checked={favorites.includes(params.eventId!)}
                onChange={onInputChange}
                type="checkbox"
                className="checkbox"
              />
              <span>Set favorite</span>
            </div>
          </div>

          <h1 className="eventHeader">{eventData.name ? eventData.name : 'Event name not found'}</h1>
          <img alt={eventData.name} src={imgUrl} />
          <p></p>
          <p>{startDate}</p>
          <p>{startTime}</p>
          <p>{price}$</p>
          <p className="extraInfo">{category}</p>
          <p className="extraInfo">{venue}</p>
          <p className="extraInfo">{promoter}</p>
        </div>
      )}
    </div>
  );
};
