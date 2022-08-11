import AssignSlide from './AssignSlide';
import React from 'react';
import { Row } from 'antd';

const AssignSlides = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-start',
        gap: '15px',
      }}
    >
      <AssignSlide />
      <AssignSlide />
      <AssignSlide />
      <AssignSlide />
      <AssignSlide />
      <AssignSlide />
      <AssignSlide />
      <AssignSlide />
      <AssignSlide />
    </div>
  );
};

export default AssignSlides;
