import { Collapse, Typography } from 'antd';

import Assign from './Assign';
import AvatarOwner from '../../../../components/AvatarOwner/AvatarOwner';
import React from 'react';

const { Panel } = Collapse;

const AssignGroups = ({ groups, onlyView }) => {
  return (
    <Collapse className='callapse-roster' defaultActiveKey={['1']}>
      {groups.map(({ owner, classRoom, rosterGroups }, index) => {
        if (rosterGroups.length !== 0) {
          return (
            <Panel
              header={
                <div className='block-header-info'>
                  <div className='heading-avatar'>
                    <AvatarOwner
                      fullname={owner.fullname}
                      src={owner.avatarUrl}
                    />
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
              {rosterGroups.map(
                ({ _id, name, isFull, assignment, assignment_work }) => (
                  <div style={{ marginBottom: 16 }}>
                    <Assign
                      _id={assignment._id}
                      assignWork={assignment_work}
                      onlyView={onlyView}
                      name={assignment.name}
                      key={assignment._id}
                      rosterGroupId={_id}
                      desc={assignment.desc}
                      groupName={isFull ? 'Cả lớp' : `Nhóm ${name}`}
                    />
                  </div>
                )
              )}
            </Panel>
          );
        }
        return null;
      })}
    </Collapse>
  );
};

export default AssignGroups;
