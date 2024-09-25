import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTER_KEYS, STORAGE_KEYS } from '~shared/keys';
import Button from '~/shared/components/Button/Button';
import { homePageStyles } from './HomePage.styles';

const HomePage: React.FC = () => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

  if (token) {
    return <h1>Welcome back to your Todos!</h1>;
  }

  return (
    <div className={homePageStyles}>
      <h1 className="app-name">App Name</h1>
      <div className="auth-container">
        <Link to={ROUTER_KEYS.LOGIN} className="auth-link">
          <Button size="large" variant="primary" className="auth-button">Login</Button>
        </Link>
        <Link to={ROUTER_KEYS.REGISTER} className="auth-link">
          <Button size="large" variant="primary" className="auth-button">Register</Button>
        </Link>
        <Link to={ROUTER_KEYS.FORGOT_PASSWORD} className="forgot-password">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
