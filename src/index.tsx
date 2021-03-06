import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/root.scss';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { store } from './store/store';
import { startServiceWorker } from './helpers';
import { ErrorFallback } from './pages/ErrorFallback';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import '@reach/dialog/styles.css';

const queryClient = new QueryClient();

startServiceWorker();

ReactDOM.hydrate(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <App />
          </ErrorBoundary>
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
