import './style.css';

import { Button, Layout, Typography } from 'antd';
import { faHome, faHomeLg } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const { Header: AntdHeader } = Layout;

const Header = () => {
  return (
    <>
      <AntdHeader className='app__header--assignManager'>
        <div className='app__header--assignManager_left'>
          <div className='app__header--assignManager_left__home'>
            <Button className='btn-backhome'>
              <FontAwesomeIcon icon={faHome} />
            </Button>
            <div className='assign-title'>
              <Typography.Text>Đề kiểm tra tiếng việt năm 2021</Typography.Text>
            </div>
            <div className='saving-text'>Saving...</div>
          </div>
        </div>
        <section className='app__header--assignManager_center'></section>
        <div className='app__header--assignManager_right'></div>
      </AntdHeader>
    </>
  );
};

export default Header;
