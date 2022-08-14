import { faFileLines, faFolder } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Typography } from 'antd';

const ColumnName = ({ isFolder, onClick, name }) => {
  return (
    <span
      className='d-flex gap-15'
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      {isFolder ? (
        <FontAwesomeIcon
          icon={faFolder}
          style={{ color: 'var(--warning)' }}
          size='lg'
        />
      ) : (
        <FontAwesomeIcon
          icon={faFileLines}
          style={{ color: 'var(--danger)', fontSize: '20px' }}
        />
      )}

      <Typography.Text>{name}</Typography.Text>
    </span>
  );
};

export default ColumnName;
