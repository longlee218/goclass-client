import ColumnAction from './ColumnAction';
import ColumnCreatedAt from './ColumnCreatedAt';
import ColumnName from './ColumnName';
import ColumnStatus from './ColumnStatus';
import React from 'react';
import { Table } from 'antd';
import { teacherRouteConfig } from '../../../../config/route.config';
import { useNavigate } from 'react-router';

const TableFolder = ({
  isLoading,
  dataTable,
  onOpenModalFolder,
  fetchDataTable,
}) => {
  const navigate = useNavigate();

  const columns = [
    {
      key: 'name',
      title: 'Tên',
      dataIndex: 'name',
      width: '60%',
      render: (_, { _id, name, isFolder }) => (
        <ColumnName
          name={name}
          isFolder={isFolder}
          onClick={() => {
            if (isFolder)
              navigate(teacherRouteConfig.assignmentStores + '/' + _id);
            else
              navigate(
                teacherRouteConfig.assignmentWithParam.replace(':assignId', _id)
              );
          }}
        />
      ),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_, { isFolder, status }) => (
        <ColumnStatus isFolder={isFolder} status={status} />
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, { createdAt }) => <ColumnCreatedAt createdAt={createdAt} />,
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <ColumnAction
          onOpenModalFolder={onOpenModalFolder}
          currentRecord={record}
          fetchDataTable={fetchDataTable}
        />
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      pagination={false}
      dataSource={dataTable || []}
      loading={isLoading}
      scroll={{
        x: 1300,
      }}
    />
  );
};

export default TableFolder;
