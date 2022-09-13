import './style.css';

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import React from 'react';
import { Typography } from 'antd';
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
          <Link to='#'>
            <Typography.Text>Trang cá nhân</Typography.Text>
          </Link>
          <Link to='#' onClick={onCLickLogout}>
            <Typography.Text style={{ color: 'red' }}>
              Đăng xuất
            </Typography.Text>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
