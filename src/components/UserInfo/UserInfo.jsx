import './style.css';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import React from 'react';
import authAction from '../../redux/auth/auth.action';

const UserInfo = ({ refModal }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onCLickLogout = (e) => {
    e.preventDefault();
    dispatch(authAction.logout());
  };
  return (
    <div className='userinfo-modal' ref={refModal}>
      <div className='userinfo-modal__tippy'>
        <div className='d-flex-center'>
          <img
            src='https://graph.facebook.com/1615573495302871/picture?width=400&amp;height=400'
            alt='Long Le'
            className='user-avatar'
          />
          <div className='user-info' style={{ marginLeft: '12px' }}>
            <div className='fullname-user'>{user.fullname}</div>
          </div>
        </div>
        <hr />
        <div className='action-link'>
          <Link to='#'>Trang cá nhân</Link>
          <Link to='#' style={{ color: 'red' }} onClick={onCLickLogout}>
            Đăng xuất
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
