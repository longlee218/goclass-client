import { Button, Space } from 'antd';

import AssignSlide from './AssignSlide';
import React from 'react';
import { assignSelector } from '../../../../redux/assign/assign.selector';
import { useSelector } from 'react-redux';

const AssignSlides = () => {
  const assignment = useSelector(assignSelector);
  return (
    <Space
      direction='horizontal'
      size={15}
      style={{ display: 'flex', flexWrap: 'wrap' }}
      align='center'
    >
      {assignment?.slides?.map((item) => (
        <AssignSlide slide={item} />
      ))}
      <Button className='btn_add--slide' type='dashed'>
        Thêm Slide
      </Button>
    </Space>
  );
};

export default AssignSlides;
