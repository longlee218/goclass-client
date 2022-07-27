import './style.css';

import { Card, Dropdown, Menu, Typography } from 'antd';
import {
  faCopy,
  faEllipsis,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import classRoomActions from '../../redux/class_room/class_room.action';
import { useDispatch } from 'react-redux';

const ActionMenu = (idClassRoom, setShowDrawer, dispatch) => {
  const onEditClassRoom = (e) => {
    dispatch(classRoomActions.find(idClassRoom));
    setShowDrawer(true);
  };

  const onDuplicateClassRoom = (e) => {
    console.log('Duplicate:::', idClassRoom);
  };

  const onDeleteClassRoom = (e) => {
    console.log('Delete:::', idClassRoom);
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
        onClick={onDeleteClassRoom}
      >
        Xóa
      </Menu.Item>
    </Menu>
  );
};

const ClassCard = ({ classRoom, setShowDrawer }) => {
  const dispatch = useDispatch();
  const { _id, name, countStudents, session } = classRoom;
  return (
    <Card
      key={_id}
      size='small'
      bordered={true}
      title={name}
      extra={
        <div className='class-card__btn'>
          <Dropdown
            overlay={ActionMenu(_id, setShowDrawer, dispatch)}
            trigger={['click']}
          >
            <em>
              <FontAwesomeIcon icon={faEllipsis} />
            </em>
          </Dropdown>
        </div>
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
  setShowDrawer: PropTypes.bool.isRequired,
};

export default ClassCard;
