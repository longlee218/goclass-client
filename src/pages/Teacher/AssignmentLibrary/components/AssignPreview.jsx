import { Badge, Card, Typography } from 'antd';

import React from 'react';
import moment from 'moment';
import { teacherRouteConfig } from '../../../../config/route.config';
import { useNavigate } from 'react-router';

const AssignPreview = ({
  assignId,
  thumbnail,
  name,
  description,
  subjects,
  grades,
  createdAt,
  countDownload = 0,
}) => {
  const navigate = useNavigate();

  const onClickDetail = () => {
    navigate(
      teacherRouteConfig.assignmentLibraryDetail.replace(':id', assignId)
    );
  };

  const box = () => (
    <div className='assign-preview'>
      <span className='assign-preview__image'>
        <Card
          hoverable
          className='assign-box'
          style={{
            display: 'inline-block',
            boxShadow: '0 0 8px 1px rgb(64 67 69 / 17%)',
            width: 'calc(225px + 1.6rem)',
          }}
          bodyStyle={{
            height: 'calc(125px + (0.8rem * 2))',
            padding: 0,
          }}
        >
          {thumbnail ? (
            <div
              onClick={onClickDetail}
              dangerouslySetInnerHTML={{
                __html:
                  thumbnail ?? '<div style="width:248px;height:152px"></div>',
              }}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                alignContent: 'center',
                height: '100%',
                justifyContent: 'center',
              }}
            >
              <Typography>NO IMAGE PREVIEW</Typography>
            </div>
          )}
        </Card>
      </span>
      <span className='assign-info'>
        <div className='d-flex' style={{ justifyContent: 'space-around' }}>
          <div className='assign-info__title' onClick={onClickDetail}>
            {name}
          </div>
          <div className='assign-info__download'>{countDownload} lượt tải</div>
        </div>
        <div className='assign-info__description'>{description}</div>
        <div className='assign-info__tags'>
          <div className='subjects'>
            Chủ đề: {subjects ? subjects.join(', ') : 'Không có'}
          </div>
          <div className='grades'>
            Cấp độ: {grades ? grades.join(', ') : 'Không có'}
          </div>
        </div>
      </span>
    </div>
  );
  return (
    <>
      {moment().diff(moment(createdAt), 'days') <= 1 ? (
        <Badge.Ribbon text='mới' color='red'>
          {box()}
        </Badge.Ribbon>
      ) : (
        box()
      )}
    </>
  );
};

export default AssignPreview;
