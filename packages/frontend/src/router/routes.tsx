import * as React from 'react';
import { Route } from 'react-router-dom';
import HomePage from '~/Pages/HomePage/HomePage';
import TodosPage from '~/Pages/TodosPage/TodosPage';
import LoginPage from '~/Pages/LoginPage';
import RegisterPage from '~/Pages/RegisterPage';
import EditUserPage from '~/Pages/EditUserPage';
import ForgotPasswordPage from '~/Pages/ForgotPasswordPage';
import ResetPasswordPage from '~/Pages/ResetPasswordPage';
import { ROUTER_KEYS } from '~shared/keys';
import ProtectedRoute from './ProtectedRoute';

export const publicRoutes = (
  <>
    <Route path={ROUTER_KEYS.HOME} element={<HomePage />} />
    <Route path={ROUTER_KEYS.LOGIN} element={<LoginPage />} />
    <Route path={ROUTER_KEYS.REGISTER} element={<RegisterPage />} />
    <Route path={ROUTER_KEYS.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
    <Route path={ROUTER_KEYS.RESET_PASSWORD} element={<ResetPasswordPage />} />
  </>
);

export const privateRoutes = (
  <>
    <Route element={<ProtectedRoute />}>
      <Route path={ROUTER_KEYS.TODOS} element={<TodosPage />} />
      <Route path={ROUTER_KEYS.EDIT_PROFILE} element={<EditUserPage />} />      
    </Route>
  </>
);