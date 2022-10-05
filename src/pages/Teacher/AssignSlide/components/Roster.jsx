import {
  Button,
  Card,
  Col,
  Collapse,
  Dropdown,
  Menu,
  Modal,
  Row,
  Switch,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import {
  faCheck,
  faClose,
  faEllipsisV,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import alertActions from '../../../../redux/alert/alert.action';
import examService from '../../../../services/exam.service';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const { Panel } = Collapse;
const statusToText = (status) => {
  const statusObj = {
    ready: 'Sẵn sàng...',
    online: 'Đang thi',
    finished: 'Kết thúc',
  };
  return statusObj[status] ?? '';
};

const DropdownActionsRoster = ({
  item,
  setTrigger,
  onOpenDrawer,
  setRosterGroup,
}) => {
  const dispatch = useDispatch();

  const onUpdateRosterGroup = () => {
    setRosterGroup(item);
    onOpenDrawer();
  };

  const onDeleteRosterGroup = () => {
    Modal.confirm({
      title: 'Xác nhận',
      content:
        item.status === 'online' ? (
          <>
            Nhóm <b>{item.name}</b> đang Online, việc xóa có thể ảnh hưởng tới
            quá trình làm bài của học sinh. Bạn có chắc chắn muốn xóa ?
          </>
        ) : (
          <>
            Bạn có chắc muốn xóa nhóm <b>{item.name}</b> ?
          </>
        ),
      okText: 'Tiếp tục',
      cancelText: 'Hủy',
      okButtonProps: {
        danger: true,
      },
      onOk: () => {
        dispatch(alertActions.loading());
        examService
          .deleteRosterGroup(item._id)
          .then(() => {
            setTrigger((prev) => !prev);
            dispatch(alertActions.success());
          })
          .catch((error) => dispatch(alertActions.error(error.message)));
      },
    });
  };
  return (
    <Menu>
      <Menu.Item
        key='edit'
        icon={<FontAwesomeIcon icon={faPen} />}
        onClick={onUpdateRosterGroup}
      >
        Chi tiết
      </Menu.Item>
      <Menu.Item
        key='delete'
        icon={<FontAwesomeIcon icon={faTrash} />}
        style={{ color: 'red' }}
        onClick={onDeleteRosterGroup}
      >
        Xóa nhóm
      </Menu.Item>
    </Menu>
  );
};

const Roster = ({
  item,
  setTrigger,
  onOpenDrawer,
  setRosterGroup,
  assignmentId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinishRoster = (e) => {
    e.preventDefault();
    dispatch(alertActions.loading());
    examService
      .updateRosterGroup(item._id, { status: 'finished' })
      .then(() => {
        setTrigger((prev) => !prev);
        dispatch(alertActions.success());
      })
      .catch((error) => dispatch(alertActions.error(error.message)));
  };

  const onChangeSwitch = (e) => {
    console.log(e);
  };

  return (
    <Collapse accordion>
      <Panel
        header={
          <div>
            {item.name}
            <Typography.Text
              code
              {...(item?.status === 'finished' && { type: 'success' })}
              style={{ marginLeft: 10 }}
            >
              {statusToText(item?.status)}
            </Typography.Text>
          </div>
        }
        extra={
          <Dropdown
            placement='bottomLeft'
            arrow
            overlay={
              <DropdownActionsRoster
                item={item}
                setTrigger={setTrigger}
                onOpenDrawer={onOpenDrawer}
                setRosterGroup={setRosterGroup}
              />
            }
            trigger={['click']}
          >
            <Button shape='round' onClick={(e) => e.stopPropagation()}>
              <FontAwesomeIcon icon={faEllipsisV} size='lg' />
            </Button>
          </Dropdown>
        }
      >
        {item.status !== 'finished' ? (
          <>
            <Row gutter={[16, 24]}>
              <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <label>Xem điểm&nbsp;</label>
                <Switch
                  checkedChildren={<FontAwesomeIcon icon={faCheck} />}
                  unCheckedChildren={<FontAwesomeIcon icon={faClose} />}
                  defaultChecked={item?.iShowResult}
                  name='isShowResult'
                  onChange={onChangeSwitch}
                />
              </Col>
              <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <label>Ẩn bài&nbsp;</label>
                <Switch
                  checkedChildren={<FontAwesomeIcon icon={faCheck} />}
                  unCheckedChildren={<FontAwesomeIcon icon={faClose} />}
                  defaultChecked={item?.isHide}
                  name='isHide'
                  onChange={onChangeSwitch}
                />
              </Col>
              <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <label>Chỉ xem&nbsp;</label>
                <Switch
                  checkedChildren={<FontAwesomeIcon icon={faCheck} />}
                  unCheckedChildren={<FontAwesomeIcon icon={faClose} />}
                  defaultChecked={item?.isBlock}
                  name='isBlock'
                  onChange={onChangeSwitch}
                />
              </Col>
              <Col xs={12} sm={8} md={6} lg={6} xl={6}>
                <label>Trợ giúp&nbsp;</label>
                <Switch
                  checkedChildren={<FontAwesomeIcon icon={faCheck} />}
                  unCheckedChildren={<FontAwesomeIcon icon={faClose} />}
                  defaultChecked={item?.isCanHelp}
                  name='isCanHelp'
                  onChange={onChangeSwitch}
                />
              </Col>
            </Row>
            <div className='d-flex gap-8' style={{ marginTop: 40 }}>
              <Button
                shape='round'
                onClick={() => {
                  navigate(
                    `/teacher/assignments/${assignmentId}/watch/${item._id}`
                  );
                }}
              >
                Theo dõi
              </Button>
              {item.status !== 'finished' && (
                <Button shape='round' danger onClick={onFinishRoster}>
                  Kết thúc
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            <Typography.Paragraph>Nhóm đã kết thúc</Typography.Paragraph>
            <div className='d-flex gap-8' style={{ marginTop: 40 }}>
              <Button shape='round'>Xem lại</Button>
            </div>
          </>
        )}
      </Panel>
    </Collapse>
  );
};

export default Roster;
