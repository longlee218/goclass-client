import { Button, Card, Space, Typography } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import examService from '../../../../services/exam.service';

const Assign = ({ _id, name, isFinish, desc, groupName, rosterGroupId }) => {
  const onClickJoinAssign = (e) => {
    examService.joinAssignment(_id, rosterGroupId).then((data) => {
      const link = data.link;
      window.open(link, '_blank');
    });
  };

  return (
    <Card size='small' hoverable key={_id}>
      <Space>
        <div className='block-body-status'>
          <FontAwesomeIcon
            icon={faFileLines}
            style={{ color: isFinish ? 'var(--success)' : 'var(--danger)' }}
            size='4x'
          />
        </div>
        <div className='block-body-content'>
          <Typography.Title level={5}>
            {name} - {groupName}
          </Typography.Title>
          <Typography.Paragraph>{desc}</Typography.Paragraph>
          <div className='d-flex gap-10' style={{ marginTop: 20 }}>
            {!isFinish ? (
              <Button type='primary' shape='round' onClick={onClickJoinAssign}>
                Làm bài
              </Button>
            ) : (
              <Button type='primary' shape='round' className='btn-cyan'>
                Xem lại
              </Button>
            )}
          </div>
        </div>
      </Space>
    </Card>
  );
};

export default Assign;
