import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import styles from './App.scss';
import { Main } from './components/Main';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { isAuth } from './pages/auth/auth.reducer';
import { GuardRoute } from './components/GuardRoute';
import { ROUTES } from './services';
import { Logout } from './components/Logout/Logout';
import { LoginPage } from './pages/auth/Login/Login';
import { RegisterPage } from './pages/auth/register/Register';

export function App() {
  const isAuthenticated = useSelector(isAuth);
  return (
    <Routes>
      <Route
        path={ROUTES.home}
        element={
          <GuardRoute redirectTo={ROUTES.login} canActivate={isAuthenticated}>
            <div className={styles.app}>
              <Header />
              <div className={styles.main}>
                <Sidebar />
                <Main />
              </div>
            </div>
          </GuardRoute>
        }
      />
      <Route
        path={ROUTES.logout}
        element={
          <div className={styles['console-background']}>
            <Logout />
          </div>
        }
      />
      <Route
        path={ROUTES.login}
        element={
          <div className={styles['console-background']}>
            <LoginPage />
          </div>
        }
      />
      <Route
        path={ROUTES.register}
        element={
          <div className={styles['console-background']}>
            <RegisterPage />
          </div>
        }
      />
    </Routes>
  );
}
