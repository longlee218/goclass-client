import React from 'react';
import { Typography } from 'antd';
import moment from 'moment';

const ColumnCreatedAt = ({ createdAt }) => {
  return (
    <Typography>{moment(createdAt).format('DD/MM/YYYY, HH:mm')}</Typography>
  );
};

export default ColumnCreatedAt;
