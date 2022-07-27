import './style.css';

import { Col, Row } from 'antd';

import React from 'react';
import { useEffect } from 'react';

const TeacherDashboard = (props) => {
  useEffect(() => {
    document.title = 'Màn hình chính';
  }, []);

  // useEffect(() => {
  //   let { state } = location;
  //   if (state.isNew) {
  //     dispatch(alertActions.success('Wellcome to Education.'));
  //   } else {
  //     dispatch(
  //       alertActions.success(
  //         'Wellcome back ' + user.firstName + ' ' + user.lastName
  //       )
  //     );
  //   }
  // }, []);

  return (
    <div className='dashboard_wrapper'>
      <Row>
        <Col span={16}></Col>
        <Col span={8}>
          <section className='student_asking'>
            <div className='student_asking_title'>
              <h3>Học sinh hỏi thầy</h3>
            </div>
          </section>
        </Col>
      </Row>
    </div>
  );
};

export default TeacherDashboard;
