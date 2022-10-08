import { Space, Table, Tabs } from 'antd';

import React from 'react';

const Trash = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      time: 32,
    },
    {
      key: '2',
      name: 'John',
      time: 42,
    },
  ];

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
    },
    {
      title: 'Thời gian xóa',
      dataIndex: 'time',
      width: '50%',
      key: 'time',
    },
    {
      title: 'Hành động',
      key: 'action',
      width: '20%',
      render: (_, record) => (
        <Space size='middle'>
          <a>Khôi phục {record.name}</a>
          <a>Xóa</a>
        </Space>
      ),
    },
  ];
  return (
    <Tabs defaultActiveKey='1' centered>
      <Tabs.TabPane tab='Lớp học' key='1'>
        <Table dataSource={dataSource} columns={columns} />
      </Tabs.TabPane>
      <Tabs.TabPane tab='Học sinh' key='2'>
        Học sinh
      </Tabs.TabPane>
      <Tabs.TabPane tab='Bài tập' key='3'>
        Bài tập
      </Tabs.TabPane>
      <Tabs.TabPane tab='Thư mục bài tập' key='4'>
        Thư mục bài tập
      </Tabs.TabPane>
    </Tabs>
  );
};

export default Trash;
