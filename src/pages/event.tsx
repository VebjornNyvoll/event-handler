import { FC, useCallback, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
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
  const inputRef = useRef<HTMLInputElement>(null);
  const { favorites, setFavorites } = useFavoritesContext();
  const { data, isLoading } = useEventById({ eventId: params.eventId! });
  const eventData: Event = data as Event;
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      element?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [location]);

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

  const formatter = new Intl.DateTimeFormat(['en-US'], {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const imgUrl: string = eventData?.images?.[0]?.url ? eventData.images[0].url : 'No image found';
  const startDate: string = eventData?.dates?.start?.localDate
    ? `Start date: ${formatter.format(new Date(eventData.dates.start.localDate))}`
    : 'Start date unknown';
  const startTime: string = eventData?.dates?.start?.localTime
    ? `Start time: ${eventData.dates.start.localTime}`
    : 'Start time unknown';
  const category: string = eventData?.classifications?.[0]?.segment?.name
    ? `Category: ${eventData.classifications[0].segment.name}`
    : 'Category unknown';
  const promoter: string = eventData?.promoter?.name ? `Promoter: ${eventData.promoter.name}` : 'Promoter unknown';
  const price: string = eventData?.priceRanges?.[0]?.min
    ? `Tickets from ${eventData.priceRanges[0].min}$`
    : 'Price unknown';
  const venue: string = eventData?._embedded?.venues?.[0]?.name
    ? `Venue: ${eventData._embedded.venues[0].name}`
    : 'Venue unknown';

  return (
    <div className="content-container event-info-container" id="event-info">
      {isLoading && !data ? (
        <Spinner />
      ) : (
        <div>
          <div className="event-actions">
            <h2 className="content-heading">{eventData.name ? eventData.name : 'Event name not found'}</h2>
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

          <div className="event-image-container">
            <img className="event-image" alt={eventData.name} src={imgUrl} />
          </div>
          <dl className="event-info-list">
            <dd>{startDate}</dd>
            <dd>{startTime}</dd>
            <dd>{price}</dd>
            <dd>{category}</dd>
            <dd>{venue}</dd>
            <dd>{promoter}</dd>
          </dl>
        </div>
      )}
    </div>
  );
};
