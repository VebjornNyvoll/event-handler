import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './home.css';

export const HomePage: FC = () => {
  return (
    <div className="home-container">
      <nav className="home-navbar content-container">
        <Link to="/" className="home-nav-link home-title">
          🤘 YourEvents
        </Link>
        <div>
          <Link to="/favorites" className="home-nav-link">
            My favorites
          </Link>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};
