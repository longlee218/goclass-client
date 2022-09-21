import {
  Button,
  Card,
  Col,
  Dropdown,
  Menu,
  Modal,
  Row,
  Space,
  Typography,
} from 'antd';
import {
  faEllipsis,
  faFileLines,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import AvatarOwner from '../../../../components/AvatarOwner/AvatarOwner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NotifyDrawer from '../../../../components/Drawer/NotifyDrawer/NotifyDrawer';
import React from 'react';
import classRoomActions from '../../../../redux/class_room/class_room.action';
import moment from 'moment';
import { useEffect } from 'react';
import { useState } from 'react';

moment.locale('vi');

const ActionMenu = ({
  classRoomId,
  setIsOpenDrawer,
  getMyAlert,
  clearMyAlert,
}) => {
  const dispatch = useDispatch();

  const onEditClassRoom = (e) => {
    e.domEvent.stopPropagation();
    getMyAlert();
    setIsOpenDrawer(true);
  };

  const onDeleteClassRoomCofirm = (e) => {
    e.domEvent.stopPropagation();
    Modal.confirm({
      title: 'Xác nhận',
      content: 'Bạn có chắc muốn xóa thông báo ?',
      okText: 'Tiếp tục',
      cancelText: 'Hủy',
      okButtonProps: {
        danger: true,
      },
      onCancel: () => {
        clearMyAlert();
      },
      onOk: () => {
        const id = getMyAlert();
        dispatch(classRoomActions.deleteAlert(id)).then(() => {
          clearMyAlert();
          dispatch(classRoomActions.getAlert(classRoomId));
        });
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
        Sửa
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

const NotifyCard = ({ notify, setIsOpenDrawer, setCurrentAlert }) => {
  const getMyAlert = () => {
    setCurrentAlert({
      _id: notify._id,
      content: notify.content,
      attachments: notify?.attachments || [],
    });
    return notify._id;
  };

  const clearMyAlert = () => {
    setCurrentAlert(null);
  };

  const onDownloadFile = (link) => {
    window.open(link, '_blank');
  };

  return (
    <Card
      style={{
        marginBottom: 20,
        boxShadow:
          '0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%)',
      }}
      title={
        <div className='block-header-info'>
          <div className='heading-avatar'>
            <AvatarOwner
              fullname={notify.createdBy?.fullname || ''}
              src={notify.createdBy?.avatarUrl || ''}
            />
          </div>
          <div className='heading'>
            <Typography.Text className='title'>
              {notify.createdBy?.fullname}
            </Typography.Text>
            <Typography.Text
              className='text-bold-gray'
              style={{ marginRight: 8 }}
            >
              -
            </Typography.Text>
            <Typography.Text className='sub-title text-bold-gray'>
              {moment(notify.createdAt).fromNow()}
            </Typography.Text>
          </div>
        </div>
      }
      size='small'
      extra={
        <Dropdown
          destroyPopupOnHide
          arrow
          overlay={ActionMenu({
            classRoomId: notify.classRoomId,
            setIsOpenDrawer,
            getMyAlert,
            clearMyAlert,
          })}
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
      }
    >
      {notify.content.split('\n').map((content) => (
        <Typography.Paragraph>{content}</Typography.Paragraph>
      ))}
      {notify.attachments.length !== 0 && (
        <>
          <p>
            <i className='text-bold-gray'>
              Đính kèm ({notify.attachments.length})
            </i>
          </p>
          <div className='d-flex gap-10 flex-column'>
            {notify.attachments.map(({ originalname, dest }) => (
              <Space
                className='hoverable'
                style={{
                  border: '1px solid #d9d9d9',
                  borderRadius: 2,
                  padding: '4px 5px',
                  flex: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(22, 24, 35, 0.05)',
                  },
                }}
                onClick={() =>
                  onDownloadFile(process.env.REACT_APP_BACKEND_URL + dest)
                }
              >
                <div style={{ padding: 10 }}>
                  <FontAwesomeIcon
                    icon={faFileLines}
                    style={{ color: 'var(--danger)' }}
                    size='3x'
                  />
                </div>
                <div className='block-body-content' style={{ marginTop: 12 }}>
                  <Typography.Paragraph>{originalname}</Typography.Paragraph>
                </div>
              </Space>
            ))}
          </div>
        </>
      )}
    </Card>
  );
};

const TabClassNotify = ({ classRoom }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const onOpenDrawer = () => setIsOpenDrawer(true);
  const [currentAlert, setCurrentAlert] = useState(null);

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
        <Col xs={24} sm={24} md={18} lg={14}>
          {notifies.length === 0
            ? 'Không có dữ liệu'
            : notifies.map((notify) => (
                <NotifyCard
                  notify={notify}
                  setIsOpenDrawer={setIsOpenDrawer}
                  setCurrentAlert={setCurrentAlert}
                />
              ))}
        </Col>
      </Row>
      {classRoom && (
        <NotifyDrawer
          classRoom={classRoom}
          visible={isOpenDrawer}
          setVisible={setIsOpenDrawer}
          alert={currentAlert}
          setAlert={setCurrentAlert}
        />
      )}
    </div>
  );
};

export default TabClassNotify;
