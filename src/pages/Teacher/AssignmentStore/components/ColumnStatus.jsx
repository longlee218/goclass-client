import React from 'react';
import { Tag } from 'antd';

const ColumnStatus = ({ status, isFolder }) => {
  let color = '';
  let text = '';
  if (status === 'online' && isFolder) {
    text = '2 bài đang kiểm tra';
    color = 'blue';
  } else if (status === 'online' && !isFolder) {
    text = 'Đang kiểm tra';
    color = 'volcano';
  }
  return (
    <Tag color={color} key={text}>
      {text.toUpperCase()}
    </Tag>
  );
};

export default ColumnStatus;
