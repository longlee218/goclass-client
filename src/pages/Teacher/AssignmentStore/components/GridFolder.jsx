import { Dropdown, Tooltip, Typography } from 'antd';
import { faFileLines, faFolder } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import MenuActionAssign from './MenuActionAssign';
import MenuActionFolder from './MenuActionFolder';
import React from 'react';
import { teacherRouteConfig } from '../../../../config/route.config';

const FolderItem = ({ folder, onOpenModalFolder, fetchDataGrid }) => (
  <Tooltip title={folder.name} placement='bottom'>
    <Dropdown
      destroyPopupOnHide
      arrow
      overlay={
        <MenuActionFolder
          key={folder._id}
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
              {folder.name.length > 30
                ? folder.name.substr(0, 29) + '...'
                : folder.name}
            </Typography.Text>
          </Link>
        </div>
      </div>
    </Dropdown>
  </Tooltip>
);

const AssignmentItem = ({ assignment, fetchDataGrid }) => {
  const link = teacherRouteConfig.assignmentWithParam.replace(
    ':assignId',
    assignment._id
  );
  return (
    <Tooltip title={assignment.name} placement='bottom'>
      <Dropdown
        destroyPopupOnHide
        arrow
        overlay={
          <MenuActionAssign
            key={assignment._id}
            currentAssign={assignment}
            fetchData={fetchDataGrid}
          />
        }
        trigger={['contextMenu']}
      >
        <div className='flex-item'>
          <Link to={link}>
            <FontAwesomeIcon
              icon={faFileLines}
              style={{ color: 'var(--danger)' }}
              size='4x'
            />
          </Link>
          <div className='d-flex flex-1 justify-content-center'>
            <Link to={link}>
              <Typography.Text>
                {assignment.name.length > 30
                  ? assignment.name.substr(0, 29) + '...'
                  : assignment.name}
              </Typography.Text>
            </Link>
          </div>
        </div>
      </Dropdown>
    </Tooltip>
  );
};

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
          <AssignmentItem assignment={item} fetchDataGrid={fetchDataGrid} />
        );
      })}
    </div>
  );
};

export default GridFolder;
