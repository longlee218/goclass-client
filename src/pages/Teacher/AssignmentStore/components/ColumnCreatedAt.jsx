import React from 'react';
import { Typography } from 'antd';
import moment from 'moment';

const ColumnCreatedAt = ({ createdAt }) => {
  return (
    <Typography.Text type='secondary'>
      {moment(createdAt).format('DD/MM/YYYY, HH:mm')}
    </Typography.Text>
  );
};

export default ColumnCreatedAt;
