import { FC } from 'react';
import { useFavoritesContext } from '../favorites-provider.tsx';
import { Link } from 'react-router-dom';
import { useEventById } from '../queries/use-event-by-id.ts';
import { Spinner } from '../components/spinner.tsx';
import './favorites.css';

const FavoriteItem: FC<{ eventId: string }> = ({ eventId }) => {
  const { data, isLoading } = useEventById({ eventId });
  return (
    <li>
      {isLoading && !data ? (
        <Spinner label="Getting event info" />
      ) : (
        <Link to={`/${eventId}#event-info`}>{data.name}</Link>
      )}
    </li>
  );
};

export const Favorites: FC = () => {
  const { favorites } = useFavoritesContext();
  return (
    <div className="content-container">
      <h2 className="content-heading">Your favorited events</h2>
      {favorites.length !== 0 ? (
        <ul className="favorite-list">
          {favorites.map((favorite) => (
            <FavoriteItem key={favorite} eventId={favorite} />
          ))}
        </ul>
      ) : (
        <>
          <h3>You have no favorites</h3>
          <p>
            Head to the <Link to="/">event overview</Link> to find some!
          </p>
        </>
      )}
    </div>
  );
};
