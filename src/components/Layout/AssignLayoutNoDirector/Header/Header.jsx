import './style.css';

import { Button, Layout, Typography } from 'antd';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import assignActions from '../../../../redux/assign/assign.action';
import { assignSelector } from '../../../../redux/assign/assign.selector';
import { teacherRouteConfig } from '../../../../config/route.config';
import { useEffect } from 'react';

const { Header: AntdHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const assignment = useSelector(assignSelector);

  useEffect(() => {
    const id = params.assignId;
    dispatch(assignActions.findAssignment(id));
  }, [params, dispatch]);

  return (
    <AntdHeader className='app__header--assignManager'>
      <div className='app__header--assignManager_left'>
        <div className='app__header--assignManager_left__home'>
          <Button className='btn-backhome' onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faHome} />
          </Button>
          <div className='assign-title'>
            <Typography.Text>{assignment?.name}</Typography.Text>
          </div>
          {/* <div className='saving-text'>Saving...</div> */}
          <div className='saving-text'></div>
        </div>
      </div>
      <div className='app__header--assignManager_right'></div>
    </AntdHeader>
  );
};

export default Header;
