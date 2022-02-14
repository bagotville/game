import axios from 'axios';
import { BASE_URL } from '../constants';

const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

http.interceptors.response.use((response) => response.data);

export default http;
