import { Navigate, useLocation, useNavigate } from 'react-router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import authAction from '../../../redux/auth/auth.action';

const Private = ({ roles = [], redirectPath = '/login', children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
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
  if (window.history.state && window.history.state.idx > 0) {
    return navigate(-1);
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
