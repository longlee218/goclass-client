import { Button, Card, Col, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import AvatarOwner from '../../../../components/AvatarOwner/AvatarOwner';
import NotifyDrawer from '../../../../components/Drawer/NotifyDrawer/NotifyDrawer';
import React from 'react';
import classRoomActions from '../../../../redux/class_room/class_room.action';
import moment from 'moment';
import { useEffect } from 'react';
import { useState } from 'react';

moment.locale('vi');

const NotifyCard = ({ owner, content, createdAt }) => {
  return (
    <Card
      style={{ marginBottom: 20 }}
      title={
        <div className='block-header-info'>
          <div className='heading-avatar'>
            <AvatarOwner fullname={owner.fullname} src={owner.avatarUrl} />
          </div>
          <div className='heading'>
            <Typography.Text className='title'>
              {owner.fullname}
            </Typography.Text>
            <Typography.Text
              className='text-bold-gray'
              style={{ marginRight: 8 }}
            >
              -
            </Typography.Text>
            <Typography.Text className='sub-title text-bold-gray'>
              {moment(createdAt).fromNow()}
            </Typography.Text>
          </div>
        </div>
      }
      size='small'
    >
      <Typography.Paragraph>{content}</Typography.Paragraph>
    </Card>
  );
};

const TabClassNotify = ({ classRoom }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const onOpenDrawer = () => setIsOpenDrawer(true);
  const notifies = useSelector(
    (state) => state.classRoom.alert[classRoom?._id] ?? []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (classRoom) {
      dispatch(classRoomActions.getAlert(classRoom._id));
    }
  }, [dispatch, classRoom]);

  return (
    <div>
      <div
        className='d-flex gap-10 justify-flex-end '
        style={{ marginBottom: '1rem' }}
      >
        <Button type='primary' danger shape='round' onClick={onOpenDrawer}>
          Thông báo
        </Button>
      </div>
      <Row
        gutter={[32, 8]}
        style={{
          maxHeight: '65vh',
          overflowY: 'auto',
        }}
      >
        <Col span={12}>
          {notifies.map((notify) => (
            <NotifyCard
              content={notify.content}
              owner={notify.createdBy}
              createdAt={notify.createdAt}
            />
          ))}
        </Col>
        <Col span={8}>
          {/* <Timeline>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item>
              Solve initial network problems 2015-09-01
            </Timeline.Item>
            <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
            <Timeline.Item>
              Network problems being solved 2015-09-01
            </Timeline.Item>
          </Timeline> */}
        </Col>
      </Row>
      {classRoom && (
        <NotifyDrawer
          classRoom={classRoom}
          visible={isOpenDrawer}
          setVisible={setIsOpenDrawer}
        />
      )}
    </div>
  );
};

export default TabClassNotify;
