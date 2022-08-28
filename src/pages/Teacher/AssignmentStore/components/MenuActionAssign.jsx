import {
  faCopy,
  faEye,
  faTrash,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from 'antd';
import React from 'react';
import alertActions from '../../../../redux/alert/alert.action';
import assignmentService from '../../../../services/assignment.service';
import { useDispatch } from 'react-redux';

const MenuActionAssign = ({ currentAssign, fetchData }) => {
  const dispatch = useDispatch();

  const onDuplicateAssign = () => {
    dispatch(alertActions.loading());
    assignmentService
      .duplicate(currentAssign._id)
      .then(() => {
        dispatch(alertActions.success());
        fetchData();
      })
      .catch((error) => dispatch(alertActions.error(error.message)));
  };

  const onDeleteAssign = () => {
    dispatch(alertActions.loading());
    assignmentService
      .delete(currentAssign._id)
      .then(() => {
        dispatch(alertActions.success());
        fetchData();
      })
      .catch((error) => dispatch(alertActions.error(error.message)));
  };

  return (
    <Menu>
      <Menu.Item
        key='watch'
        icon={<FontAwesomeIcon icon={faEye} />}
        // onClick={}
      >
        Theo dõi
      </Menu.Item>
      <Menu.Item
        key='roster'
        icon={<FontAwesomeIcon icon={faUserPlus} />}
        // onClick={}
      >
        Phân công
      </Menu.Item>
      <Menu.Item
        key='duplicate'
        icon={<FontAwesomeIcon icon={faCopy} />}
        onClick={onDuplicateAssign}
      >
        Nhân đôi
      </Menu.Item>
      <Menu.Item
        key='delete'
        icon={<FontAwesomeIcon icon={faTrash} />}
        style={{ color: 'red' }}
        onClick={onDeleteAssign}
      >
        Xóa bài tập
      </Menu.Item>
    </Menu>
  );
};

export default MenuActionAssign;
