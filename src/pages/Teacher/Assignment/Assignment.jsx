import './style.css';

import AssignForm from './components/AssignForm';
import AssignSlides from './components/AssignSlides';
import React from 'react';

const Assignment = () => {
  return (
    <div>
      <AssignForm />
      <AssignSlides />
    </div>
  );
};

export default Assignment;
