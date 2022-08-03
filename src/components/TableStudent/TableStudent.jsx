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

const TableStudent = ({ dataStudent, setVisibleDrawer }) => {
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

  const getColumnSearchProps = (dataIndex) => ({
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
  });

  const columns = [
    {
      title: 'Tên học sinh',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name'),
      sortDirections: ['descend'],
    },
    {
      title: 'Mã học sinh',
      dataIndex: 'code',
      key: 'code',
      render: (value) => (value ? value : '- -'),
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('code'),
      sortDirections: ['descend'],
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
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
      render: (_, { isExist, email }) => {
        let color = 'warning';
        let icon = faWarning;
        let tooltipText = 'Chưa có tài khoản';
        if (isExist) {
          color = 'success';
          icon = faCheck;
          tooltipText = 'Đã có tài khoản';
        }
        return (
          <Tooltip title={tooltipText} placement='right'>
            <Typography.Text type={color} strong>
              {email}
              &nbsp; &nbsp;
              <FontAwesomeIcon icon={icon} />
            </Typography.Text>
          </Tooltip>
        );
      },
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size={32}>
          <Typography.Text type='secondary'>
            <FontAwesomeIcon icon={faPen} />
          </Typography.Text>
          <Typography.Text type='secondary'>
            <FontAwesomeIcon icon={faX} />
          </Typography.Text>
        </Space>
      ),
    },
  ];
  const defaultTitle = () => (
    <Space direction='vertical' size={16} style={{ width: '100%' }}>
      <div className='d-flex justify-content-between'>
        <Space size={32}>
          <Typography.Text>
            Lớp: <b>Django</b>
          </Typography.Text>
          <Typography.Text>
            Sĩ số: <b>32</b>
          </Typography.Text>
          <Typography.Text>
            Mã lớp:&nbsp;
            <Typography.Text strong copyable type='danger'>
              Education-9234LKĐJS
            </Typography.Text>
          </Typography.Text>
        </Space>
        <Button
          type='primary'
          danger
          shape='round'
          onClick={() => setVisibleDrawer(true)}
        >
          Thêm học sinh
        </Button>
      </div>
      <Typography.Paragraph editable>
        Lớp lập trình Django cơ bản dành cho người mới bắt đầu
      </Typography.Paragraph>
    </Space>
  );
  return (
    <Table
      title={defaultTitle}
      columns={columns}
      dataSource={dataStudent}
      pagination={{
        current: 1,
        pageSize: 10,
        total: 12,
        position: ['bottomCenter'],
      }}
      scroll={{
        x: 1300,
      }}
    />
  );
};

export default TableStudent;
