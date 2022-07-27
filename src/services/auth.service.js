import HttpClient from '../utils/HttpClient';

const authService = {
  getNewToken: async () => {
    const { data } = await HttpClient({ url: '/auth/token', method: 'POST' });
    return data;
  },
  login: async (username, password) => {
    try {
      const { data } = await HttpClient({
        url: '/auth/login',
        method: 'POST',
        data: {
          username,
          password,
        },
      });
      const { data: dataResponse } = data;
      const { user } = dataResponse;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  register: async ({
    fullname,
    role,
    email,
    password,
    confirmPassword,
    organization,
    prefix,
  }) => {
    try {
      const { data } = await HttpClient({
        url: '/auth/register',
        method: 'POST',
        data: {
          fullname,
          role,
          password,
          confirmPassword,
          organization,
          prefix,
          email,
        },
      });
      const { data: dataResponse } = data;
      const { user } = dataResponse;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  logout: async () => {
    const response = await HttpClient({
      url: '/auth/logout',
      method: 'POST',
      withCredentials: true,
    });
    return response;
  },
  amILogin: async () => {
    const response = await HttpClient({
      url: '/auth/am_i_login',
      withCredentials: true,
      method: 'GET',
    });
    return response.data;
  },
};

export default authService;
