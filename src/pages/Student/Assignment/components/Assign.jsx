import { Button, Card, Space, Typography } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import examService from '../../../../services/exam.service';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Assign = ({
  _id,
  name,
  assignWork,
  desc,
  groupName,
  rosterGroupId,
  onlyView,
}) => {
  const [loading, setLoading] = useState(false);
  const onClickJoinAssign = (e) => {
    setLoading(true);
    examService
      .joinAssignment(_id, rosterGroupId)
      .then((data) => {
        const link = data.link;
        window.location.href = link;
      })
      .finally(() => setLoading(false));
  };

  return (
    <Card size='small' hoverable key={_id}>
      <Space>
        <div className='block-body-status'>
          <FontAwesomeIcon
            icon={faFileLines}
            style={{
              color: onlyView ? 'var(--success)' : 'var(--danger)',
            }}
            size='4x'
          />
        </div>
        <div className='block-body-content'>
          <Typography.Title level={5}>
            {name} - {groupName}
          </Typography.Title>
          <Typography.Paragraph>{desc}</Typography.Paragraph>
          <div className='d-flex gap-10' style={{ marginTop: 20 }}>
            {onlyView ? (
              // <Button type='primary' shape='round' className='btn-cyan'>
              //   Xem lại
              // </Button>
              <></>
            ) : (
              <Button
                type='primary'
                shape='round'
                onClick={onClickJoinAssign}
                loading={loading}
              >
                Làm bài
              </Button>
            )}
          </div>
        </div>
      </Space>
    </Card>
  );
};

export default Assign;
