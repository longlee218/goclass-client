import { Button, Card, Dropdown, Menu, Switch, Typography } from 'antd';
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
import moment from 'moment';
import { useDispatch } from 'react-redux';

const statusToText = (status) => {
  const statusObj = {
    ready: 'Đang chờ...',
    online: 'Đang thi',
    finished: 'Kết thúc',
  };
  return statusObj[status] ?? '';
};

const dropdownActionsRoster = (
  <Menu>
    <Menu.Item key='edit' icon={<FontAwesomeIcon icon={faPen} />}>
      Sửa nhóm
    </Menu.Item>
    <Menu.Item
      key='delete'
      icon={<FontAwesomeIcon icon={faTrash} />}
      style={{ color: 'red' }}
    >
      Xóa nhóm
    </Menu.Item>
  </Menu>
);
const Roster = ({ item, setTrigger }) => {
  const dispatch = useDispatch();
  const [heightOfCard, setHeightOfCard] = useState(0);

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

  return (
    <Card
      title={
        <div
          style={{
            padding: '8px 0',
            color: heightOfCard !== 0 ? 'var(--danger)' : '#000',
            fontWeight: heightOfCard !== 0 ? 'bold' : 'normal',
          }}
          onClick={() => {
            if (heightOfCard === 0) {
              setHeightOfCard(180);
            } else {
              setHeightOfCard(0);
            }
          }}
        >
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
      size='small'
      hoverable
      extra={
        <Dropdown
          placement='bottomLeft'
          arrow
          overlay={dropdownActionsRoster}
          trigger={['click']}
        >
          <Button shape='round'>
            <FontAwesomeIcon icon={faEllipsisV} size='lg' />
          </Button>
        </Dropdown>
        // <>{item?.createdAt ? moment(item.createdAt).format('DD/MM/YYYY')}</>
      }
      bodyStyle={{ padding: 0 }}
    >
      <div
        style={{
          transition: 'height .3s cubic-bezier(0.4,0,0.2,1)',
          height: heightOfCard,
          maxHeight: 200,
        }}
      >
        <div
          style={{
            padding: 12,
            display: heightOfCard ? 'flex' : 'none',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          <div className='d-flex gap-15'>
            <p>Có 12 học sinh đang làm</p>
            <p>Có 5 học sinh đã nộp</p>
            <p>Có 2 học sinh xin trợ giúp</p>
          </div>
          <div className='d-flex gap-8 justify-content-between flex-wrap'>
            <div>
              <label>Xem kết quả </label>
              <Switch
                checkedChildren={<FontAwesomeIcon icon={faCheck} />}
                unCheckedChildren={<FontAwesomeIcon icon={faClose} />}
                defaultChecked
              />
            </div>
            <div>
              <label>Ẩn </label>
              <Switch
                checkedChildren={<FontAwesomeIcon icon={faCheck} />}
                unCheckedChildren={<FontAwesomeIcon icon={faClose} />}
                defaultChecked={item?.isBlock}
              />
            </div>
            <div>
              <label>Chỉ xem </label>
              <Switch
                checkedChildren={<FontAwesomeIcon icon={faCheck} />}
                unCheckedChildren={<FontAwesomeIcon icon={faClose} />}
                defaultChecked={item?.isHide}
              />
            </div>
            <div>
              <label>Trộn đề</label>
              <Switch
                checkedChildren={<FontAwesomeIcon icon={faCheck} />}
                unCheckedChildren={<FontAwesomeIcon icon={faClose} />}
                defaultChecked={item?.isSuffer}
              />
            </div>
            <div>
              <label>Trợ giúp</label>
              <Switch
                checkedChildren={<FontAwesomeIcon icon={faCheck} />}
                unCheckedChildren={<FontAwesomeIcon icon={faClose} />}
                defaultChecked={item?.isCanHelp}
              />
            </div>
          </div>
          <div className='d-flex gap-8'>
            <Button shape='round'>Theo dõi</Button>
            <Button shape='round' danger onClick={onFinishRoster}>
              Kết thúc
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Roster;
