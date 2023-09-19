import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { HomePage } from './pages/home.tsx';
import { EventPage } from './pages/event.tsx';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />}>
        <Route path=":eventId" element={<EventPage />} />
      </Route>
    </>,
  ),
);
