import React from 'react';
import { Navigate } from 'react-router-dom';
import authController from '../../controllers/authController';
import { ROUTES } from '../../services';
import { useAppDispatch } from '../../store/store.hooks';

export function Logout() {
  authController.logout(useAppDispatch());
  return <Navigate to={ROUTES.login} />;
}
