import './style.css';

import AssignForm from './components/AssignForm';
import AssignSlides from './components/AssignSlides';
import React from 'react';

const Assignment = () => {
  return (
    <>
      <div className='assign-container'>
        <div className='assign-wrapper bg-white'>
          <AssignForm />
        </div>
        <div className='assign-wrapper'>
          <AssignSlides />
        </div>
      </div>
    </>
  );
};

export default Assignment;
