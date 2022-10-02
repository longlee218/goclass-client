import './style.css';

import { Avatar, Card, Collapse, Space, Typography } from 'antd';

import AssignGroups from './components/AssignGroups';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Search from 'antd/lib/transfer/search';
import alertActions from '../../../redux/alert/alert.action';
import examService from '../../../services/exam.service';
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

function finishGroupReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'reset':
      return payload;
    default:
      break;
  }
}

const StudentAssignment = () => {
  const dispatch = useDispatch();
  const [loadGroup, setLoadGroup] = useState(false);
  const [todoGroups, dispatchTodoGroup] = useReducer(todoGroupReducer, []);
  const [finishGroups, dispatchFinishGroup] = useReducer(
    finishGroupReducer,
    []
  );

  useEffect(() => {
    setLoadGroup(true);
    examService
      .getToDoExam()
      .then((data) => {
        dispatchTodoGroup({ type: 'reset', payload: data });
      })
      .finally(() => setLoadGroup(false))
      .catch((error) => dispatch(alertActions.error(error.message)));
  }, [dispatch]);

  useEffect(() => {
    setLoadGroup(true);
    examService
      .getFinishExam()
      .then((data) => {
        dispatchFinishGroup({ type: 'reset', payload: data });
      })
      .finally(() => setLoadGroup(false))
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
          <h3 className='text-bold-gray'>Cần làm</h3>
          {loadGroup && 'Đang tải...'}
          {!loadGroup && todoGroups.length === 0 && 'Không có dữ liệu'}
          {!loadGroup && todoGroups.length !== 0 && (
            <AssignGroups groups={todoGroups} isFinish={false} />
          )}
        </div>
        <div className='roster-group finish-group'>
          <h3 className='text-bold-gray'>Hoàn thành</h3>
          {!loadGroup && finishGroups.length === 0 && 'Không có dữ liệu'}
          {!loadGroup && finishGroups.length !== 0 && (
            <AssignGroups groups={finishGroups} isFinish={true} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAssignment;
