import './style.css';

import { Button, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { Content } from 'antd/lib/layout/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Roster from './components/Roster';
import RosterGroupDrawer from '../../../components/Drawer/RosterGroupDrawer';
import { assignSelector } from '../../../redux/assign/assign.selector';
import classRoomActions from '../../../redux/class_room/class_room.action';
import examService from '../../../services/exam.service';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useState } from 'react';

const AssignSlide = () => {
  const dispatch = useDispatch();
  const assignment = useSelector(assignSelector);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rosterGroups, setRosterGroup] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const onOpenDrawer = () => {
    setIsOpenDrawer(true);
  };

  useEffect(() => {
    if (!assignment?._id) {
      dispatch(classRoomActions.get());
    }
  }, [dispatch, assignment]);

  useEffect(() => {
    if (assignment._id) {
      setIsLoading(true);
      examService
        .getRosterGroup(assignment.roster)
        .then((data) => {
          setRosterGroup(data);
        })
        .finally(() => setIsLoading(false));
    }
  }, [assignment._id, assignment.roster, trigger]);

  const RosterGroupsLayout = ({ groups, setTrigger }) => {
    if (groups.length === 0) {
      return <div className='classroom-layout'>Không có dữ liệu</div>;
    }
    return groups.map((rosterGroup) => (
      <div className='classroom-layout'>
        <div className='classroom-layout-title'>
          <Typography.Paragraph>{rosterGroup.date}</Typography.Paragraph>
        </div>
        <div className='classroom-layout-content'>
          {rosterGroup.items.map((item) => (
            <Roster item={item} setTrigger={setTrigger} />
          ))}
        </div>
      </div>
    ));
  };

  return (
    <Content style={{ padding: '10px 50px' }}>
      <div className='site-layout-content'>
        <div
          className='d-flex justify-content-between'
          style={{ alignItems: 'flex-end' }}
        >
          <Button
            shape='round'
            type='primary'
            danger
            size='large'
            onClick={onOpenDrawer}
          >
            Tạo
          </Button>
          <Button shape='round' className='wrapp-text-bold'>
            <FontAwesomeIcon icon={faCalendar} />
            &nbsp; Lịch ktra
          </Button>
        </div>
        <div className='layout'>
          {isLoading ? (
            'Đang tải...'
          ) : (
            <RosterGroupsLayout groups={rosterGroups} setTrigger={setTrigger} />
          )}
        </div>
      </div>
      {assignment && (
        <RosterGroupDrawer
          visible={isOpenDrawer}
          setVisible={setIsOpenDrawer}
          assignment={assignment}
          setTrigger={setTrigger}
        />
      )}
    </Content>
  );
};

export default AssignSlide;
