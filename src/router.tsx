import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { HomePage } from './pages/home.tsx';
import { EventPage } from './pages/event.tsx';
import { Favorites } from './pages/favorites.tsx';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/" element={<HomePage />}>
        <Route path=":eventId" element={<EventPage />} />
      </Route>
    </>,
  ),
  {
    basename: '/project1',
  },
);
