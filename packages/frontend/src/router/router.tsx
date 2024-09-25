import * as React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';

const AppRouter: React.FunctionComponent = () => {
  return (
    <Router>
      <Routes>
        {publicRoutes}
        {privateRoutes}
      </Routes>
    </Router>
  );
};

export default AppRouter;