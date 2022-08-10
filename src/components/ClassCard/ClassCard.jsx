import './style.css';

import { Card, Dropdown, Menu, Modal, Typography } from 'antd';
import {
  faCopy,
  faEllipsis,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import alertActions from '../../redux/alert/alert.action';
import classRoomActions from '../../redux/class_room/class_room.action';
import classRoomService from '../../services/classRoom.service';
import { teacherRouteConfig } from '../../config/route.config';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ActionMenu = (idClassRoom, setShowDrawer, dispatch) => {
  const onEditClassRoom = (e) => {
    e.domEvent.stopPropagation();
    dispatch(classRoomActions.find(idClassRoom));
    setShowDrawer(true);
  };

  const onDuplicateClassRoom = (e) => {
    e.domEvent.stopPropagation();
    dispatch(classRoomActions.duplicate(idClassRoom));
  };

  const onDeleteClassRoomCofirm = (e) => {
    e.domEvent.stopPropagation();
    Modal.confirm({
      title: 'Xác nhận',
      content: 'Bạn có chắc muốn xóa lớp học ?',
      okText: 'Tiếp tục',
      cancelText: 'Hủy',
      okButtonProps: {
        danger: true,
      },
      onOk: () => {
        dispatch(alertActions.loading());
        classRoomService
          .delete(idClassRoom)
          .then(() => {
            dispatch(classRoomActions.delete(idClassRoom));
            dispatch(alertActions.success('Xóa thành công!'));
          })
          .catch((error) => dispatch(alertActions.error(error.message)));
      },
    });
  };

  return (
    <Menu mode='horizontal'>
      <Menu.Item
        key='edit'
        icon={<FontAwesomeIcon icon={faPen} />}
        onClick={onEditClassRoom}
      >
        Sửa lớp
      </Menu.Item>
      <Menu.Item
        key='duplicate'
        icon={<FontAwesomeIcon icon={faCopy} />}
        onClick={onDuplicateClassRoom}
      >
        Nhân bản
      </Menu.Item>
      <Menu.Item
        key='delete'
        icon={<FontAwesomeIcon icon={faTrash} />}
        style={{ color: 'red' }}
        onClick={onDeleteClassRoomCofirm}
      >
        Xóa
      </Menu.Item>
    </Menu>
  );
};

const ClassCard = ({ classRoom, setShowDrawer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id, name, countStudents, session } = classRoom;
  return (
    <Card
      hoverable
      key={_id}
      size='small'
      bordered={true}
      title={name}
      onClick={(e) => {
        e.preventDefault();
        navigate(teacherRouteConfig.myClass + '/' + _id);
      }}
      extra={
        <Dropdown
          destroyPopupOnHide
          arrow
          overlay={ActionMenu(_id, setShowDrawer, dispatch)}
          trigger={['click']}
          children={
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <FontAwesomeIcon icon={faEllipsis} size='lg' />
            </div>
          }
        />
      }
    >
      <div className='d-flex justify-content-between'>
        <Typography.Text strong>Sĩ số: {countStudents}</Typography.Text>
        <Typography.Text type='secondary' style={{ fontSize: 11 }}>
          Năm học: {session}
        </Typography.Text>
      </div>
    </Card>
  );
};

ClassCard.propTypes = {
  classRoom: PropTypes.object.isRequired,
  setShowDrawer: PropTypes.func.isRequired,
};

export default ClassCard;
