import { ComponentPropsWithoutRef, FC } from 'react';
import './button.css';

export const Button: FC<ComponentPropsWithoutRef<'button'>> = (props) => {
  return <button className="arrowBtn" {...props} />;
};
