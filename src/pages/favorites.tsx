import { FC } from 'react';
import { useFavoritesContext } from '../favorites-provider.tsx';
import { Link } from 'react-router-dom';
import { useEventById } from '../queries/use-event-by-id.ts';
import { Spinner } from '../components/spinner.tsx';
import './favorites.css';

const FavoriteItem: FC<{ eventId: string }> = ({ eventId }) => {
  const { data, isLoading } = useEventById({ eventId });
  return (
    <li>{isLoading && !data ? <Spinner label="Getting event info" /> : <Link to={`/${eventId}`}>{data.name}</Link>}</li>
  );
};

export const Favorites: FC = () => {
  const { favorites } = useFavoritesContext();
  return (
    <div className="favorite-page">
      <Link to="/">Go back home</Link>
      <h2>Your favorited events</h2>

      <ul className="favorite-list">
        {favorites.map((favorite) => (
          <FavoriteItem key={favorite} eventId={favorite} />
        ))}
      </ul>
    </div>
  );
};
