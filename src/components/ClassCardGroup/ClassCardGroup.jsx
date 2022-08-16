import { Col, Row, Typography } from 'antd';

import ClassCard from '../ClassCard/ClassCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PopoverInfoClassGroup from '../PopoverInfoClassGroup';
import PropTypes from 'prop-types';
import React from 'react';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

const ClassCardGroup = ({ classData, setShowDrawer }) => {
  return (
    <div className='manager-class_wrapper__class-group'>
      <div className='' style={{ marginTop: '2rem' }}>
        {classData.length === 0 ? (
          <Typography>Đang tải...</Typography>
        ) : (
          classData.map(({ group, classRooms }) => (
            <div key={group?._id || 'other'}>
              <div className='divider'>
                <div className='d-flex justify-content-between w-100'>
                  <Typography.Title className='text-bold' level={5}>
                    {group?.name || 'Khác'}
                  </Typography.Title>
                  {group && (
                    <PopoverInfoClassGroup classGroup={group}>
                      <Link to='#'>
                        <em style={{ cursor: 'pointer' }}>
                          <FontAwesomeIcon icon={faEllipsis} size='lg' />
                        </em>
                      </Link>
                    </PopoverInfoClassGroup>
                  )}
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
                      <ClassCard
                        classRoom={classRoom}
                        setShowDrawer={setShowDrawer}
                      />
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
ClassCardGroup.propTypes = {
  classData: PropTypes.arrayOf(PropTypes.object).isRequired,
  setShowDrawer: PropTypes.func.isRequired,
};
export default ClassCardGroup;
