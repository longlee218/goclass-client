import './style.css';

import { Card, Col, Row, Typography } from 'antd';
import {
  faBookAtlas,
  faFile,
  faInfoCircle,
  faStore,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { teacherRouteConfig } from '../../../config/route.config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const style = {
  textAlign: 'center',
  marginBottom: '20px',
};
const TeacherDashboard = () => {
  const navigator = useNavigate();
  useEffect(() => {
    document.title = 'Màn hình chính';
  }, []);
  //hehhe
  return (
    <div className='dashboard_wrapper'>
      <Row className='dashboard_wrapper__content' gutter={[24, 32]}>
        <Col span={24}>
          <Row gutter={[24, 16]}>
            <Col span={8}>
              <Card
                hoverable
                onClick={() => navigator(teacherRouteConfig.assignmentStores)}
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
                    Kho bài tập
                  </Typography.Title>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                hoverable
                onClick={() => navigator(teacherRouteConfig.myClass)}
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
            <Col span={8}>
              <Card
                hoverable
                onClick={() => navigator(teacherRouteConfig.assignmentLibrary)}
              >
                <div className='d-flex flex-column'>
                  <div style={style}>
                    <FontAwesomeIcon
                      icon={faStore}
                      className='text-primary'
                      size='3x'
                    />
                  </div>
                  <Typography.Title
                    level={5}
                    style={{ textAlign: 'center' }}
                    className='text-primary text-center'
                  >
                    Thư viện bài tập
                  </Typography.Title>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 16]}>
            <Col span={8}>
              <Card hoverable size='small'>
                <div className='d-flex flex-row gap-10'>
                  <div>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className='text-danger'
                      size='2x'
                    />
                  </div>
                  <Typography.Text
                    style={{ textAlign: 'center' }}
                    className='text-danger'
                  >
                    Thùng rác
                  </Typography.Text>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card hoverable size='small'>
                <div className='d-flex flex-row gap-10'>
                  <div>
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className='text-danger'
                      size='2x'
                    />
                  </div>
                  <Typography.Text
                    style={{ textAlign: 'center' }}
                    className='text-danger'
                  >
                    Hướng dẫn
                  </Typography.Text>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TeacherDashboard;
