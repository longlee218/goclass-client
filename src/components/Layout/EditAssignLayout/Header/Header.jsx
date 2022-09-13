import { Button, Layout, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import assignActions from '../../../../redux/assign/assign.action';
import { assignSelector } from '../../../../redux/assign/assign.selector';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { teacherRouteConfig } from '../../../../config/route.config';
import { useCallback } from 'react';

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

  const onClickBackHome = useCallback(() => {
    const link = teacherRouteConfig.assignmentWithParam.replace(
      ':assignId',
      params.assignId
    );
    return navigate(link);
  }, [navigate, params.assignId]);

  return (
    <AntdHeader className='app__header--assignManager'>
      <div className='app__header--assignManager_left'>
        <div className='app__header--assignManager_left__home'>
          <Button className='btn-backhome' onClick={onClickBackHome}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
          {/* <div className='saving-text'>Saving...</div> */}
          <div className='saving-text'></div>
        </div>
      </div>
      <div className='assign-title'>
        <Typography.Title level={5} style={{ fontWeight: 600 }}>
          CHỈNH SỬA:&nbsp;&nbsp;{assignment?.name?.toUpperCase()}
        </Typography.Title>
      </div>
      <div className='app__header--assignManager_right'></div>
    </AntdHeader>
  );
};

export default Header;
