import { Button } from 'antd';
import React from 'react';

const AssignDirector = () => {
  return (
    <section className='app__header--assignManager_center'>
      <div className='border-button'></div>
      <Button type='primary'>Chỉnh sửa</Button>
      <Button>Phân công</Button>
      <Button>Theo dõi</Button>
    </section>
  );
};

export default AssignDirector;
