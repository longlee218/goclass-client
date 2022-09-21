import React, { useEffect, useState } from 'react';

import { Button } from 'antd';
import ClassCardGroupStudent from '../../../components/ClassCardGroupStudent/ClassCardGroupStudent';
import FindClassRoomDrawer from '../../../components/Drawer/FindClassRoomDrawer/FindClassRoomDrawer';
import Search from 'antd/lib/input/Search';
import alertActions from '../../../redux/alert/alert.action';
import classRoomService from '../../../services/classRoom.service';
import { useDispatch } from 'react-redux';

const StudentClassRoom = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [classRooms, setClassRooms] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const dispatch = useDispatch();
  const onOpenDrawer = () => {
    setIsOpenDrawer(true);
  };

  useEffect(() => {
    classRoomService
      .belong()
      .then((data) => {
        setClassRooms(data);
      })
      .catch((error) => dispatch(alertActions.error(error.message)));
  }, [dispatch, trigger]);

  const onChangeSearchInput = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <div className='manager-class_wrapper'>
        <div className='manager-class_wrapper__actions'>
          <div className='manager-class_wrapper__search'>
            <Search
              placeholder='Tìm kiếm'
              style={{ width: 300 }}
              onChange={onChangeSearchInput}
              value={searchText}
            />
          </div>
          <div className='manager-class_warapper__btngroup'>
            <Button type='primary' danger shape='round' onClick={onOpenDrawer}>
              Xin vào lớp
            </Button>
          </div>
        </div>
        <div className='manager-class_warapper__classes'>
          <ClassCardGroupStudent
            key='wrapper-class-group'
            classData={classRooms}
          />
        </div>
      </div>
      <div className='drawer'>
        <FindClassRoomDrawer
          visible={isOpenDrawer}
          setVisible={setIsOpenDrawer}
          setTrigger={setTrigger}
        />
      </div>
    </>
  );
};

export default StudentClassRoom;
