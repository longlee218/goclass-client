import { Layout, Typography } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: 'center' }}>
      <Typography.Text strong type='secondary'>
        Nền tảng Giáo Dục Số © 2022 Created by LongLe
      </Typography.Text>
    </AntFooter>
  );
};

export default Footer;
