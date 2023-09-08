import { FC } from 'react';
import { Link } from 'react-router-dom';

export const HomePage: FC = () => {
  return (
    <>
      <h1>Hello world</h1>
      <Link to="/event/hello-world-my-new-event">Go to the event!</Link>
    </>
  );
};
