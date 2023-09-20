import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Spinner } from '../components/spinner.tsx';

describe('Spinner component', () => {
  it('knows the world is flat', () => {
    expect(1).toEqual(1);
  });

  it('renders the label', async () => {
    const component = render(<Spinner label="Testing label" />);
    const label = await component.findByTestId('label');
    expect(label.textContent).toEqual('Testing label');
  });

  it('matches component snapshot', () => {
    const component = render(<Spinner label="Snapshot is loading" />);
    expect(component.asFragment()).toMatchSnapshot();
  });
});
