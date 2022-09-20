import { Button, Col, Row, Typography } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import React from 'react';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

const TabDocument = () => {
  return (
    <div>
      <div
        className='d-flex gap-10 justify-flex-end '
        style={{ marginBottom: '1rem' }}
      >
        <Button type='primary' danger shape='round'>
          Thêm tài liệu
        </Button>
      </div>
      <div
        style={{
          marginTop: 16,
          padding: '25px 16px',
          backgroundColor: '#fff',
          overflowY: 'auto',
          borderRadius: '4x',
          minHeight: 'calc(100vh - 20rem - 5px)',
        }}
      >
        <div className='flex'>
          <div className='flex-item'>
            <Link to={'#'}>
              <FontAwesomeIcon
                icon={faFileLines}
                style={{ color: 'var(--danger)' }}
                size='4x'
              />
            </Link>
            <div className='d-flex flex-1 justify-content-center'>
              <Link to={'#'}>
                <Typography.Text>Troi oi tin duoc khong</Typography.Text>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <Col span={24}>
          {notifies.map((notify) => (
            <NotifyCard
              notify={notify}
              setIsOpenDrawer={setIsOpenDrawer}
              setCurrentAlert={setCurrentAlert}
            />
          ))}
        </Col> */}
    </div>
  );
};

export default TabDocument;
