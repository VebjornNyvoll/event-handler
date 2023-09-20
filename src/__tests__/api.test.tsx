import { describe, expect, it, vi } from 'vitest';
import { useEventById } from '../queries/use-event-by-id.ts';
import { FC } from 'react';
import { QueryProvider } from '../query-provider.tsx';
import { render } from '@testing-library/react';

describe('fetching from the api with react query', () => {
  // Mocks the api by installing fetch as a vi mock function
  const fn = vi.fn();
  global.fetch = fn;

  it('should try to call fetch when using the hook', () => {
    const Component: FC = () => {
      const data = useEventById({ eventId: 'zzz' });
      return <h1>Hello world {JSON.stringify(data)}</h1>;
    };
    const component = render(
      <QueryProvider>
        <Component />
      </QueryProvider>,
    );
    expect(component).toBeTruthy();
    expect(fn).toHaveBeenCalled();
  });
});
