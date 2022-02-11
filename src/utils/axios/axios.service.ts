import axios from 'axios';

const http = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
  withCredentials: true,
});

http.interceptors.response.use((response) => response.data);

export default http;
