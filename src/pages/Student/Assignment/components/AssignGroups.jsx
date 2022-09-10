import { Avatar, Collapse, Typography } from 'antd';

import Assign from './Assign';
import React from 'react';

const { Panel } = Collapse;

const AvatarOwner = ({ src, fullname }) => {
  if (!src) {
    const shortName = fullname
      .split(' ')
      .slice(-2)
      .map((str) => str[0])
      .join('');
    return (
      <Avatar
        style={{
          backgroundColor: '#7265e6',
          verticalAlign: 'middle',
        }}
        size='default'
        gap={2}
      >
        {shortName}
      </Avatar>
    );
  }
  return (
    <Avatar
      style={{
        verticalAlign: 'middle',
      }}
      size='default'
      gap={2}
      src={src}
    />
  );
};

const AssignGroups = ({ owner, classRoom, rosterGroups }) => {
  return (
    <Collapse accordion className='callapse-roster'>
      <Panel
        header={
          <div className='block-header-info'>
            <div className='heading-avatar'>
              <AvatarOwner fullname={owner.fullname} src={owner.avatarUrl} />
            </div>
            <div className='heading'>
              <Typography.Title level={5} className='title'>
                Gviên.{owner.fullname}
              </Typography.Title>
              <Typography.Text className='sub-title'>
                Lớp {classRoom.name}
              </Typography.Text>
            </div>
          </div>
        }
        key='1'
        extra={
          <Typography.Text>Số lượng đề: {rosterGroups.length}</Typography.Text>
        }
      >
        {rosterGroups.map(({ name, assignment }) => (
          <div style={{ marginBottom: 16 }}>
            <Assign
              _id={assignment._id}
              isFinish={false}
              name={assignment.name}
              key={assignment._id}
              desc={assignment.desc}
              groupName={name}
            />
          </div>
        ))}
      </Panel>
      <Panel
        header={
          <div className='block-header-info'>
            <div className='heading-avatar'>
              <AvatarOwner fullname={owner.fullname} src={owner.avatarUrl} />
            </div>
            <div className='heading'>
              <Typography.Title level={5} className='title'>
                Gviên.{owner.fullname}
              </Typography.Title>
              <Typography.Text className='sub-title'>
                Lớp {classRoom.name}
              </Typography.Text>
            </div>
          </div>
        }
        key='1'
        extra={
          <Typography.Text>Số lượng đề: {rosterGroups.length}</Typography.Text>
        }
      >
        {rosterGroups.map(({ name, assignment }) => (
          <div style={{ marginBottom: 16 }}>
            <Assign
              _id={assignment._id}
              isFinish={false}
              name={assignment.name}
              key={assignment._id}
              desc={assignment.desc}
              groupName={name}
            />
          </div>
        ))}
      </Panel>
    </Collapse>
  );
};

export default AssignGroups;
