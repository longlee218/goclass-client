import { Layout, Typography } from 'antd';
import {
  studentRouteConfig,
  teacherRouteConfig,
} from '../../../../config/route.config';
import { useLocation, useNavigate } from 'react-router';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  const { user } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const [navigateDashboard, setNavigateDashboard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname.startsWith('/student/')) {
      if (user.roles.includes('teacher')) {
        // go to teacher dashboard
        setNavigateDashboard({
          link: teacherRouteConfig.dashboard,
          text: 'Quay lại màn Giáo Viên',
        });
      }
    }
    if (pathname.startsWith('/teacher/')) {
      if (user.roles.includes('student')) {
        // go to student dashboard
        setNavigateDashboard({
          link: studentRouteConfig.dashboard,
          text: 'Vào màn Học Sinh',
        });
      }
    }
  }, [user, pathname]);

  return (
    [teacherRouteConfig.dashboard, studentRouteConfig.dashboard].includes(
      pathname
    ) && (
      <AntFooter style={{ textAlign: 'center', height: '17rem' }}>
        {navigateDashboard && (
          <Typography.Link onClick={() => navigate(navigateDashboard.link)}>
            {navigateDashboard.text}
          </Typography.Link>
        )}
        <br />
        <br />
        <Typography.Text strong type='secondary'>
          Nền tảng Giáo Dục Số © 2022 Created by LongLe
        </Typography.Text>
      </AntFooter>
    )
  );
};

export default Footer;
