import './style.css';

import { Button } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Roster from './components/Roster';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const AssignSlide = () => {
  return (
    <Content style={{ padding: '10px 50px' }}>
      <div className='site-layout-content'>
        <div className='d-flex justify-content-between'>
          <Button shape='round' type='primary' danger size='large'>
            Tạo
          </Button>
          <Button shape='round' className='wrapp-text-bold'>
            <FontAwesomeIcon icon={faCalendar} />
            &nbsp; Lịch học
          </Button>
        </div>
        <div className='classroom-layout-content'>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Roster item={item} />
          ))}
        </div>
      </div>
    </Content>
  );
};

export default AssignSlide;
