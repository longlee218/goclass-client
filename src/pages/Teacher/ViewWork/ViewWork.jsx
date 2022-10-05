import './style.css';

import { Button, Select, Tooltip, Typography } from 'antd';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import React from 'react';
import Search from 'antd/lib/input/Search';
import { assignSelector } from '../../../redux/assign/assign.selector';
import examService from '../../../services/exam.service';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const { Option } = Select;

const ViewWork = () => {
  const params = useParams();
  const assignment = useSelector(assignSelector);
  const refSlideButton = useRef(null);
  const [isDisable, setIsDisable] = useState(true);
  const [rosterGroup, setRosterGroup] = useState(null);

  // useEffect(() => {
  //   const handleResize = () => {
  //     const { innerWidth } = window;
  //     const widthOffButton = 133;
  //     const marginOffButton = 20;
  //     //   const numDisplayButton =
  //     //     (innerWidth - 32 * 2) / (widthOffButton + marginOffButton);
  //   };
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  useEffect(() => {
    const rosterGroupId = params.rosterGroupId;
    if (rosterGroupId) {
      setIsDisable(false);
      examService.findRosterGroup(rosterGroupId).then((data) => {
        setRosterGroup(data);
      });
    }
  }, [params]);

  const assignPerStudent = ({
    name = 'Vô danh',
    points = '0/10',
    slides = [],
  }) => {
    return (
      <div className='layout-column'>
        <div className='d-flex flex-row gap-10'>
          <Typography.Text className='text-extra-gray'>{name}</Typography.Text>
          <Typography.Text className='text-extra-gray'>
            {points} điểm
          </Typography.Text>
        </div>
        <div className='d-flex flex-slide'>
          {slides.map((slide) => (
            <div
              className='slide-cell'
              dangerouslySetInnerHTML={{
                __html: slide.thumbnail,
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className='config-bar'>
        <div className='md-input'>
          <Typography.Text>
            Nhóm:{' '}
            <Typography.Text className='text-primary' strong>
              {rosterGroup?.name}
            </Typography.Text>
          </Typography.Text>
        </div>
        <div className='md-input'>
          <Tooltip title='Mã đề' placement='bottom'>
            <Button disabled={isDisable}>239048203</Button>
          </Tooltip>
        </div>
        <div className='divider'></div>
        <div className='md-input'>
          <Select
            defaultValue='all'
            style={{ width: 160 }}
            disabled={isDisable}
          >
            <Option value='all'>Xem hết</Option>
            {assignment?.slides?.map((slide) => {
              return <Option value={slide._id}>Slide #{slide.order}</Option>;
            })}
          </Select>
        </div>
        <div className='md-input'>
          <Select defaultValue='all' disabled={isDisable}>
            <Option value='all'>Tất cả học sinh</Option>
            {rosterGroup?.students?.map((student) => (
              <Option value={student._id}>{student.studentName}</Option>
            ))}
          </Select>
        </div>
        <div className='md-input'>
          <Search
            style={{ width: 260 }}
            placeholder='Tìm kiếm'
            disabled={isDisable}
          />
        </div>
      </div>
      <div className='d-flex flex-column'>
        {!isDisable && (
          <div className='session-work'>
            <div className='horizontall-scroll-button back'>
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <div className='horizontall-scroll-container'>
              <div className='horizontall-scroll'>
                <div
                  className='horizontall-scroll-content row'
                  ref={refSlideButton}
                >
                  {assignment?.slides?.map(({ order, _id }) => (
                    <div className='slide-cell'>
                      <Button>#Slide {order}</Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='horizontall-scroll-button next'>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </div>
        )}
        {isDisable ? (
          <div style={{ textAlign: 'center', marginTop: 100 }}>
            <Typography.Title level={5}>
              Hãy lựa chọn{' '}
              <b>
                <Link
                  to={
                    '/teacher/assignments/' + (assignment._id || '') + '/roster'
                  }
                >
                  {' '}
                  Nhóm Phân công
                </Link>
              </b>{' '}
              để bắt đầu
            </Typography.Title>
          </div>
        ) : (
          <div className='body-content'>
            <div className='virtual-container'>
              <div className='horizontall-scroll'>
                <div className='horizontall-scroll-content column'>
                  {rosterGroup?.students?.map((student) => {
                    return assignPerStudent({
                      name: student.studentName,
                      slides: assignment?.slides ?? [],
                    });
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewWork;
