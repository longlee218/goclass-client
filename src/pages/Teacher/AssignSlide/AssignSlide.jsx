import './style.css';

import { Button, Input, Space, Table, Tag, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { Content } from 'antd/lib/layout/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Roster from './components/Roster';
import RosterGroupDrawer from '../../../components/Drawer/RosterGroupDrawer';
import Search from 'antd/lib/transfer/search';
import { assignSelector } from '../../../redux/assign/assign.selector';
import classRoomActions from '../../../redux/class_room/class_room.action';
import examService from '../../../services/exam.service';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useState } from 'react';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';

          if (tag === 'loser') {
            color = 'volcano';
          }

          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const AssignSlide = () => {
  const dispatch = useDispatch();
  const assignment = useSelector(assignSelector);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rosterGroups, setRosterGroup] = useState([]);
  const [currentRosterGroup, setCurrentRosterGroup] = useState(null);
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
    console.log({ assignment });
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

  const RosterGroupsLayout = ({
    groups,
    setTrigger,
    onOpenDrawer,
    setRosterGroup,
  }) => {
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
            <Roster
              item={item}
              setTrigger={setTrigger}
              onOpenDrawer={onOpenDrawer}
              setRosterGroup={setRosterGroup}
            />
          ))}
        </div>
      </div>
    ));
  };

  return (
    <Content style={{ padding: '10px 38px' }}>
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
          {/* <Button shape='round' className='wrapp-text-bold'>
            <FontAwesomeIcon icon={faCalendar} />
            &nbsp; Lịch ktra
          </Button> */}
        </div>
        <div className='layout'>
          {isLoading ? (
            <div className='classroom-layout'>Đang tải...</div>
          ) : (
            <RosterGroupsLayout
              groups={rosterGroups}
              setTrigger={setTrigger}
              onOpenDrawer={onOpenDrawer}
              setRosterGroup={setCurrentRosterGroup}
            />
          )}
        </div>
      </div>
      {assignment && (
        <RosterGroupDrawer
          visible={isOpenDrawer}
          setVisible={setIsOpenDrawer}
          rosterId={assignment.roster}
          setTrigger={setTrigger}
          rosterGroup={currentRosterGroup}
          setRosterGroup={setCurrentRosterGroup}
        />
      )}
    </Content>
  );
};

export default AssignSlide;
