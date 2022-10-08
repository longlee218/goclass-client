import { Card, Col, Row, Typography } from 'antd';
import React, { useEffect } from 'react';
import { faBookAtlas, faFile } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { studentRouteConfig } from '../../../config/route.config';
import { useNavigate } from 'react-router';

const style = {
  textAlign: 'center',
  marginBottom: '20px',
};
const StudentDashboard = () => {
  const navigator = useNavigate();
  useEffect(() => {
    document.title = 'Màn hình chính';
  }, []);

  return (
    <div className='dashboard_wrapper'>
      <Row className='dashboard_wrapper__content' gutter={[24, 32]}>
        <Col span={24}>
          <Row gutter={[24, 16]}>
            <Col span={8}>
              <Card
                hoverable
                onClick={() => navigator(studentRouteConfig.assignments)}
              >
                <div className='d-flex flex-column'>
                  <div style={style}>
                    <FontAwesomeIcon
                      icon={faFile}
                      className='text-primary'
                      size='3x'
                    />
                  </div>
                  <Typography.Title
                    level={5}
                    style={{ textAlign: 'center' }}
                    className='text-primary'
                  >
                    Bài tập
                  </Typography.Title>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                hoverable
                onClick={() => navigator(studentRouteConfig.myClass)}
              >
                <div className='d-flex flex-column'>
                  <div style={style}>
                    <FontAwesomeIcon
                      icon={faBookAtlas}
                      className='text-primary'
                      size='3x'
                    />
                  </div>
                  <Typography.Title
                    level={5}
                    style={{ textAlign: 'center' }}
                    className='text-primary'
                  >
                    Quản lý lớp
                  </Typography.Title>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default StudentDashboard;
