import './style.css';

import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import React, { useState } from 'react';

import DatePickerVN from '../../DatePickerVN';
import DrawerBase from '../DrawerBase';

const { Option } = Select;

const GENDER_OPTIONS = [
  { value: 'male', name: 'Nam' },
  { value: 'female', name: 'Nữ' },
  { value: 'other', name: 'Khác' },
];

let timeOut = null;
let currentEmail = '';

const StudentAddedDrawer = ({ visible, setVisible }) => {
  const [newEmail, setNewEmail] = useState('');
  const [valueGender, setValueGender] = useState('other');
  const [listEmail, setListEmail] = useState([
    {
      value: 1,
      name: 'longle1@gmail.com',
    },
    {
      value: 2,
      name: 'longle2@gmail.com',
    },
    {
      value: 3,
      name: 'longle3@gmail.com',
    },
    {
      value: 4,
      name: 'longle4@gmail.com',
    },
  ]);

  const onClose = () => {
    setVisible(false);
  };

  const onSearchEmail = (value) => {
    if (timeOut) {
      clearTimeout(timeOut);
      timeOut = null;
    }
    currentEmail = value.trim();
    const fetchEmail = () => {};
  };

  return (
    <DrawerBase
      key='add-student-drawer'
      className='add-student-drawer'
      title='Thêm học sinh'
      onClose={onClose}
      visible={visible}
    >
      {visible && (
        <Form layout='vertical' requiredMark={false}>
          <Row gutter={16} style={{ marginRight: 0 }}>
            <Col span={24}>
              <Form.Item
                name='email'
                label='Email học sinh'
                rules={[
                  { required: true, message: 'Vui lòng chọn Email học sinh' },
                ]}
              >
                <Select
                  showSearch
                  name='email'
                  type='text'
                  placeholder='Nhập email học sinh'
                  optionFilterProp='children'
                  filterOption={(input, option) =>
                    option.children.includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Space style={{ padding: '0 8px 4px' }}>
                        <Input
                          placeholder='Nhập Email muốn tạo'
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <Button type='primary' onClick={() => {}}>
                          Thêm Email
                        </Button>
                      </Space>
                    </>
                  )}
                  style={{ marginBottom: 8 }}
                >
                  {listEmail.map((item, index) => (
                    <Option key={index} value={item.value}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
                <Typography.Text
                  italic
                  style={{ fontSize: 13, marginTop: 8 }}
                  type='secondary'
                >
                  Nếu thầy/cô không tìm thấy Email có nghĩa là tài khoản này
                  không tồn tại trên hệ thống. Hãy tạo 1 tài khoản mới cho học
                  sinh.
                </Typography.Text>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginRight: 0 }}>
            <Col span={24}>
              <Form.Item
                name='fullname'
                label='Họ tên học sinh'
                rules={[{ required: true, message: 'Vui lòng nhập học tên' }]}
              >
                <Input
                  name='fullname'
                  type='text'
                  placeholder='VD. Lê Hoàng Long'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginRight: 0 }}>
            <Col span={24}>
              <Form.Item name='code' label='Mã học sinh'>
                <Input.Group compact>
                  <Input
                    placeholder='VD. 127262'
                    name='code'
                    style={{ width: 'calc(100% - 85px)' }}
                  />
                  <Button type='primary' style={{ marginLeft: '3px' }}>
                    Lấy mã
                  </Button>
                </Input.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginRight: 0 }}>
            <Col span={24}>
              <Form.Item label='Giới tính' name='gender'>
                <Radio.Group
                  onChange={(e) => setValueGender(e.target.value)}
                  value={valueGender}
                  defaultValue='other'
                >
                  {GENDER_OPTIONS.map(({ value, name }) => (
                    <Radio key={value} value={value} name='gender'>
                      {name}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginRight: 0 }}>
            <Col span={24}>
              <Form.Item name='dob' label='Ngày sinh'>
                <DatePickerVN
                  name='dob'
                  style={{ width: '100%' }}
                  placeholder='Chọn ngày sinh'
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginRight: 0 }}>
            <Col span={24}>
              <Form.Item>
                <Button
                  type='primary'
                  className='btn-success'
                  shape='round'
                  htmlType='submit'
                >
                  Lưu
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </DrawerBase>
  );
};

export default StudentAddedDrawer;
