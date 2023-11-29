import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { HomePage } from './pages/home.tsx';
import { EventPage } from './pages/event.tsx';
import { Favorites } from './pages/favorites.tsx';
import { EventListPage } from './pages/event-list.tsx';
import { EventFallbackPage } from './pages/event-fallback.tsx';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomePage />}>
      <Route path="favorites" element={<Favorites />} />
      <Route path="/" element={<EventListPage />}>
        <Route path="/" element={<EventFallbackPage />} />
        <Route path=":eventId" element={<EventPage />} />
      </Route>
    </Route>,
  ),
  {
    basename: '/project1',
  },
);
