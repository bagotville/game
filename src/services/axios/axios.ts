import axios from 'axios';
import { toast, ToastOptions } from 'react-toastify';
import { BASE_URL } from '../constants';

const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => response.data,
  (err) => {
    const toastOption: ToastOptions = {
      theme: 'dark',
      autoClose: 3000,
    };

    err.response?.data?.reason
      ? toast.error(`${err.response.status} ${err.response.data.reason}`, toastOption)
      : toast.error(`${err.response?.status || err.name} ${err.response?.statusText || err.message}`, toastOption);

    return Promise.reject(err);
  },
);

export { http };
