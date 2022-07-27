import authTypes from './auth.type';

const user = localStorage.getItem('user');
const initState = user ? { login: true, user: JSON.parse(user) } : {};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case authTypes.WHO_AM_I:
      return {
        login: true,
        user: action.user,
      };
    case authTypes.REGISTER_REQUEST:
      return {
        login: false,
        user: action.user,
      };
    case authTypes.REGISTER_SUCCESS:
      return {
        login: true,
        user: action.user,
      };
    case authTypes.REGISTER_FAIL:
      return {
        login: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
