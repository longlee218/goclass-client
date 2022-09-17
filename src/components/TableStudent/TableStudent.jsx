import { Button, Input, Space, Table, Tooltip, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import {
  faCheck,
  faPen,
  faSearch,
  faWarning,
  faX,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Highlighter from 'react-highlight-words';
import studentActions from '../../redux/student/student.action';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const TableStudent = ({
  classInfo,
  setPage,
  page,
  limit,
  setLimit,
  onEditStudent,
  onRemoveStudent,
  paginateStudents,
  loading,
  setLoading,
}) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = useCallback(
    (dataIndex) => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div
          style={{
            padding: 8,
          }}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type='primary'
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<FontAwesomeIcon icon={faSearch} />}
              size='small'
              style={{
                width: 90,
              }}
            >
              &nbsp;Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size='small'
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type='link'
              size='small'
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <FontAwesomeIcon
          icon={faSearch}
          style={{
            color: filtered ? '#1890ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) => {
        const item = record[dataIndex];
        return item.toString().toLowerCase().includes(value.toLowerCase());
      },
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc700',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    }),
    [searchText, searchedColumn]
  );

  const columns = [
    {
      title: 'Tên học sinh',
      dataIndex: 'studentName',
      key: 'studentName',
      ...getColumnSearchProps('studentName'),
      sorter: true,
    },
    {
      title: 'Mã học sinh',
      dataIndex: 'studentCode',
      key: 'studentCode',
      render: (value) => (value ? value : '- -'),
      ...getColumnSearchProps('studentCode'),
      sorter: true,
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      filters: [
        {
          text: 'Nam',
          value: 'male',
        },
        {
          text: 'Nữ',
          value: 'female',
        },
        {
          text: 'Không rõ',
          value: '',
        },
      ],
      render: (_, { gender }) => {
        let textGender = '';
        switch (gender) {
          case 'male':
            textGender = 'Nam';
            break;
          case 'female':
            textGender = 'Nữ';
            break;
          default:
            textGender = 'Khác';
            break;
        }
        return <Typography.Text>{textGender}</Typography.Text>;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
      render: (_, docs) => {
        let color = 'warning';
        let icon = faWarning;
        let tooltipText = 'Chưa có tài khoản';
        if (docs.student.isActive) {
          color = 'success';
          icon = faCheck;
          tooltipText = 'Đã có tài khoản';
        }
        return (
          <Typography.Text
            type={color}
            strong
            copyable={{
              text: docs.email,
            }}
          >
            <Tooltip title={tooltipText} placement='right'>
              {docs.email}
              &nbsp; &nbsp;
            </Tooltip>
            {/* <FontAwesomeIcon icon={icon} /> */}
          </Typography.Text>
        );
      },
      sorter: true,
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      render: (_, { _id }) => (
        <Space size={20}>
          <Button type='text' onClick={() => onEditStudent(_id)}>
            <FontAwesomeIcon
              icon={faPen}
              style={{
                color: 'var(--secondary)',
              }}
            />
          </Button>
          <Button type='text' onClick={() => onRemoveStudent(_id)}>
            <FontAwesomeIcon
              icon={faX}
              style={{
                color: 'var(--secondary)',
              }}
            />
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (newPagination, filters, sorter) => {
    setPage(newPagination.current);
    setLimit(newPagination.pageSize);
    setLoading(true);
    dispatch(
      studentActions.get(classInfo._id, {
        page: newPagination.current,
        limit: newPagination.pageSize,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...(filters.studentName ? { studentName: filters.studentName[0] } : {}),
        ...(filters.email ? { email: filters.email[0] } : {}),
        ...(filters.studentCode ? { studentCode: filters.studentCode[0] } : {}),
        ...(filters.gender ? { gender: filters.gender } : {}),
      })
    ).then(() => setLoading(false));
  };
  return (
    <Table
      bordered
      // title={() => <Typography.Text>Danh sách học sinh</Typography.Text>}
      columns={columns}
      dataSource={paginateStudents.students}
      pagination={{
        current: page,
        pageSize: limit,
        total: paginateStudents.totalDocs,
        position: ['bottomCenter'],
      }}
      onChange={handleTableChange}
      scroll={{
        x: 1300,
      }}
      loading={loading}
    />
  );
};

export default TableStudent;
