import { Form, Switch, Typography } from 'antd';

import DrawerBase from '../DrawerBase';
import React from 'react';

const ClassSettingDrawer = ({ visible, setVisible }) => {
  const onClose = () => {
    setVisible(false);
  };
  const onFinish = () => {};

  return (
    <DrawerBase
      key='setting-class-drawer'
      className='setting-class-drawer'
      title={'Cài đặt'}
      onClose={onClose}
      visible={visible}
    >
      {visible && (
        <Form layout='vertical' requiredMark={false} onFinish={onFinish}>
          <div className='d-flex flex-column'>
            <div className='d-flex flex-row align-center'>
              <div className='d-flex flex-column flex-2-1-0'>
                <Typography.Title level={5}>Tự do tham gia</Typography.Title>
                <Typography.Paragraph>
                  Bất kỳ học sinh nào có mã lớp của bạn đều có thể tham gia
                </Typography.Paragraph>
              </div>
              <div className='d-flex flex-column flex-1-1-0'>
                <div style={{ marginLeft: 'auto', marginRight: 10 }}>
                  <Switch defaultChecked onChange={() => {}} />
                </div>
              </div>
            </div>
            <div style={{ marginBottom: 10 }}></div>

            <div className='d-flex flex-row align-center'>
              <div className='d-flex flex-column flex-2-1-0'>
                <Typography.Title level={5}>Rời lớp học</Typography.Title>
                <Typography.Paragraph>
                  Cho phép học sinh có thể tự động rời khỏi lớp
                </Typography.Paragraph>
              </div>
              <div className='d-flex flex-column flex-1-1-0'>
                <div style={{ marginLeft: 'auto', marginRight: 10 }}>
                  <Switch defaultChecked onChange={() => {}} />
                </div>
              </div>
            </div>
            <div style={{ marginBottom: 10 }}></div>

            <div className='d-flex flex-row align-center'>
              <div className='d-flex flex-column flex-2-1-0'>
                <Typography.Title level={5}>Thông báo</Typography.Title>
                <Typography.Paragraph>
                  Thông báo mọi hoạt động của lớp tới các thành viên
                </Typography.Paragraph>
              </div>
              <div className='d-flex flex-column flex-1-1-0'>
                <div style={{ marginLeft: 'auto', marginRight: 10 }}>
                  <Switch defaultChecked onChange={() => {}} />
                </div>
              </div>
            </div>
            <div style={{ marginBottom: 6 }}></div>

            <div className='d-flex flex-row align-center pl-10'>
              <div className='d-flex flex-column flex-2-1-0'>
                <Typography.Title level={5}>Gửi mail</Typography.Title>
                <Typography.Paragraph>
                  Gửi qua E-mail cho mọi thành viên
                </Typography.Paragraph>
              </div>
              <div className='d-flex flex-column flex-1-1-0'>
                <div style={{ marginLeft: 'auto', marginRight: 10 }}>
                  <Switch defaultChecked onChange={() => {}} />
                </div>
              </div>
            </div>
            <div style={{ marginBottom: 10 }}></div>

            <div className='d-flex flex-row align-center'>
              <div className='d-flex flex-column flex-2-1-0'>
                <Typography.Title level={5}>Tài liệu</Typography.Title>
                <Typography.Paragraph>
                  Cho phép xem, upload các tài liệu cần thiết trong lớp của bạn
                </Typography.Paragraph>
              </div>
              <div className='d-flex flex-column flex-1-1-0'>
                <div style={{ marginLeft: 'auto', marginRight: 10 }}>
                  <Switch defaultChecked onChange={() => {}} />
                </div>
              </div>
            </div>
            <div style={{ marginBottom: 6 }}></div>

            <div className='d-flex flex-row align-center pl-10'>
              <div className='d-flex flex-column flex-2-1-0'>
                <Typography.Title level={5}>Xem</Typography.Title>
                <Typography.Paragraph>
                  Cho phép xem tài liệu
                </Typography.Paragraph>
              </div>
              <div className='d-flex flex-column flex-1-1-0'>
                <div style={{ marginLeft: 'auto', marginRight: 10 }}>
                  <Switch defaultChecked onChange={() => {}} />
                </div>
              </div>
            </div>
            <div style={{ marginBottom: 6 }}></div>

            <div className='d-flex flex-row align-center pl-10'>
              <div className='d-flex flex-column flex-2-1-0'>
                <Typography.Title level={5}>Upload</Typography.Title>
                <Typography.Paragraph>
                  Cho phép upload tài liệu
                </Typography.Paragraph>
              </div>
              <div className='d-flex flex-column flex-1-1-0'>
                <div style={{ marginLeft: 'auto', marginRight: 10 }}>
                  <Switch defaultChecked onChange={() => {}} />
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </DrawerBase>
  );
};

export default ClassSettingDrawer;
