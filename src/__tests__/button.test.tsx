import { describe, vi, expect, it } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Button } from '../components/button.tsx';

describe('Button component', () => {
  it('registers when its clicked', () => {
    const fn = vi.fn();
    const component = render(<Button onClick={fn}>Hello world</Button>);
    fireEvent.click(component.getByText('Hello world'));
    expect(fn).toHaveBeenCalled();
  });
});
