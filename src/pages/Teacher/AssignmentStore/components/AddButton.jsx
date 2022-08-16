import { Button, Dropdown, Menu, Typography } from 'antd';
import { faFilePen, faStore } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import alertActions from '../../../../redux/alert/alert.action';
import assignmentService from '../../../../services/assignment.service';
import { teacherRouteConfig } from '../../../../config/route.config';
import { useDispatch } from 'react-redux';

const MenuAddDropDown = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onCreateBlankAssign = () => {
    const fatherId = params.fatherId;
    dispatch(alertActions.loading());
    assignmentService
      .initBlankAssign(fatherId)
      .then((assignment) => {
        dispatch(alertActions.success());
        return navigate(
          teacherRouteConfig.assignmentWithParam.replace(':id', assignment._id)
        );
      })
      .catch((error) => dispatch(alertActions.error(error.message)));
  };
  const onCreateFromLib = () => {};
  return (
    <Menu
      items={[
        {
          key: 'init-blank',
          label: (
            <div className='menu-item-action' onClick={onCreateBlankAssign}>
              <i>
                <FontAwesomeIcon icon={faFilePen} />
              </i>
              <Typography.Text strong type='secondary'>
                Tạo mới
              </Typography.Text>
            </div>
          ),
        },
        {
          key: 'creat-from-lib',
          label: (
            <div className='menu-item-action' onClick={onCreateFromLib}>
              <i>
                <FontAwesomeIcon icon={faStore} />
              </i>
              <Typography.Text strong type='secondary'>
                Tạo từ thư viện
              </Typography.Text>
            </div>
          ),
        },
      ]}
    />
  );
};

const AddButton = () => {
  return (
    <Dropdown
      placement='bottom'
      arrow
      overlay={<MenuAddDropDown />}
      trigger={['click']}
    >
      <Button
        shape='round'
        type='primary'
        danger
        className='wrapp-text-bold btn-warning'
      >
        Tạo bài tập
      </Button>
    </Dropdown>
  );
};

export default AddButton;
