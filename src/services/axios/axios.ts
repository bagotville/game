import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL, ROUTES } from '../constants';

const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => response.data,
  (err) => {
    if (err.response?.status === 401 && (location.pathname === ROUTES.login || location.pathname === ROUTES.register))
      return Promise.reject(err);

    err.response?.data?.reason
      ? toast.error(`${err.response.status} ${err.response.data.reason}`, { autoClose: 3000 })
      : toast.error(`${err.response?.status || err.name} ${err.response?.statusText || err.message}`, {
          autoClose: 3000,
        });

    return Promise.reject(err);
  },
);

export { http };
