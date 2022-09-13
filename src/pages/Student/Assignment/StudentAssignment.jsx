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
          {!loadTodoGroup && todoGroups.length !== 0 && (
            <AssignGroups groups={todoGroups} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAssignment;
