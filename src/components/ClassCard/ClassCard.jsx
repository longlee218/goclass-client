import './style.css';

import { Button, Card, Dropdown, Menu, Modal, Typography } from 'antd';
import React, { useState } from 'react';
import {
  faCopy,
  faEllipsis,
  faGear,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {
  studentRouteConfig,
  teacherRouteConfig,
} from '../../config/route.config';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import alertActions from '../../redux/alert/alert.action';
import classRoomActions from '../../redux/class_room/class_room.action';
import classRoomService from '../../services/classRoom.service';
import { useAppContext } from '../../hooks/useAppContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ActionMenu = (
  classRoom,
  setShowAddDrawer,
  setShowSettingDrawer,
  dispatch
) => {
  const { screenRole } = useAppContext();
  const onEditClassRoom = (e) => {
    e.domEvent.stopPropagation();
    dispatch(classRoomActions.find(classRoom._id));
    setShowAddDrawer(true);
  };

  const onSettingClassRoom = (e) => {
    e.domEvent.stopPropagation();
    dispatch(classRoomActions.find(classRoom._id));
    setShowSettingDrawer(true);
  };

  const onDuplicateClassRoom = (e) => {
    e.domEvent.stopPropagation();
    dispatch(classRoomActions.duplicate(classRoom._id));
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
          .delete(classRoom._id)
          .then(() => {
            dispatch(classRoomActions.delete(classRoom._id));
            dispatch(alertActions.success('Xóa thành công!'));
          })
          .catch((error) => dispatch(alertActions.error(error.message)));
      },
    });
  };

  if (screenRole === 'teacher') {
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
          key='setting'
          icon={<FontAwesomeIcon icon={faGear} />}
          onClick={onSettingClassRoom}
        >
          Cài đặt
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
  }

  if (screenRole === 'student') {
    return (
      <Menu mode='horizontal'>
        {classRoom.isCanLeave && (
          <Menu.Item
            key='leave'
            icon={<FontAwesomeIcon icon={faTrash} />}
            style={{ color: 'red' }}
            onClick={onDeleteClassRoomCofirm}
          >
            Rời khỏi lớp
          </Menu.Item>
        )}
      </Menu>
    );
  }
};

const ClassCard = ({ classRoom, setShowAddDrawer, setShowSettingDrawer }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { screenRole } = useAppContext();
  const [navigateLink, setNavigateLink] = useState('');
  const { _id, name, countStudents, session, color } = classRoom;

  useEffect(() => {
    if (screenRole === 'teacher') {
      setNavigateLink(teacherRouteConfig.myClass + '/' + _id);
    }
    if (screenRole === 'student') {
      setNavigateLink(studentRouteConfig.myClass + '/' + _id);
    }
  }, [screenRole, _id]);

  return (
    <Card
      hoverable
      key={_id}
      size='small'
      bordered={true}
      title={
        <div className='d-flex align-center'>
          {color && (
            <div
              className='color-circle'
              style={{ backgroundColor: color, marginRight: 10 }}
            />
          )}
          <Typography>{name}</Typography>
        </div>
      }
      onClick={(e) => {
        e.preventDefault();
        navigate(navigateLink);
      }}
      // extra={
      //   <Dropdown
      //     destroyPopupOnHide
      //     arrow
      //     overlay={ActionMenu(
      //       classRoom,
      //       setShowAddDrawer,
      //       setShowSettingDrawer,
      //       dispatch
      //     )}
      //     trigger={['click']}
      //     children={
      //       <div
      //         onClick={(e) => {
      //           e.stopPropagation();
      //         }}
      //       >
      //         <Button type='text'>
      //           <FontAwesomeIcon icon={faEllipsis} size='lg' />
      //         </Button>
      //       </div>
      //     }
      //   />
      // }
      {...(screenRole === 'teacher'
        ? {
            extra: (
              <Dropdown
                destroyPopupOnHide
                arrow
                overlay={ActionMenu(
                  classRoom,
                  setShowAddDrawer,
                  setShowSettingDrawer,
                  dispatch
                )}
                trigger={['click']}
                children={
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Button type='text'>
                      <FontAwesomeIcon icon={faEllipsis} size='lg' />
                    </Button>
                  </div>
                }
              />
            ),
          }
        : {})}
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
