import './style.css';

import { Button, Card, Form, Input, Select, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {
  publicRouteConfig,
  studentRouteConfig,
  teacherRouteConfig,
} from '../../../../../config/route.config';

import Google17SVG from '../../../../../assets/images/google-icon-17.svg';
import { Link } from 'react-router-dom';
import React from 'react';
import authAction from '../../../../../redux/auth/auth.action';
import otherService from '../../../../../services/other.service';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const { Option } = Select;

const LIST_PREFIX = ['Mr.', 'Mrs.', 'Ms.', 'Miss.', 'Coach.', 'Dr.'];
let index = 0;

let timeOut = null;
let currentValue = '';

const SignUpTeacher = ({ setIsShowSelectRole, setIsShowTeacher }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState(null);
  const [listOrganization, setListOrganization] = useState([]);
  // const [listPrefix, setListPrefix] = useState(LIST_PREFIX);
  // const [prefixSelected, setPrefixSelected] = useState('');

  const onClickBackFormChooseRole = () => {
    setIsShowTeacher(false);
    setIsShowSelectRole(true);
  };

  const onSearchOrganization = (value) => {
    if (timeOut) {
      clearTimeout(timeOut);
      timeOut = null;
    }
    currentValue = value.trim();
    const fetchOrganization = () => {
      otherService.searchOrganization(currentValue).then((data) => {
        if (currentValue === value.trim()) {
          setListOrganization(() => {
            return data.map((item) => ({
              name: item.name,
              address: item.address,
            }));
          });
        }
      });
    };
    timeOut = setTimeout(fetchOrganization, 300);
  };

  useEffect(() => {
    if (values) {
      setIsLoading(true);
      dispatch(authAction.register({ ...values, role: 'teacher' }))
        .then((user) => {
          setIsLoading(false);
          if (user.roles.includes('teacher')) {
            navigate(teacherRouteConfig.dashboard, {
              replace: true,
              state: { isNew: true },
            });
          } else if (user.roles.includes('student')) {
            navigate(studentRouteConfig.dashboard, {
              replace: true,
              state: { isNew: true },
            });
          }
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  }, [dispatch, navigate, values]);

  const onFinishFailed = (errorInfo) => {
    setValues(null);
  };

  // const onChangePrefix = (e) => {
  //   setPrefixSelected(e.target.value);
  // };

  // const onAddPrefix = (e) => {
  //   e.preventDefault();
  //   setListPrefix([...listPrefix, e.target.value || 'Chức vụ ' + (index + 1)]);
  //   setPrefixSelected('');
  // };

  return (
    <Card id='signUp-card-teacher' className='signUp__card--teacher'>
      <div className='d-flex justify-content-center pt-3 pb-3'>
        <Typography.Title level={4} className='h5'>
          Đăng ký tài khoản Giáo Viên
        </Typography.Title>
      </div>
      <div id='teacher-form'>
        <Form
          id='login-form'
          name='form-signup-teacher'
          layout='vertical'
          initialValues={{
            role: 'teacher',
          }}
          onFinish={(values) => setValues(values)}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          scrollToFirstError
        >
          <Form.Item noStyle>
            {/* <Form.Item name='prefix'>
              <Select
                placeholder='Bạn đang là'
                name='prefix'
                dropdownRender={(prefixMenu) => (
                  <>
                    {prefixMenu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Space align='center' style={{ padding: '0 8px 4px' }}>
                      <Input
                        placeholder='Please enter item'
                        value={prefixSelected}
                        onChange={onChangePrefix}
                      />
                      <Typography.Link
                        onClick={onAddPrefix}
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        <PlusOutlined /> Thêm
                      </Typography.Link>
                    </Space>
                  </>
                )}
              >
                {listPrefix.map((item) => (
                  <Option key={item}>{item}</Option>
                ))}
              </Select>
            </Form.Item> */}
            <Form.Item
              name='fullname'
              rules={[
                {
                  required: true,
                  message: 'Không được bỏ trống họ tên.',
                  whitespace: false,
                },
              ]}
            >
              <Input name='fullname' type='text' placeholder='Họ và tên' />
            </Form.Item>
          </Form.Item>
          <Form.Item
            name='email'
            rules={[
              {
                type: 'email',
                message: 'Định dạng e-mail không đúng.',
              },
              {
                required: true,
                message: 'Không được bỏ trống.',
              },
            ]}
          >
            <Input name='email' type='email' placeholder='E-mail' />
          </Form.Item>
          <Form.Item
            name='password'
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Không được bỏ trống.',
              },
            ]}
          >
            <Input.Password
              name='password'
              type='password'
              autoComplete='on'
              placeholder='Mật khẩu'
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item
            name='confirmPassword'
            hasFeedback
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Không được bỏ trống.',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Mật khẩu xác nhận không khớp.')
                  );
                },
              }),
            ]}
          >
            <Input.Password
              name='confirmPassword'
              type='password'
              autoComplete='on'
              placeholder='Mật khẩu xác nhận'
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item name='organization'>
            <Select
              showSearch
              name='organization'
              type='text'
              filterOption={false}
              placeholder='Bạn hiện đang giảng dạy tại'
              onSearch={onSearchOrganization}
              notFoundContent={null}
            >
              {listOrganization.map((item, index) => (
                <Option key={index} value={item.name}>
                  {item.name}
                  {item.address ? <i> - {item.address}</i> : ''}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              shape='round'
              htmlType='submit'
              className='wrapp-text-bold btn-success'
              loading={isLoading}
              block
            >
              Đăng ký
            </Button>
          </Form.Item>
          <div className='text-center' style={{ margin: '1em 0 1em 0' }}>
            <Typography.Paragraph
              type='secondary'
              strong={true}
              className='login__body__header'
            >
              - Hoặc -
            </Typography.Paragraph>
          </div>
          <Form.Item>
            <Button
              className='btn-login-google'
              name='login-with-google'
              block
              shape='round'
            >
              <span className='google-signin-container'>
                <img
                  alt='google-17'
                  src={Google17SVG}
                  style={{
                    width: 18,
                    marginBottom: 2,
                  }}
                  className='google-signin-img'
                />
                <span>Tiếp tục với Google</span>
              </span>
            </Button>
          </Form.Item>
          <Form.Item noStyle>
            <Typography.Paragraph>
              Bằng cách ấn vào nút "ĐĂNG KÝ", tôi đồng ý với{' '}
              <Typography.Link>Điều Khoản Sử Dụng</Typography.Link> và{' '}
              <Typography.Link>
                Chính Sách Bảo Mật của Education
              </Typography.Link>
              .
            </Typography.Paragraph>
          </Form.Item>
          <Form.Item>
            <div className='signUp__card--teacher__text-helper'>
              <Typography.Text type='secondary' style={{ textAlign: 'center' }}>
                Bạn đã có tài khoản?&nbsp;&nbsp;
                <Link
                  to={publicRouteConfig.login}
                  style={{ textAlign: 'center' }}
                >
                  Đăng nhập
                </Link>
              </Typography.Text>
              <Typography.Link
                type='secondary'
                onClick={onClickBackFormChooseRole}
              >
                Quay lại
              </Typography.Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default SignUpTeacher;
