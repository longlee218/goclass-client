import './style.css';

import { Col, Layout, Row } from 'antd';

import SignUpChoose from './components/SignUpChoose/SignUpChoose';
import SignUpTeacher from './components/SignUpTeacher/SignUpTeacher';
import SvgLogo from '../../../components/SvgLogo';
import { useEffect } from 'react';
import { useState } from 'react';

const SignUp = () => {
  const [showSelectRole, setShowSelectRole] = useState(true);
  const [showSignUpTeacher, setshowSignUpTeacher] = useState(false);
  const [showSignUpStudent, setshowSignUpStudent] = useState(false);

  useEffect(() => {
    document.title = 'Đăng ký';
  }, []);
  return (
    <Layout className='section-auth'>
      <Layout.Content className='container-fuild signUp'>
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
            <Col
              className='text-center'
              style={{ marginTop: '6vh', marginBottom: '1em' }}
            >
              <SvgLogo />
            </Col>
            {showSelectRole && (
              <SignUpChoose
                setIsShow={setShowSelectRole}
                setIsShowStudent={setshowSignUpStudent}
                setIsShowTeacher={setshowSignUpTeacher}
              />
            )}
            {showSignUpTeacher && (
              <SignUpTeacher
                setIsShowSelectRole={setShowSelectRole}
                setIsShowTeacher={setshowSignUpTeacher}
              />
            )}
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
      </Layout.Content>
    </Layout>
  );
};

export default SignUp;
