import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import styles from './App.scss';
import { Main } from './components/Main';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ROUTES } from './services';
import { LOGIN_MESSAGES } from './pages/Login/Login.constants';
import { REGISTER_PAGE_MESSAGES } from './pages/Register/Register.constants';
import { GuardRoute } from './components/GuardRoute';
import { useAuthCurrent } from './api';
import { isAuth } from './store/reducers/auth';
import { GamePage } from './pages/Game/GamePage';
import { useServiceId } from './api/hooks/useServiceId';
import { useOAuth } from './api/hooks/useOAuth';
import { ErrorFallback } from './pages/ErrorFallback';

const Login = React.lazy(() => import('./pages/Login'));
const Forum = React.lazy(() => import('./pages/Forum'));
const Leaderboard = React.lazy(() => import('./pages/Leaderboard'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Register = React.lazy(() => import('./pages/Register'));

export function App() {
  const authCurrent = useAuthCurrent();
  const serviceId = useServiceId();
  const isAuthenticated = useSelector(isAuth);
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const oAuth = useOAuth();

  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) return;
    oAuth.mutateAsync({ code, redirect_uri: document.location.origin }).then(() => {
      authCurrent.refetch();
    });
  }, []);

  return authCurrent.isLoading || serviceId.isLoading ? (
    <div className={styles.loading}>Loading...</div>
  ) : (
    <>
      <Routes>
        <Route
          path={ROUTES.home}
          element={
            <GuardRoute canActivate={isAuthenticated} redirectTo={ROUTES.login}>
              <div className={styles.app}>
                <Header />
                <div className={styles.main}>
                  <Sidebar />
                  <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[location.pathname]}>
                    <Main />
                  </ErrorBoundary>
                </div>
              </div>
            </GuardRoute>
          }>
          <Route
            path={ROUTES.profile}
            element={
              <React.Suspense fallback={<div className={styles.loading}>Loading...</div>}>
                <Profile className={styles.page} />
              </React.Suspense>
            }
          />
          <Route
            path={ROUTES.leaderboard}
            element={
              <React.Suspense fallback={<div className={styles.loading}>Loading...</div>}>
                <Leaderboard className={styles.page} />
              </React.Suspense>
            }
          />
          <Route
            path={ROUTES.forum}
            element={
              <React.Suspense fallback={<div className={styles.loading}>Loading...</div>}>
                <Forum className={styles.page} />
              </React.Suspense>
            }
          />
          <Route path={`${ROUTES.game}/:levelId`} element={<GamePage className={styles.page} />} />
        </Route>

        <Route
          path={ROUTES.login}
          element={
            <GuardRoute canActivate={!isAuthenticated} redirectTo={ROUTES.home}>
              <React.Suspense fallback={<div className={styles.loading}>Loading...</div>}>
                <Login isAuthRefetch={authCurrent.refetch} messages={LOGIN_MESSAGES} />
              </React.Suspense>
            </GuardRoute>
          }
        />

        <Route
          path={ROUTES.register}
          element={
            <GuardRoute canActivate={!isAuthenticated} redirectTo={ROUTES.home}>
              <React.Suspense fallback={<div className={styles.loading}>Loading...</div>}>
                <Register isAuthRefetch={authCurrent.refetch} messages={REGISTER_PAGE_MESSAGES} />
              </React.Suspense>
            </GuardRoute>
          }
        />

        <Route path={ROUTES.other} element={<ErrorFallback error={new Error('404 Not found')} />} />
      </Routes>

      <ToastContainer autoClose={2000} theme="dark" />
    </>
  );
}
