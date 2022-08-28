import { useLocation, useNavigate, useParams } from 'react-router';

import { Button } from 'antd';
import React from 'react';
import { teacherRouteConfig } from '../../config/route.config';
import { useEffect } from 'react';

const AssignDirector = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { pathname } = location;

  const onClickEdit = () => {
    const link = teacherRouteConfig.assignmentWithParam.replace(
      ':assignId',
      params.assignId
    );
    return navigate(link);
  };

  const onClickRoster = () => {
    const link = teacherRouteConfig.assignmentWithParam.replace(
      ':assignId',
      params.assignId
    );
    return navigate(link + '/roster');
  };

  const onClickViewWork = () => {
    const link = teacherRouteConfig.assignmentWithParam.replace(
      ':assignId',
      params.assignId
    );
    return navigate(link + '/watch');
  };

  return (
    <section className='app__header--assignManager_center'>
      <div className='border-button'></div>
      <Button
        onClick={onClickEdit}
        {...(/^\/teacher\/assignments\/[A-Za-z0-9]+$/.test(pathname)
          ? { type: 'primary' }
          : {})}
      >
        Chỉnh sửa
      </Button>
      <Button
        onClick={onClickRoster}
        {...(/^\/teacher\/assignments\/[A-Za-z0-9]+\/roster$/.test(pathname)
          ? { type: 'primary' }
          : {})}
      >
        Phân công
      </Button>
      <Button
        onClick={onClickViewWork}
        {...(/^\/teacher\/assignments\/[A-Za-z0-9]+\/watch$/.test(pathname)
          ? { type: 'primary' }
          : {})}
      >
        Theo dõi
      </Button>
    </section>
  );
};

export default AssignDirector;
