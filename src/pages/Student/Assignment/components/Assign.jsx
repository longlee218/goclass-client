import { Card, Space, Typography } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

const Assign = ({ _id, name, isFinish, desc, groupName }) => {
  const onClickHandle = () => {
    // Push data stream to firebase then redirect to link excalibdraw
    window.open(
      process.env.REACT_APP_CLIENT_EXCALIB_URL || 'http://localhost:3000',
      '_blank'
    );
  };
  return (
    <Card size='small' hoverable key={_id} onClick={onClickHandle}>
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
            {name} - {groupName}
          </Typography.Title>
          <Typography.Paragraph>{desc}</Typography.Paragraph>
        </div>
      </Space>
    </Card>
  );
};

export default Assign;
