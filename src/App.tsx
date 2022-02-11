import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from './pages/signup/SignUp';
import SignIn from './pages/signin/SignIn';
import Auth from './api/auth/auth';
import GuardRoute from './components/GuardRoute/GuardRoute';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    Auth.getUserData()
      .then(() => {
        setIsAuth(true);
      })
      .catch(() => {
        setIsAuth(false);
      });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            <GuardRoute canActivate={!isAuth} redirectTo="/general">
              <SignIn />
            </GuardRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuardRoute canActivate={!isAuth} redirectTo="/general">
              <SignUp />
            </GuardRoute>
          }
        />
        <Route
          path="/general"
          element={
            <GuardRoute canActivate={isAuth} redirectTo="/login">
              <h1>General</h1>
            </GuardRoute>
          }
        />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
