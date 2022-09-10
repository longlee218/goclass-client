import { Card, Space, Typography } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

const Assign = ({ _id, name, isFinish, desc, groupName, times }) => {
  return (
    <Card size='small' hoverable key={_id}>
      <Space>
        <div className='block-body-status'>
          <FontAwesomeIcon
            icon={faFileLines}
            style={{ color: isFinish ? 'var(--success)' : 'var(--danger)' }}
            size='4x'
          />
        </div>
        <div className='block-body-content'>
          <Typography.Title level={5}>
            {name} - Nhóm {groupName}
          </Typography.Title>
          <Typography.Paragraph>{desc}</Typography.Paragraph>
          <Typography.Paragraph>
            Thời gian làm bài: Không giới hạn
          </Typography.Paragraph>
        </div>
      </Space>
    </Card>
  );
};

export default Assign;
