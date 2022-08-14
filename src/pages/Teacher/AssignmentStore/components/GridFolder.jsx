import { Dropdown, Tooltip, Typography } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import MenuActionFolder from './MenuActionFolder';
import React from 'react';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { teacherRouteConfig } from '../../../../config/route.config';

const FolderItem = ({ folder, onOpenModalFolder, fetchDataGrid }) => (
  <Tooltip title={folder.name} placement='bottom'>
    <Dropdown
      destroyPopupOnHide
      arrow
      overlay={
        <MenuActionFolder
          onOpenModalFolder={onOpenModalFolder}
          currentFolder={folder}
          fetchData={fetchDataGrid}
        />
      }
      trigger={['contextMenu']}
    >
      <div className='flex-item'>
        <Link to={teacherRouteConfig.assignmentStores + '/' + folder._id}>
          <FontAwesomeIcon
            icon={faFolder}
            style={{ color: 'var(--warning)' }}
            size='4x'
          />
        </Link>
        <div className='d-flex flex-1 justify-content-center'>
          <Link to={teacherRouteConfig.assignmentStores + '/' + folder._id}>
            <Typography.Text>
              {folder.name.length > 10
                ? folder.name.substr(0, 9) + '...'
                : folder.name}
            </Typography.Text>
          </Link>
        </div>
      </div>
    </Dropdown>
  </Tooltip>
);

const GridFolder = ({ dataGrid, onOpenModalFolder, fetchDataGrid }) => {
  return (
    <div className='flex'>
      {dataGrid.map((item) => {
        return item.isFolder ? (
          <FolderItem
            folder={item}
            onOpenModalFolder={onOpenModalFolder}
            fetchDataGrid={fetchDataGrid}
          />
        ) : (
          <></>
        );
      })}
    </div>
  );
};

export default GridFolder;
