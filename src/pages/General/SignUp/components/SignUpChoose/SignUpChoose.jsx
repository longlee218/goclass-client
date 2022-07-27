import { Card, Col, Row, Typography } from 'antd';

import IAmStudent from '../../../../../assets/images/i_am_student.png';
import IAmTeacher from '../../../../../assets/images/i_am_teacher.png';
import React from 'react';

const SignUpChoose = ({ setIsShow, setIsShowTeacher, setIsShowStudent }) => {
  const onClickIAmTeacher = () => {
    setIsShowTeacher(true);
    setIsShow(false);
  };

  const onClickIAmStudent = () => {
    setIsShowStudent(true);
    setIsShow(false);
  };

  return (
    <Card id='signUp-card' className='signUp__card'>
      <div className='signUp__body-header '>
        <div></div>
        <div>
          <Typography.Title level={4} type='secondary' className='h5'>
            Bạn là
          </Typography.Title>
        </div>
        <div></div>
      </div>
      <div className='signUp__body-content'>
        <Row gutter={[32, 16]} style={{ justifyContent: 'space-between' }}>
          <Col
            span={12}
            className='signUp__body-content__col'
            style={{ paddingLeft: '10px', maxWidth: '280px' }}
          >
            <button
              type='button'
              className='signUp__body-content__button'
              onClick={onClickIAmStudent}
            >
              <img alt='i_am_student' src={IAmStudent} />
              <Typography.Title level={5} className='text-teal'>
                Student
              </Typography.Title>
            </button>
          </Col>
          <Col
            span={12}
            className='signUp__body-content__col'
            style={{ paddingLeft: '10px', maxWidth: '280px' }}
          >
            <button
              type='button'
              className='signUp__body-content__button'
              onClick={onClickIAmTeacher}
            >
              <img alt='i_am_teacher' src={IAmTeacher} />
              <Typography.Title level={5} className='text-teal'>
                Teacher
              </Typography.Title>
            </button>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default SignUpChoose;
