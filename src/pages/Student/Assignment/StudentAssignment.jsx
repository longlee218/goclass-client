import './style.css';

import AssignGroups from './components/AssignGroups';
import React from 'react';
import Search from 'antd/lib/transfer/search';
import alertActions from '../../../redux/alert/alert.action';
import examService from '../../../services/exam.service';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useReducer } from 'react';
import { useState } from 'react';

function rosterGroupReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'set':
      const todo = payload.map((e) => {
        return {
          ...e,
          rosterGroups: e.rosterGroups.filter(
            (item) =>
              item.status === 'ready' &&
              (!item.assignment_work || !item.assignment_work?.isFinish)
          ),
        };
      });
      const finish = payload.map((e) => {
        return {
          ...e,
          rosterGroups: e.rosterGroups.filter(
            (item) =>
              item.status === 'finished' ||
              (item.assignment_work && item.assignment_work.isFinish)
          ),
        };
      });
      return { todo, finish };
    default:
      return state;
  }
}

const StudentAssignment = () => {
  const dispatch = useDispatch();
  const [trigger, setTrigger] = useState(false);
  const [loadGroup, setLoadGroup] = useState(false);
  const [rosterGroups, dispatchRosterGroups] = useReducer(rosterGroupReducer, {
    todo: [],
    finish: [],
  });

  useEffect(() => {
    setLoadGroup(true);
    examService
      .getToDoExam()
      .then((data) => {
        dispatchRosterGroups({ type: 'set', payload: data });
      })
      .finally(() => setLoadGroup(false))
      .catch((error) => dispatch(alertActions.error(error.message)));
  }, [dispatch, trigger]);

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
          {!loadGroup && rosterGroups.todo.length === 0 && 'Không có dữ liệu'}
          {!loadGroup && rosterGroups.todo.length !== 0 && (
            <AssignGroups
              groups={rosterGroups.todo}
              onlyView={false}
              setTrigger={setTrigger}
            />
          )}
        </div>
        <div className='roster-group finish-group'>
          <h3 className='text-bold-gray'>Hoàn thành</h3>
          {!loadGroup && rosterGroups.finish.length === 0 && 'Không có dữ liệu'}
          {!loadGroup && rosterGroups.finish.length !== 0 && (
            <AssignGroups
              groups={rosterGroups.finish}
              onlyView
              setTrigger={setTrigger}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAssignment;
