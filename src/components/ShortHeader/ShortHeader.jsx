import { Button, Layout, Typography } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';

const { Header: AntdHeader } = Layout;
const ShortHeader = ({ title = '', subTitle = '' }) => {
  const navigate = useNavigate();
  return (
    <AntdHeader className='app__header--assignManager'>
      <div className='app__header--assignManager_left'>
        <div className='app__header--assignManager_left__home'>
          <Button className='btn-backhome' onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
          <div className='saving-text'>
            <Typography.Text>{subTitle}</Typography.Text>
          </div>
        </div>
      </div>
      <div className='assign-title'>
        <Typography.Title level={4} style={{ fontWeight: 600 }}>
          {title}
        </Typography.Title>
      </div>
      <div className='app__header--assignManager_right'></div>
    </AntdHeader>
  );
};

export default ShortHeader;
