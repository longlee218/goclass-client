import { Layout, Typography } from 'antd';
import {
  studentRouteConfig,
  teacherRouteConfig,
} from '../../../../config/route.config';

import { useLocation } from 'react-router';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  const { pathname } = useLocation();
  return (
    [teacherRouteConfig.dashboard, studentRouteConfig.dashboard].includes(
      pathname
    ) && (
      <AntFooter style={{ textAlign: 'center' }}>
        <Typography.Text strong type='secondary'>
          Nền tảng Giáo Dục Số © 2022 Created by LongLe
        </Typography.Text>
      </AntFooter>
    )
  );
};

export default Footer;
