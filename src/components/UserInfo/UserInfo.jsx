import './style.css';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  studentRouteConfig,
  teacherRouteConfig,
} from '../../config/route.config';
import { useDispatch, useSelector } from 'react-redux';

import { Typography } from 'antd';
import authAction from '../../redux/auth/auth.action';

const UserInfo = ({ refModal }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onCLickLogout = (e) => {
    e.preventDefault();
    dispatch(authAction.logout());
  };
  const { pathname } = useLocation();
  const [navigateDashboard, setNavigateDashboard] = useState(null);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const onClickNavigate = (e) => {
    e.preventDefault();
    window.location.href = navigateDashboard.link;
    // navigate(navigateDashboard.link);
  };

  useEffect(() => {
    if (pathname.startsWith('/student/')) {
      if (user.roles.includes('teacher')) {
        // go to teacher dashboard
        setNavigateDashboard({
          link: teacherRouteConfig.dashboard,
          text: 'Vào màn Giáo Viên',
        });
        setTitle('Học sinh');
      }
    }
    if (pathname.startsWith('/teacher/')) {
      if (user.roles.includes('student')) {
        // go to student dashboard
        setNavigateDashboard({
          link: studentRouteConfig.dashboard,
          text: 'Vào màn Học Sinh',
        });
        setTitle('Giáo viên');
      }
    }
  }, [user, pathname]);

  return (
    <div className='userinfo-modal' ref={refModal}>
      <div className='userinfo-modal__tippy'>
        <div className='d-flex-center'>
          {/* <AvatarOwner fullname={user?.fullname} src={user?.avatarUrl} /> */}
          <div className='user-info'>
            {/* <div className='fullname-user'>{user.fullname}</div> */}
            <Typography.Text className='fullname-user'>
              {user.fullname}
            </Typography.Text>
            <br />
            <Typography.Text className='user-title'>{title}</Typography.Text>
          </div>
        </div>
        <hr />
        <div className='action-link'>
          <Link to='#'>
            <Typography.Text>Trang cá nhân</Typography.Text>
          </Link>
          {user.roles.includes('teacher') && (
            <Link to='#' onClick={onClickNavigate}>
              <Typography.Text>{navigateDashboard?.text}</Typography.Text>
            </Link>
          )}
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
