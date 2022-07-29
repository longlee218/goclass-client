import './style.css';

import { Button, Checkbox, Col, Drawer, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';

import { classRoomsOnlySelector } from '../../redux/class_room/class_room.selector';
import { useSelector } from 'react-redux';

const ClassNewSessionDrawer = ({ visible, setVisible }) => {
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
      arr.push({
        _id: item._id,
        name: item.name,
        session: item.session,
      });
    });
    setListClass(arr);
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
        <Space direction='vertical' size={32}>
          <div style={{ marginRight: 8 }}>
            <Typography.Text italic>
              Khi tạo lớp cho khóa mới hệ thống sẽ tự động tạo lớp mới và copy
              danh sách học sinh từ các lớp ở khóa cũ. Chọn các lớp bên dưới để
              thực hiện copy.
            </Typography.Text>
          </div>
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
              {listClass.map((classItem) => (
                <Typography.Text editable>{classItem.name}</Typography.Text>
              ))}
            </>
          )}
          <Row style={{ marginRight: 0 }}>
            <Col span={24}>
              <Button
                type='primary'
                className='btn-success'
                shape='round'
                htmlType='submit'
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
