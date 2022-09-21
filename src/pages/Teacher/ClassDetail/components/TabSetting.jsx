import { Form, Switch, Typography } from 'antd';

import React from 'react';
import classRoomActions from '../../../../redux/class_room/class_room.action';
import { useDispatch } from 'react-redux';

const TabSetting = ({ classRoom }) => {
  const dispatch = useDispatch();
  const onChange = (name, value) => {
    dispatch(
      classRoomActions.updateClass(classRoom._id, {
        [name]: value,
        classRoomGroupId: classRoom.classRoomGroupId,
      })
    );
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}></div>
      <Form layout='vertical' requiredMark={false}>
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
                <Switch
                  defaultChecked={classRoom.isCanJoin}
                  onChange={(value) => onChange('isCanJoin', value)}
                  name='isCanJoin'
                />
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
                <Switch
                  defaultChecked={classRoom.isCanLeave}
                  onChange={(value) => onChange('isCanLeave', value)}
                  name='isCanLeave'
                />
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
                <Switch
                  defaultChecked={classRoom.isSendNotify}
                  onChange={(value) => onChange('isSendNotify', value)}
                  name='isSendNotify'
                />
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
                <Switch
                  defaultChecked={classRoom.isSendMail}
                  onChange={(value) => onChange('isSendMail', value)}
                  name='isSendMail'
                />
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 10 }}></div>
          <div className='d-flex flex-row align-center'>
            <div className='d-flex flex-column flex-2-1-0'>
              <Typography.Title level={5}>Đăng tin</Typography.Title>
              <Typography.Paragraph>
                Cho phép các thành viên đăng tin
              </Typography.Paragraph>
            </div>
            <div className='d-flex flex-column flex-1-1-0'>
              <div style={{ marginLeft: 'auto', marginRight: 10 }}>
                <Switch
                  defaultChecked={classRoom.isCanMakeAlert}
                  onChange={(value) => onChange('isCanMakeAlert', value)}
                  name='isCanMakeAlert'
                />
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default TabSetting;
