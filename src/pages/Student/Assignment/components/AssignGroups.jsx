import { Collapse, Typography } from 'antd';

import Assign from './Assign';
import AvatarOwner from '../../../../components/AvatarOwner/AvatarOwner';
import React from 'react';

const { Panel } = Collapse;

const AssignGroups = ({ groups }) => {
  return (
    <Collapse className='callapse-roster' defaultActiveKey={['1']}>
      {groups.map(({ owner, classRoom, rosterGroups }, index) => (
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
          key={(index + 1).toString()}
          extra={
            <Typography.Text>
              Số lượng đề: {rosterGroups.length}
            </Typography.Text>
          }
        >
          {rosterGroups.map(({ name, isFull, assignment }) => (
            <div style={{ marginBottom: 16 }}>
              <Assign
                _id={assignment._id}
                isFinish={false}
                name={assignment.name}
                key={assignment._id}
                desc={assignment.desc}
                groupName={isFull ? 'Cả lớp' : `Nhóm ${name}`}
              />
            </div>
          ))}
        </Panel>
      ))}
      {/* <Panel
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
        key=
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
      </Panel> */}
    </Collapse>
  );
};

export default AssignGroups;
