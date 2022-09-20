import './style.css';

import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Typography,
} from 'antd';
import { Link, useLocation } from 'react-router-dom';

import Google17SVG from '../../../assets/images/google-icon-17.svg';
import SvgLogo from '../../../components/SvgLogo';
import authAction from '../../../redux/auth/auth.action';
import { publicRouteConfig } from '../../../config/route.config';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState(null);

  useEffect(() => {
    document.title = 'Đăng nhập';
  }, []);

  useEffect(() => {
    if (values) {
      setIsLoading(true);
      dispatch(
        authAction.login(
          values.username,
          values.password,
          location?.state?.nextUrl || ''
        )
      ).finally(() => setIsLoading(false));
    }
  }, [values]);

  const onLoginWithGoogle = () => {
    window.location.href =
      process.env.REACT_APP_BACKEND_URL + '/api/v1/auth/google';
  };

  return (
    <Layout className='section-auth'>
      <Layout.Content className='container-fuild login'>
        <Form
          id='login-form'
          name='login-form'
          className='login__form'
          aria-hidden={false}
          autoComplete={false}
          layout='vertical'
          onFinish={(values) => setValues(values)}
          onFinishFailed={() => setValues(null)}
        >
          <Row>
            <Col
              xs={{ span: 2 }}
              sm={{ span: 2 }}
              md={{ span: 2 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
              xxl={{ span: 6 }}
            ></Col>
            <Col
              xs={{ span: 20 }}
              sm={{ span: 20 }}
              md={{ span: 20 }}
              lg={{ span: 12 }}
              xl={{ span: 12 }}
              xxl={{ span: 12 }}
            >
              <Col className='text-center' style={{ marginBottom: '1em' }}>
                <SvgLogo />
              </Col>
              <Card id='login-card' className='login__card'>
                <div className='login__body-header text-center'>
                  <Typography.Title level={4} className='h5'>
                    Đăng nhập
                  </Typography.Title>
                </div>
                <div className='login__body-content'>
                  <Col span={24}>
                    <div>
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
                            className='google-signin-img'
                          />
                          <span>Tiếp tục với Google</span>
                        </span>
                      </Button>
                    </div>
                    <div
                      className='text-center'
                      style={{ margin: '1.25em 0 2em 0' }}
                    >
                      <Typography.Paragraph
                        type='secondary'
                        strong={true}
                        className='login__body__header'
                      >
                        - Hoặc -
                      </Typography.Paragraph>
                    </div>
                  </Col>
                  <Form.Item
                    className='login__form-group'
                    name='username'
                    rules={[
                      {
                        required: true,
                        message: 'Không được bỏ trống.',
                      },
                    ]}
                  >
                    <Input
                      id='username-input'
                      name='username'
                      placeholder='Nhập tên đăng nhập hoặc E-mail'
                    />
                  </Form.Item>
                  <Form.Item
                    className='login__form-group'
                    name='password'
                    rules={[
                      {
                        required: true,
                        message: 'Không được bỏ trống.',
                      },
                    ]}
                  >
                    <Input.Password
                      id='password-input'
                      name='password'
                      placeholder='Nhập mật khẩu'
                    />
                  </Form.Item>
                  <Form.Item
                    className='login__form-group'
                    name='remeber'
                    valuePropName='checked'
                  >
                    <Checkbox>Duy trì đăng nhập</Checkbox>
                  </Form.Item>
                  <div className='login__form-group'>
                    <Button
                      className='btn-success mat-raised-button'
                      name='login-btn'
                      block
                      htmlType='submit'
                      style={{ marginBottom: '1.25rem' }}
                      loading={isLoading}
                    >
                      Đăng nhập
                    </Button>
                    <Col>
                      <Row justify='space-between'>
                        <Col
                          sm={{ span: 24 }}
                          md={{ span: 12 }}
                          xl={{ span: 12 }}
                        >
                          <Link className='' to={publicRouteConfig.signUp}>
                            Đăng ký
                          </Link>
                        </Col>
                        <Col
                          sm={{ span: 24 }}
                          md={{ span: 12 }}
                          xl={{ span: 12 }}
                          style={{ textAlign: 'right' }}
                        >
                          <Link to=''>
                            <Typography.Paragraph className='text-danger'>
                              Quên mật khẩu
                            </Typography.Paragraph>
                          </Link>
                        </Col>
                      </Row>
                    </Col>
                  </div>
                </div>
              </Card>
            </Col>
            <Col
              xs={{ span: 2 }}
              sm={{ span: 2 }}
              md={{ span: 2 }}
              lg={{ span: 6 }}
              xl={{ span: 6 }}
              xxl={{ span: 6 }}
            ></Col>
          </Row>
        </Form>
      </Layout.Content>
    </Layout>
  );
};

export default Login;
