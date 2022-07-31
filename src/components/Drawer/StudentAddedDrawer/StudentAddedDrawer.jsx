import './style.css';

import { Button, Drawer, Space } from 'antd';

import React from 'react';

const StudentAddedDrawer = ({ visible, setVisible }) => {
  const onClose = () => {
    setVisible(false);
  };
  return (
    <Drawer
      className='add-student-drawer'
      title={'Thêm học sinh'}
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
    ></Drawer>
  );
};

export default StudentAddedDrawer;
