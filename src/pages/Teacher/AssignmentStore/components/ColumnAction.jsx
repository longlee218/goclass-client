import { Button, Dropdown, Space } from 'antd';
import { faEllipsisV, faShare } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuActionFolder from './MenuActionFolder';
import React from 'react';

const ColumnAction = ({ onOpenModalFolder, currentFolder, fetchDataTable }) => {
  return (
    <Space size='middle'>
      {currentFolder.isFolder ? (
        <div className='empty-div'></div>
      ) : (
        <Button type='text'>
          <FontAwesomeIcon
            icon={faShare}
            style={{
              color: 'var(--secondary)',
            }}
          />
        </Button>
      )}
      <Dropdown
        destroyPopupOnHide
        arrow
        overlay={
          <MenuActionFolder
            onOpenModalFolder={onOpenModalFolder}
            currentFolder={currentFolder}
            fetchData={fetchDataTable}
          />
        }
        trigger={['click']}
        children={
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Button type='text'>
              <FontAwesomeIcon
                icon={faEllipsisV}
                style={{
                  color: 'var(--secondary)',
                }}
              />
            </Button>
          </div>
        }
      />
    </Space>
  );
};

export default ColumnAction;