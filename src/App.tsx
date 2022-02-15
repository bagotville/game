import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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
