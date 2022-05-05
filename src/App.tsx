import { hot } from 'react-hot-loader/root';
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
import { useOAuth } from './api/hooks/useOAuth';
import { ErrorFallback } from './pages/ErrorFallback';
import Login from './pages/Login';
import Forum from './pages/Forum';
import Topic from './pages/Topic';
import NewTopic from './pages/NewTopic';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Register from './pages/Register';

function App() {
  const authCurrent = useAuthCurrent();
  const isAuthenticated = useSelector(isAuth);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const oAuth = useOAuth();

  const code = searchParams.get('code');
  const isServer = typeof window === 'undefined';
  useEffect(() => {
    if (isServer || !code) return;
    oAuth.mutateAsync({ code, redirect_uri: document.location.origin }).then(() => {
      authCurrent.refetch();
    });
  });

  return (
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
          <Route path={ROUTES.profile} element={<Profile className={styles.page} />} />
          <Route path={ROUTES.leaderboard} element={<Leaderboard className={styles.page} />} />
          <Route path={ROUTES.forum} element={<Forum className={styles.page} />} />
          <Route path={ROUTES.newTopic} element={<NewTopic className={styles.page} />} />
          <Route path={`${ROUTES.forum}/:topicId`} element={<Topic className={styles.page} />} />
          <Route path={`${ROUTES.game}/:levelId`} element={<GamePage className={styles.page} />} />
        </Route>

        <Route
          path={ROUTES.login}
          element={
            <GuardRoute canActivate={!isAuthenticated} redirectTo={ROUTES.home}>
              <Login isAuthRefetch={authCurrent.refetch} messages={LOGIN_MESSAGES} />
            </GuardRoute>
          }
        />

        <Route
          path={ROUTES.register}
          element={
            <GuardRoute canActivate={!isAuthenticated} redirectTo={ROUTES.home}>
              <Register isAuthRefetch={authCurrent.refetch} messages={REGISTER_PAGE_MESSAGES} />
            </GuardRoute>
          }
        />

        <Route path={ROUTES.other} element={<ErrorFallback error={new Error('404 Not found')} />} />
      </Routes>

      <ToastContainer autoClose={2000} theme="dark" />
    </>
  );
}

const AppHot = hot(App);
export default AppHot;
