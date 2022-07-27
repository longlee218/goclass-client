import './style.css';

import { Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import ClassAddedDrawer from '../../../components/ClassAddedDrawer';
import ClassCardGroup from '../../../components/ClassCardGroup';
import React from 'react';
import classRoomActions from '../../../redux/class_room/class_room.action';
import { classRoomsSelector } from '../../../redux/class_room/class_room.selector';

const { Search } = Input;

const ManagerClass = () => {
  const dispatch = useDispatch();
  const classRooms = useSelector(classRoomsSelector);
  const [showClassAddedDrawer, setShowClassAddedDrawer] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    document.title = 'Danh sách lớp học';
  }, []);

  useEffect(() => {
    dispatch(classRoomActions.get());
  }, [dispatch]);

  const onClickAddClass = () => setShowClassAddedDrawer(true);
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
              placeholder='Lọc tên lớp học'
              onSearch={() => {}}
              style={{ width: 300 }}
              onChange={onChangeSearchInput}
              value={searchText}
            />
          </div>
          <div className='manager-class_warapper__btngroup'>
            <Button
              shape='round'
              className='wrapp-text-bold btn-success'
              style={{ color: '#fff' }}
              onClick={onClickAddClass}
            >
              Tạo lớp
            </Button>
            <Button type='text' className='wrapp-text-bold'>
              Tạo lớp cho khóa mới
            </Button>
          </div>
        </div>
        <div className='manager-class_warapper__classes'>
          <ClassCardGroup
            key='wrapper-class-group'
            classData={classRooms}
            setShowDrawer={setShowClassAddedDrawer}
          />
        </div>
      </div>
      <ClassAddedDrawer
        key='drawer-class-added'
        visible={showClassAddedDrawer}
        setVisible={setShowClassAddedDrawer}
      />
    </>
  );
};

export default ManagerClass;
