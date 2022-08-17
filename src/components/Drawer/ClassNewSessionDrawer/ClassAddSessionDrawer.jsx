import './style.css';

import { Button, Checkbox, Col, Drawer, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classRoomActions from '../../../redux/class_room/class_room.action';
import { classRoomsOnlySelector } from '../../../redux/class_room/class_room.selector';

const Description = () => (
  <div style={{ marginRight: 8 }}>
    <Typography.Text italic>
      Khi tạo lớp cho khóa mới hệ thống sẽ tự động tạo lớp mới và copy danh sách
      học sinh từ các lớp ở khóa cũ. Chọn các lớp bên dưới để thực hiện copy.
    </Typography.Text>
  </div>
);

const ClassNewSessionDrawer = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const classRoomsOnly = useSelector(classRoomsOnlySelector);
  const [listClass, setListClass] = useState([]);

  const onClose = () => {
    setListClass([]);
    setVisible(false);
  };

  const onChangeCheckbox = (values) => {
    const arr = [];
    values.forEach((index) => {
      const item = classRoomsOnly[index];
      const existClass = listClass.find(
        (classExist) => classExist._id === item._id
      );
      const name = existClass ? existClass.name : item.name;
      arr.push({
        _id: item._id,
        name,
        session: item.session,
      });
    });
    setListClass(arr);
  };

  const onEditClassName = (newText, index) => {
    setListClass((classRooms) =>
      classRooms.map((classRoom, i) => {
        if (i === index) {
          return { ...classRoom, name: newText };
        }
        return classRoom;
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(classRoomActions.addNewSession(listClass));
    setVisible(false);
  };

  return (
    <Drawer
      className='add-class-session-drawer'
      title='Tạo lớp cho khóa học mới'
      width='30em'
      contentWrapperStyle={{
        maxWidth: '100vw',
      }}
      placement='right'
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={onClose}>Hủy</Button>
        </Space>
      }
    >
      {visible && (
        <Space
          direction='vertical'
          size={32}
          style={{ paddingBottom: '1.2em' }}
        >
          <Description />
          <Checkbox.Group style={{ width: '100%' }} onChange={onChangeCheckbox}>
            <Row gutter={[0, 12]}>
              {classRoomsOnly.map((classRoom, i) => (
                <Col
                  key={classRoom._id}
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xl={12}
                >
                  <Checkbox key={classRoom._id} value={i}>
                    {classRoom.name}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
          {listClass.length !== 0 && (
            <>
              {listClass.map((classItem, index) => (
                <Typography.Text
                  editable={{
                    tooltip: 'Sửa tên lớp',
                    onChange: (value) => onEditClassName(value, index),
                  }}
                >
                  {classItem.name}
                </Typography.Text>
              ))}
            </>
          )}
          <Row style={{ marginRight: 0 }}>
            <Col span={24}>
              <Button
                type='primary'
                shape='round'
                htmlType='button'
                disabled={listClass.length === 0}
                onClick={onSubmit}
              >
                Lưu
              </Button>
            </Col>
          </Row>
        </Space>
      )}
    </Drawer>
  );
};

export default ClassNewSessionDrawer;
