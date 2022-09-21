import { Col, Row, Typography } from 'antd';

import ClassCard from '../ClassCard/ClassCard';
import React from 'react';

const ClassCardGroupStudent = ({ classData }) => {
  return (
    <div className='manager-class_wrapper__class-group'>
      <div className='' style={{ marginTop: '2rem' }}>
        {classData.length === 0 ? (
          <Typography>Đang tải...</Typography>
        ) : (
          classData.map(({ owner, classRooms }) => (
            <div key={owner?._id || 'other'}>
              <div className='divider'>
                <div className='d-flex justify-content-between w-100'>
                  <Typography.Title className='text-bold' level={5}>
                    Gviên. {owner.fullname}
                  </Typography.Title>
                </div>
              </div>
              <Row gutter={[16, 16]}>
                {classRooms.length === 0 ? (
                  <Col>
                    <Typography.Text>Không có dữ liệu</Typography.Text>
                  </Col>
                ) : (
                  classRooms.map((classRoom) => (
                    <Col
                      key={classRoom._id}
                      xs={24}
                      sm={12}
                      md={8}
                      lg={6}
                      xl={6}
                      xxl={6}
                    >
                      <ClassCard classRoom={classRoom} />
                    </Col>
                  ))
                )}
              </Row>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClassCardGroupStudent;
