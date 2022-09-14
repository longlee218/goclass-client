import './style.css';

import { Button, Card, Divider, Typography } from 'antd';
import React, { useState } from 'react';

import alertActions from '../../../redux/alert/alert.action';
import assignmentService from '../../../services/assignment.service';
import configActions from '../../../redux/config/config.actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const SlideBox = ({ link, thumbnail, order }) => {
  return (
    <Card
      hoverable
      style={{
        display: 'inline-block',
        boxShadow: '0 0 8px 1px rgb(64 67 69 / 17%)',
        width: 'calc(225px + 1.6rem)',
      }}
      bodyStyle={{
        height: 'calc(125px + (0.8rem * 2))',
        padding: 0,
      }}
      actions={[<Typography.Text strong>{order}</Typography.Text>]}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 140" width="250" height="152">
            ${thumbnail}
            </svg>
        `,
        }}
      />
    </Card>
  );
};

const AssignmentLibraryDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [assignShared, setAssignShared] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'Education';
    dispatch(configActions.setTitle(''));
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    assignmentService
      .findByIdShared(id)
      .then((data) => {
        setAssignShared(data);
      })
      .catch((error) => dispatch(alertActions.error(error.message)))
      .finally(() => setIsLoading(false));
  }, [dispatch, id]);

  return (
    <div className='assignment-container'>
      <div className='assignment-meta bg-white'>
        <div className='name-container'>
          <div className='name-container-title d-flex justify-content-between align-end'>
            <Typography.Text className='text-bold-gray' strong>
              Tên bài tập
            </Typography.Text>
            <Button type='primary' danger shape='round' size='large'>
              Sử dụng
            </Button>
          </div>
          <div className='name-container-title assign-name'>
            <Typography.Title level={1} className='text-primary' strong>
              {assignShared?.name}
            </Typography.Title>
          </div>
        </div>
        <Divider />
        <div className='description-container'>
          <div className='description-container-title'>
            <Typography.Text className='text-bold-gray' strong>
              Mô tả
            </Typography.Text>
          </div>
          <div className='description-container-content'>
            <Typography.Paragraph className='text-bold-gray'>
              {assignShared?.desc}
            </Typography.Paragraph>
          </div>
          <div className='assign-tags-layout'>
            <Typography.Paragraph strong className='subjects text-bold-gray'>
              Chủ đề&nbsp;&nbsp;
              <Typography.Text style={{ fontWeight: 'normal' }}>
                {assignShared?.subjects?.join(', ')}
              </Typography.Text>
            </Typography.Paragraph>
            <Typography.Paragraph strong className='text-bold-gray'>
              Cấp độ&nbsp;&nbsp;
              <Typography.Text style={{ fontWeight: 'normal' }}>
                {assignShared?.grades?.join(', ')}
              </Typography.Text>
            </Typography.Paragraph>
          </div>
        </div>
      </div>
      <div className='assignment-slides'>
        <div className='section-header'>
          <Typography.Title level={5} className='text-primary' strong>
            Danh sách Slides (Click vào để xem chi tiết)
          </Typography.Title>
        </div>
        <div className='section-slides'>
          {isLoading && 'Đang tải..'}
          {!assignShared ? (
            'Không có dữ liệu'
          ) : (
            <>
              {assignShared.slides.map((slide) => (
                <SlideBox thumbnail={slide.thumbnail} order={slide.order} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentLibraryDetail;
