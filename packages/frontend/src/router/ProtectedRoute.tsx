import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '~store/auth.store';
import { ROUTER_KEYS } from '~shared/keys';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = ROUTER_KEYS.LOGIN }) => {
  const token = useAuthStore((state) => state.token);
  return token ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;