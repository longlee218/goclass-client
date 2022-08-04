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
  Spin,
  Typography,
} from 'antd';
import React, { useRef, useState } from 'react';

import DatePickerVN from '../../DatePickerVN';
import DrawerBase from '../DrawerBase';
import FormItem from 'antd/lib/form/FormItem';
import otherService from '../../../services/other.service';

const { Option } = Select;

const GENDER_OPTIONS = [
  { value: 'male', name: 'Nam' },
  { value: 'female', name: 'Nữ' },
  { value: 'other', name: 'Khác' },
];

let timeOut = null;
let currentEmail = '';

const StudentAddedDrawer = ({ visible, setVisible }) => {
  const [valueGender, setValueGender] = useState('other');
  const [listEmail, setListEmail] = useState([]);
  const inputRef = useRef(null);
  const [formAddEmail] = Form.useForm();
  const [formAddStudent] = Form.useForm();

  const onClose = () => {
    formAddStudent.resetFields();
    formAddEmail.resetFields();
    setVisible(false);
  };

  const onSearchEmail = (value) => {
    if (timeOut) {
      clearTimeout(timeOut);
      timeOut = null;
    }
    currentEmail = value.trim();
    const fetchEmail = () => {
      otherService.searchEmail(currentEmail).then((data) => {
        if (currentEmail === value.trim()) {
          setListEmail(() => {
            return data.map((item) => ({
              value: item._id,
              name: item.email,
            }));
          });
        }
      });
    };
    timeOut = setTimeout(fetchEmail, 300);
  };

  const onClickIntoEmailSelect = () => {
    if (listEmail.length === 0) {
      otherService.searchEmail().then((data) =>
        setListEmail(() =>
          data.map((item) => ({
            value: item._id,
            name: item.email,
          }))
        )
      );
    }
  };

  const handleAddEmail = ({ email }) => {
    otherService
      .checkExistEmail(email)
      .then((isExist) => {
        if (!isExist) {
          if (!listEmail.find(({ name }) => name === email)) {
            setListEmail([
              ...listEmail,
              {
                value: null,
                name: email,
              },
            ]);
            formAddEmail.setFieldsValue({ email: '' });
          }
        }
      })
      .finally(() => {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      });
  };

  return (
    <DrawerBase
      key='add-student-drawer'
      className='add-student-drawer'
      title='Thêm học sinh'
      onClose={onClose}
      visible={visible}
    >
      <Form layout='vertical' requiredMark={false} form={formAddStudent}>
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
                onChange={(e) => console.log(e)}
                showSearch
                name='email'
                type='text'
                filterOption={false}
                placeholder='Nhập email học sinh'
                onSearch={onSearchEmail}
                dropdownRender={(menu) => {
                  return (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Space style={{ padding: '0 8px 4px' }}>
                        <Form
                          layout='inline'
                          onFinish={(values) => handleAddEmail(values)}
                          form={formAddEmail}
                        >
                          <FormItem
                            name='email'
                            rules={[
                              {
                                required: true,
                                message: 'Please input your username!',
                              },
                              {
                                type: 'email',
                                message: 'Định dạng e-mail không đúng.',
                              },
                            ]}
                          >
                            <Input
                              name='email'
                              type='email'
                              ref={inputRef}
                              placeholder='Nhập Email muốn tạo'
                            />
                          </FormItem>
                          <FormItem>
                            <Button type='primary' htmlType='submit'>
                              Thêm Email
                            </Button>
                          </FormItem>
                        </Form>
                      </Space>
                    </>
                  );
                }}
                style={{ marginBottom: 8 }}
                onClick={onClickIntoEmailSelect}
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
                Nếu thầy/cô không tìm thấy Email có nghĩa là tài khoản này không
                tồn tại trên hệ thống. Hãy tạo 1 tài khoản mới cho học sinh.
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
    </DrawerBase>
  );
};

export default StudentAddedDrawer;
