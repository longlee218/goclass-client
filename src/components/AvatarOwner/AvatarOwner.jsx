import { Avatar } from 'antd';
import React from 'react';

const AvatarOwner = ({ src, fullname }) => {
  if (!src) {
    const shortName = fullname
      .split(' ')
      .slice(-2)
      .map((str) => str[0])
      .join('');
    return (
      <Avatar
        shape='circle'
        style={{
          backgroundColor: '#1529c9',
          verticalAlign: 'middle',
        }}
        size='default'
        gap={2}
      >
        {shortName}
      </Avatar>
    );
  }
  return (
    <Avatar
      style={{
        verticalAlign: 'middle',
      }}
      size='default'
      gap={2}
      src={src}
    />
  );
};

export default AvatarOwner;
