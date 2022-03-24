import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import styles from './App.scss';
import { Main } from './components/Main';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ROUTES } from './services';
import { LoginPage } from './pages/Login/Login';
import { LOGIN_MESSAGES } from './pages/Login/Login.constants';
import { RegisterPage } from './pages/Register/Register';
import { REGISTER_PAGE_MESSAGES } from './pages/Register/Register.constants';
import { GuardRoute } from './components/GuardRoute';
import { Profile } from './pages/Profile';
import { useAuthCurrent } from './api';
import { isAuth } from './store/reducers/auth';
import { Leaderboard } from './pages/Leaderboard';
import { Forum } from './pages/Forum';
import { ErrorFallback } from './pages/ErrorFallback';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const authCurrent = useAuthCurrent();
  const isAuthenticated = useSelector(isAuth);
  const location = useLocation();

  return authCurrent.isLoading ? (
    <div className={styles.loading}>Loading...</div>
  ) : (
    <>
      <Routes>
        <Route
          path={ROUTES.home}
          element={
            <GuardRoute canActivate={isAuthenticated} redirectTo={ROUTES.login}>
              <div className={styles.app}>
                <Header isAuthRefetch={authCurrent.refetch} />
                <div className={styles.main}>
                  <Sidebar />
                  <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[location.pathname]}>
                    <Main />
                  </ErrorBoundary>
                </div>
              </div>
            </GuardRoute>
          }>
          <Route path={ROUTES.profile} element={<Profile className={styles.page} />} />
          <Route path={ROUTES.leaderboard} element={<Leaderboard className={styles.page} />} />
          <Route path={ROUTES.forum} element={<Forum className={styles.page} />} />
        </Route>

        <Route
          path={ROUTES.login}
          element={
            <GuardRoute canActivate={!isAuthenticated} redirectTo={ROUTES.home}>
              <LoginPage isAuthRefetch={authCurrent.refetch} messages={LOGIN_MESSAGES} />
            </GuardRoute>
          }
        />

        <Route
          path={ROUTES.register}
          element={
            <GuardRoute canActivate={!isAuthenticated} redirectTo={ROUTES.home}>
              <RegisterPage isAuthRefetch={authCurrent.refetch} messages={REGISTER_PAGE_MESSAGES} />
            </GuardRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}
