import {
  publicRouteConfig,
  studentRouteConfig,
  teacherRouteConfig,
} from '../../config/route.config';

import alertActions from '../alert/alert.action';
import authService from '../../services/auth.service';
import authTypes from './auth.type';

const authAction = {
  logout: () => {
    return (dispatch) => {
      authService
        .logout()
        .then(() => {
          localStorage.removeItem('user');
          dispatch({
            type: authTypes.LOGOUT,
            user: null,
          });
          window.location.replace(publicRouteConfig.login);
        })
        .catch((error) => dispatch(alertActions.error(error.message)));
    };
  },
  checkWhoAmI: () => {
    const whoAmI = (user) => ({
      type: authTypes.WHO_AM_I,
      user: user,
    });
    return async (dispatch) => {
      return authService
        .amILogin()
        .then(({ data }) => {
          const user = data.user;
          localStorage.setItem('user', JSON.stringify(user));
          dispatch(whoAmI(user));
        })
        .catch((error) => {
          console.log({ error });
          if (error.response.status === 401) {
            localStorage.removeItem('user');
            if (window.location.pathname !== publicRouteConfig.login) {
              window.location.replace(publicRouteConfig.login);
            }
          }
        });
    };
  },

  register: (payload) => {
    const request = (payload) => ({
      type: authTypes.REGISTER_REQUEST,
      user: payload,
    });

    const success = (user) => ({
      type: authTypes.REGISTER_SUCCESS,
      user: user,
    });

    const fail = () => ({
      type: authTypes.REGISTER_FAIL,
    });

    return async (dispatch) => {
      localStorage.removeItem('user');
      dispatch(request(payload));
      dispatch(alertActions.clear());
      return authService
        .register({
          fullname: payload.fullname,
          email: payload.email,
          password: payload.password,
          confirmPassword: payload.confirmPassword,
          role: payload.role,
          organization: payload.organization,
          prefix: payload.prefix,
        })
        .then(({ data }) => {
          const { user } = data;
          dispatch(success(user));
          return user;
        })
        .catch((error) => {
          dispatch(fail());
          const { response } = error;
          const { data } = response;
          dispatch(alertActions.error(data.message));
          return Promise.reject(data);
        });
    };
  },

  login: (username, password, nextUrl = '') => {
    const request = (payload) => ({
      type: authTypes.LOGIN_REQUEST,
      user: payload,
    });

    const success = (user) => ({
      type: authTypes.LOGIN_SUCCESS,
      user: user,
    });

    const fail = () => ({
      type: authTypes.LOGIN_FAIL,
    });

    return async (dispatch) => {
      localStorage.removeItem('user');
      dispatch(request({ username, password }));
      dispatch(alertActions.clear());
      return authService
        .login(username, password)
        .then((user) => {
          dispatch(success(user));
          // if (nextUrl) {
          //   console.log(nextUrl);
          //   window.location.replace(nextUrl);
          // } else if (user.roles.includes('teacher')) {
          //   window.location.replace(teacherRouteConfig.dashboard);
          // } else if (user.roles.includes('student')) {
          //   window.location.replace(studentRouteConfig.dashboard);
          // }
          if (user.roles.includes('teacher')) {
            window.location.replace(teacherRouteConfig.dashboard);
          } else if (user.roles.includes('student')) {
            window.location.replace(studentRouteConfig.dashboard);
          }
          return Promise.resolve();
        })
        .catch((error) => {
          dispatch(fail());
          dispatch(alertActions.error(error.message));
          return Promise.reject(error);
        });
    };
  },
};

export default authAction;
