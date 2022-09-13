import './style.css';

import { Card, Col, Input, Row, Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import AssignPreview from './components/AssignPreview';
import React from 'react';
import Search from 'antd/lib/input/Search';
import SelectListGrade from '../Assignment/components/SelectListGrade';
import SelectListSubject from '../Assignment/components/SelectListSubject';
import alertActions from '../../../redux/alert/alert.action';
import assignmentService from '../../../services/assignment.service';
import configActions from '../../../redux/config/config.actions';
import { useEffect } from 'react';
import { useState } from 'react';

const AssignmentLibrary = () => {
  const dispatch = useDispatch();
  const [assignShareds, setAssignShareds] = useState([]);
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  useEffect(() => {
    dispatch(configActions.setTitle('Thư viện đề'));
    dispatch(configActions.setSubTitle(user.fullname));
    document.title =
      'Education | Thư viện đề dành cho giáo viên - Dễ dàng tạo, tham khảo xem các tips.';
  }, [dispatch, user.fullname]);

  useEffect(() => {
    assignmentService
      .getAssignShared()
      .then((data) => {
        setAssignShareds(data);
      })
      .catch((error) => dispatch(alertActions.error(error.message)));
  }, [dispatch]);

  return (
    <div className='body'>
      <div className='layout_form'>
        <div className='goclass-header'>
          <Typography.Title level={5} className='text-primary'>
            Tìm những chỉ dẫn, mẫu đề có sẵn, kế hoạch học tập đã được xây dựng
            trên Education
          </Typography.Title>
        </div>
        <Row
          gutter={[6]}
          style={{ justifyContent: 'flex-start', marginTop: 24 }}
        >
          <Col span={3}>
            <SelectListSubject
              name='subject'
              placeholder='Chủ đề'
              disabled={false}
              onChange={() => {}}
              key='select-subject'
            />
          </Col>
          <Col span={3}>
            <SelectListGrade
              name='grades'
              placeholder='Khối'
              disabled={false}
              onChange={() => {}}
              key='select-grades'
            />
          </Col>
          <Col span={18}>
            <Search
              placeholder='Tìm kiếm theo Tiêu đề và mô tả'
              name='search'
              onChange={() => {}}
            />
          </Col>
        </Row>
      </div>
      <div className='repeat-container'>
        <div className='repeat-container__scroll'>
          <div className='flex-list'>
            {assignShareds.map(({ _id, name, desc, subjects, grades }) => (
              <AssignPreview
                thumbnail=''
                key={_id}
                assignId={_id}
                name={name}
                description={desc}
                grades={grades}
                subjects={subjects}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentLibrary;
