import { Button, Card, Switch } from 'antd';
import React, { useState } from 'react';
import {
  faCheck,
  faClose,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Roster = ({ item }) => {
  const [heightOfCard, setHeightOfCard] = useState(0);

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
          &nbsp;&nbsp;{item.name}
        </div>
      }
      size='small'
      hoverable
      extra={
        <Button shape='round'>
          <FontAwesomeIcon icon={faEllipsisV} size='lg' />
        </Button>
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
          <div className='d-flex gap-10 justify-content-between flex-wrap'>
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
                defaultChecked
              />
            </div>
            <div>
              <label>Chỉ xem </label>
              <Switch
                checkedChildren={<FontAwesomeIcon icon={faCheck} />}
                unCheckedChildren={<FontAwesomeIcon icon={faClose} />}
                defaultChecked
              />
            </div>
            <div>
              <label>Cho giúp đỡ </label>
              <Switch
                checkedChildren={<FontAwesomeIcon icon={faCheck} />}
                unCheckedChildren={<FontAwesomeIcon icon={faClose} />}
                defaultChecked
              />
            </div>
            <div>
              <label>Cho phép hỏi </label>
              <Switch
                checkedChildren={<FontAwesomeIcon icon={faCheck} />}
                unCheckedChildren={<FontAwesomeIcon icon={faClose} />}
                defaultChecked
              />
            </div>
          </div>

          <div className='d-flex gap-8'>
            {/* <Button shape='round'>Sửa</Button> */}
            <Button shape='round'>Theo dõi</Button>
            {/* <Button shape='round' danger>
              Xóa
            </Button> */}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Roster;
