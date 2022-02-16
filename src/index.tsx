import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import RegisterPage from './pages/register/register.index';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <RegisterPage login='' password='' messages={['signup to bagoville', 'please enter your login...']}/>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root'),
);
