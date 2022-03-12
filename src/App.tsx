import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './App.scss';
import { Main } from './components/Main';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ROUTES } from './services';
import { Logout } from './components/Logout/Logout';
import { LoginPage } from './pages/Login/Login';
import { LOGIN_MESSAGES } from './pages/Login/Login.constants';
import { RegisterPage } from './pages/Register/Register';
import { REGISTER_PAGE_MESSAGES } from './pages/Register/Register.constants';
import { useAuthCurrent } from './api/hooks/useAuthCurrent';
import { GuardRoute } from './components/GuardRoute';
import { Profile } from './pages/Profile';

export function App() {
  const authCurrent = useAuthCurrent();
  const isAuth = !!authCurrent.data && authCurrent.status !== 'error';

  return authCurrent.isLoading ? (
    <div className={styles.loading}>Loading...</div>
  ) : (
    <Routes>
      <Route
        path={ROUTES.home}
        element={
          <GuardRoute canActivate={isAuth} redirectTo={ROUTES.login}>
            <div className={styles.app}>
              <Header refetch={authCurrent.refetch} />
              <div className={styles.main}>
                <Sidebar />
                <Main />
              </div>
            </div>
          </GuardRoute>
        }>
        <Route path={ROUTES.profile} element={<Profile className={styles.page} />} />
      </Route>

      <Route
        path={ROUTES.login}
        element={
          <GuardRoute canActivate={!isAuth} redirectTo={ROUTES.home}>
            <LoginPage refetch={authCurrent.refetch} messages={LOGIN_MESSAGES} />
          </GuardRoute>
        }
      />

      <Route
        path={ROUTES.register}
        element={
          <GuardRoute canActivate={!isAuth} redirectTo={ROUTES.home}>
            <RegisterPage refetch={authCurrent.refetch} messages={REGISTER_PAGE_MESSAGES} />
          </GuardRoute>
        }
      />

      <Route path={ROUTES.logout} element={<Logout />} />
    </Routes>
  );
}
