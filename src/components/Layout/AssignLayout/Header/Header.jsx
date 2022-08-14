import './style.css';

import { Button, Dropdown, Layout, Menu, Typography } from 'antd';
import {
  faCopy,
  faEllipsisV,
  faHome,
  faShare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import AssignDirector from '../../../AssignmentDirector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { teacherRouteConfig } from '../../../../config/route.config';
import { useNavigate } from 'react-router';

const { Header: AntdHeader } = Layout;

const dropdownActionsAssignment = (
  <Menu
    items={[
      {
        key: 'share',
        label: (
          <div className='menu-item-action'>
            <i>
              <FontAwesomeIcon icon={faShare} />
            </i>
            <Typography.Text strong type='secondary'>
              Chia sẻ bài tập
            </Typography.Text>
          </div>
        ),
      },
      {
        key: 'duplicate',
        label: (
          <div className='menu-item-action'>
            <i>
              <FontAwesomeIcon icon={faCopy} />
            </i>
            <Typography.Text strong type='secondary'>
              Nhân đôi
            </Typography.Text>
          </div>
        ),
      },
      {
        key: 'delete',
        label: (
          <div className='menu-item-action'>
            <i>
              <FontAwesomeIcon icon={faTrash} color='red' />
            </i>
            <Typography.Text strong type='danger'>
              Xóa
            </Typography.Text>
          </div>
        ),
      },
    ]}
  ></Menu>
);

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <AntdHeader className='app__header--assignManager'>
        <div className='app__header--assignManager_left'>
          <div className='app__header--assignManager_left__home'>
            <Button
              className='btn-backhome'
              onClick={() => navigate(teacherRouteConfig.assignmentStores)}
            >
              <FontAwesomeIcon icon={faHome} />
            </Button>
            <div className='assign-title'>
              <Typography.Text>Đề kiểm tra tiếng việt năm 2021</Typography.Text>
            </div>
            <div className='saving-text'>Saving...</div>
          </div>
        </div>
        <AssignDirector />
        <div className='app__header--assignManager_right'>
          <Dropdown
            placement='bottomLeft'
            arrow
            overlay={dropdownActionsAssignment}
            trigger={['click']}
          >
            <Button>
              <FontAwesomeIcon icon={faEllipsisV} />
            </Button>
          </Dropdown>
        </div>
      </AntdHeader>
    </>
  );
};

export default Header;