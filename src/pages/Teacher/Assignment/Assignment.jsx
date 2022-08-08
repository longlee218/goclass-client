import './style.css';

import { Button, Input, Space, Table, Tag, Typography } from 'antd';
import {
  faEllipsisV,
  faFileLines,
  faFolder,
  faFolderPlus,
  faShare,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useAppContext } from '../../../hooks/useAppContext';
import { useEffect } from 'react';

const { Search } = Input;

const columns = [
  {
    key: 'name',
    title: 'Tên',
    dataIndex: 'name',
    width: '60%',
    render: (_, { name, isFolder }) => {
      return (
        <span className='d-flex gap-15'>
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

          <Typography>{name}</Typography>
        </span>
      );
    },
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (_, { isFolder, status }) => {
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
    },
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: '',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        {/* <a>Invite {record.name}</a> */}
        <Button type='text'>
          <FontAwesomeIcon
            icon={faShare}
            style={{
              color: 'var(--secondary)',
            }}
          />
        </Button>
        <Button type='text'>
          <FontAwesomeIcon
            icon={faEllipsisV}
            style={{
              color: 'var(--secondary)',
            }}
          />
        </Button>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'Student Demo Assignment',
    createdAt: '11/06/2022 19:03:00',
    isFolder: true,
    status: 'offline',
  },
  {
    key: '1',
    name: 'Student Demo Assignment',
    createdAt: '11/06/2022 19:03:00',
    isFolder: false,
    status: 'online',
  },
  {
    key: '1',
    name: 'Student Demo Assignment',
    createdAt: '11/06/2022 19:03:00',
    isFolder: true,
    status: 'online',
  },
];

const Assignment = () => {
  const { setTitleHeader } = useAppContext();

  useEffect(() => {
    document.title = 'Kho lưu trữ bài tập';
  }, []);

  useEffect(() => {
    setTitleHeader('Kho lưu trữ bài tập');
  }, [setTitleHeader]);

  return (
    <>
      <div className='assignment_wrapper'>
        <div className='assignment_wrapper__actions'>
          <div className='assignment_wrapper__search'>
            <Search
              placeholder='Tìm kiếm'
              onSearch={() => {}}
              style={{ width: 300 }}
            />
          </div>
          <div className='assignment_wrapper__btngroup d-flex gap-15'>
            <Button
              shape='round'
              type='primary'
              danger
              className='wrapp-text-bold btn-warning'
            >
              Tạo đề
            </Button>
            <Button className='wrapp-text-bold'>
              <FontAwesomeIcon
                icon={faFolderPlus}
                style={{ color: 'var(--warning)' }}
              />
              &nbsp; Tạo thư mục
            </Button>
          </div>
        </div>
        <div className='assignment_wrapper__table'>
          <Table
            columns={columns}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {}, // click row
                onDoubleClick: (event) => {}, // double click row
                onContextMenu: (event) => {
                  console.log(event);
                }, // right button click row
                onMouseEnter: (event) => {}, // mouse enter row
                onMouseLeave: (event) => {}, // mouse leave row
              };
            }}
            dataSource={data}
            scroll={{
              x: 1300,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Assignment;
