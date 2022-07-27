import { Navigate, useLocation } from 'react-router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import authAction from '../../../redux/auth/auth.action';

const Private = ({ roles = [], redirectPath = '/login', children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  const { login: isLogin, user } = auth;

  useEffect(() => {
    dispatch(authAction.checkWhoAmI());
  }, []);

  if (!isLogin || !user) {
    return (
      <Navigate
        to={redirectPath}
        replace
        state={{ nextUrl: location.pathname }}
      />
    );
  }
  if (roles.length === 0) {
    return children;
  }
  const { roles: roleOfUsers } = user;
  if (roleOfUsers.some((roleOfUser) => roles.includes(roleOfUser))) {
    return children;
  }
  return (
    <Navigate
      to={redirectPath}
      replace
      state={{ nextUrl: location.pathname }}
    />
  );
};

export default Private;
