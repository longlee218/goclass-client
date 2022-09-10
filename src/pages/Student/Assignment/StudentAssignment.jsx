import './style.css';

import { Avatar, Card, Collapse, Space, Typography } from 'antd';

import AssignGroups from './components/AssignGroups';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Search from 'antd/lib/transfer/search';
import alertActions from '../../../redux/alert/alert.action';
import examService from '../../../services/exam.service';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { useState } from 'react';

function todoGroupReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'reset':
      return payload;
    default:
      break;
  }
}

const { Panel } = Collapse;
const StudentAssignment = () => {
  const dispatch = useDispatch();
  const [loadTodoGroup, setLoadTodoGroup] = useState(false);
  const [todoGroups, dispatchTodoGroup] = useReducer(todoGroupReducer, []);

  useEffect(() => {
    setLoadTodoGroup(true);
    examService
      .getToDoExam()
      .then((data) => {
        dispatchTodoGroup({ type: 'reset', payload: data });
      })
      .finally(() => setLoadTodoGroup(false))
      .catch((error) => dispatch(alertActions.error(error.message)));
  }, [dispatch]);

  return (
    <div className='assginment-wrapper'>
      <div className='assignment-box assignment-new'>
        <div className='assignment-box__search'>
          <Search placeholder='Tìm kiếm' onSearch={() => {}} />
        </div>
        <div className='roster-groups'></div>
        <div className='roster-group todo-group'>
          {loadTodoGroup && 'Đang tải...'}
          {!loadTodoGroup && todoGroups.length === 0 && 'Không có dữ liệu'}
          {!loadTodoGroup &&
            todoGroups.length !== 0 &&
            todoGroups.map((todoGroup) => (
              <AssignGroups
                owner={todoGroup.owner}
                classRoom={todoGroup.classRoom}
                rosterGroups={todoGroup.rosterGroups}
              />
            ))}
        </div>
        {/* <div className='roster-group'>
          <Collapse accordion>
            <Panel
              header={
                <Typography.Title level={5} className='title'>
                  Các đề đã làm
                </Typography.Title>
              }
              key='1'
              extra={<Typography.Text>Số lượng đề: 2</Typography.Text>}
            >
              <Card size='small' hoverable style={{ marginBottom: 16 }}>
                <Space>
                  <div className='block-body-status'>
                    <FontAwesomeIcon
                      icon={faFileLines}
                      style={{ color: 'var(--success)' }}
                      size='4x'
                    />
                  </div>
                  <div className='block-body-content'>
                    <Typography.Title level={5}>
                      Javascript ES6 - Ngày 09/07/2022
                    </Typography.Title>
                    <Typography.Paragraph>
                      Thời gian làm bài: 14:30 07/09/2022 - không giới hạn
                    </Typography.Paragraph>
                  </div>
                </Space>
              </Card>
              <Card size='small' hoverable style={{ marginBottom: 16 }}>
                <Space>
                  <div className='block-body-status'>
                    <FontAwesomeIcon
                      icon={faFileLines}
                      style={{ color: 'var(--success)' }}
                      size='4x'
                    />
                  </div>
                  <div className='block-body-content'>
                    <Typography.Title level={5}>
                      Javascript ES6 - Ngày 09/07/2022
                    </Typography.Title>
                    <Typography.Paragraph>
                      Thời gian làm bài: 14:30 07/09/2022 - không giới hạn
                    </Typography.Paragraph>
                  </div>
                </Space>
              </Card>
            </Panel>
          </Collapse>
        </div> */}
      </div>
    </div>
  );
};

export default StudentAssignment;
