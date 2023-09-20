import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';
import { QueryProvider } from './query-provider.tsx';
import 'minireset.css/minireset.css';
import './index.css';
import { FavoritesProvider } from './favorites-provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <FavoritesProvider>
        <RouterProvider router={router} />
      </FavoritesProvider>
    </QueryProvider>
  </StrictMode>,
);
