import './style.css';

import { Button, Card, Form, Input, Select, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {
  publicRouteConfig,
  studentRouteConfig,
} from '../../../../../config/route.config';

import Google17SVG from '../../../../../assets/images/google-icon-17.svg';
import { Link } from 'react-router-dom';
import React from 'react';
import authAction from '../../../../../redux/auth/auth.action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const SignUpStudent = ({ setIsShowSelectRole, setIsShowStudent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState(null);

  const onClickBackFormChooseRole = () => {
    setIsShowStudent(false);
    setIsShowSelectRole(true);
  };

  useEffect(() => {
    if (values) {
      setIsLoading(true);
      dispatch(authAction.register({ ...values, role: 'student' }))
        .then((user) => {
          setIsLoading(false);
          navigate(studentRouteConfig.dashboard, {
            replace: true,
            state: { isNew: true },
          });
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  }, [dispatch, navigate, values]);

  const onFinishFailed = (errorInfo) => {
    setValues(null);
  };

  const onLoginWithGoogle = () => {
    window.location.href =
      process.env.REACT_APP_BACKEND_URL + '/api/v1/auth/google';
  };

  return (
    <Card id='signUp-card-teacher' className='signUp__card--teacher'>
      <div className='d-flex justify-content-center pt-3 pb-3'>
        <Typography.Title level={4} className='h5'>
          Đăng ký tài khoản Học Sinh
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
              onClick={onLoginWithGoogle}
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

export default SignUpStudent;
