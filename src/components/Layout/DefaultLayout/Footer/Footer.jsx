import { Layout, Typography } from 'antd';
import {
  studentRouteConfig,
  teacherRouteConfig,
} from '../../../../config/route.config';
import { useLocation, useNavigate } from 'react-router';

import { useSelector } from 'react-redux';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  const { user, login } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    [teacherRouteConfig.dashboard, studentRouteConfig.dashboard].includes(
      pathname
    ) && (
      <AntFooter style={{ textAlign: 'center', height: '17rem' }}>
        <Typography.Link onClick={() => navigate(studentRouteConfig.dashboard)}>
          Vào màn học sinh
        </Typography.Link>
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
