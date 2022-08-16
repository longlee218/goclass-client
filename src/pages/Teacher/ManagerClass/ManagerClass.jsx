import './style.css';

import { Button, Input } from 'antd';
import {
  ClassAddedDrawer,
  ClassNewSessionDrawer,
} from '../../../components/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import ClassCardGroup from '../../../components/ClassCardGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import classRoomActions from '../../../redux/class_room/class_room.action';
import { classRoomsSelector } from '../../../redux/class_room/class_room.selector';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import studentActions from '../../../redux/student/student.action';

const { Search } = Input;

const ManagerClass = () => {
  const dispatch = useDispatch();
  const classRooms = useSelector(classRoomsSelector);
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [showNewSsDrawer, setShowNewSsDrawer] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    document.title = 'Danh sách lớp học';
  }, []);

  useEffect(() => {
    dispatch(classRoomActions.get());
    dispatch(studentActions.reset());
  }, []);

  const onClickAddClass = () => setShowAddDrawer(true);
  const onClickNewSessionClass = () => setShowNewSsDrawer(true);

  const onChangeSearchInput = (e) => {
    setSearchText(e.target.value);
    dispatch(classRoomActions.filter(e.target.value));
  };
  return (
    <>
      <div className='manager-class_wrapper'>
        <div className='manager-class_wrapper__actions'>
          <div className='manager-class_warapper__search'>
            <Search
              placeholder='Tìm kiếm'
              onSearch={() => {}}
              style={{ width: 300 }}
              onChange={onChangeSearchInput}
              value={searchText}
            />
          </div>
          <div className='manager-class_warapper__btngroup'>
            <Button
              shape='round'
              type='primary'
              danger
              className='wrapp-text-bold btn-warning'
              onClick={onClickAddClass}
            >
              Tạo lớp
            </Button>
            <Button
              shape='round'
              className='wrapp-text-bold'
              onClick={onClickNewSessionClass}
            >
              <FontAwesomeIcon icon={faPlus} />
              &nbsp; Tạo lớp cho khóa mới
            </Button>
          </div>
        </div>

        <div className='manager-class_warapper__classes'>
          <ClassCardGroup
            key='wrapper-class-group'
            classData={classRooms}
            setShowDrawer={setShowAddDrawer}
          />
        </div>
      </div>
      <ClassAddedDrawer visible={showAddDrawer} setVisible={setShowAddDrawer} />
      <ClassNewSessionDrawer
        visible={showNewSsDrawer}
        setVisible={setShowNewSsDrawer}
      />
    </>
  );
};

export default ManagerClass;
