import Cookies from 'js-cookie';
import authService from '../services/auth.service';
import axios from 'axios';

const HttpClient = axios.create({
  timeout: 2000,
  timeoutErrorMessage: 'Không thể kết nối tới máy chủ. Vui lòng thử lại sau.',
  baseURL: process.env.REACT_APP_BACKEND_URL + '/api/v1',
  withCredentials: true,
  headers: {
    // Host: process.env.REACT_APP_HOST,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(Cookies.get('_token')
      ? { Authorization: 'Bearer' + Cookies.get('_token') }
      : {}),
  },
});

HttpClient.interceptors.request.use(
  function (config) {
    config._retry = true;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

HttpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest._retry &&
      error.response.data.isAuto
    ) {
      originalRequest._retry = true;
      await authService.getNewToken();
      return HttpClient(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default HttpClient;
