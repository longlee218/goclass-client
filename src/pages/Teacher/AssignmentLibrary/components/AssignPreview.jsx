import { Card, Typography } from 'antd';

import React from 'react';
import { teacherRouteConfig } from '../../../../config/route.config';
import { useNavigate } from 'react-router';

const AssignPreview = ({
  assignId,
  thumbnail,
  name,
  description,
  subjects,
  grades,
  countDownload = 0,
}) => {
  const navigate = useNavigate();

  const onClickDetail = () => {
    navigate(
      teacherRouteConfig.assignmentLibraryDetail.replace(':id', assignId)
    );
  };

  return (
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
                __html: `
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 140" width="250" height="152">
              ${thumbnail}
            </svg>
        `,
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
          <div className='subjects'>Chủ đề: {subjects.join(', ')}</div>
          <div className='grades'>Cấp độ: {grades.join(', ')}</div>
        </div>
      </span>
    </div>
  );
};

export default AssignPreview;
