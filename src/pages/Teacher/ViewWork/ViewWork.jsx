import './style.css';

import { Button, Select, Tooltip, Typography } from 'antd';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Search from 'antd/lib/input/Search';
import { useEffect } from 'react';
import { useRef } from 'react';

const { Option } = Select;

const ViewWork = () => {
  const refSlideButton = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      const widthOffButton = 133;
      const marginOffButton = 20;
      //   const numDisplayButton =
      //     (innerWidth - 32 * 2) / (widthOffButton + marginOffButton);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className='config-bar'>
        <div className='md-input'>
          <Tooltip title='Lựa chọn nhóm phân công' placement='bottom'>
            <Select defaultValue='lucy' style={{ width: 160 }}>
              <Option value='jack'>Jack</Option>
              <Option value='lucy'>Lucy</Option>
              <Option value='disabled' disabled>
                Disabled
              </Option>
              <Option value='Yiminghe'>yiminghe</Option>
            </Select>
          </Tooltip>
        </div>
        <div className='md-input'>
          <Tooltip title='Mã đề' placement='bottom'>
            <Button>239048203</Button>
          </Tooltip>
        </div>
        <div className='divider'></div>
        <div className='md-input'>
          <Tooltip title='Lựa chọn nhóm phân công' placement='bottom'>
            <Select defaultValue='all' style={{ width: 160 }}>
              <Option value='all'>Xem hết</Option>
              <Option value='1'>Slide #1</Option>
              <Option value='2'>Slide #2</Option>
              <Option value='3'>Slide #3</Option>
              <Option value='4'>Slide #4</Option>
              <Option value='5'>Slide #5</Option>
            </Select>
          </Tooltip>
        </div>
        <div className='md-input'>
          <Tooltip title='Sắp xếp' placement='bottom'>
            <Select defaultValue='all'>
              <Option value='all'>Tên học sinh A-Z</Option>
              <Option value='1'>Tên học sinh Z-A</Option>
              <Option value='2'>Tham gia lần cuối</Option>
              <Option value='3'>Tham gia lần đầu</Option>
            </Select>
          </Tooltip>
        </div>
        <div className='md-input'>
          <Search style={{ width: 260 }} placeholder='Tìm kiếm' />
        </div>
      </div>
      <div className='d-flex flex-column'>
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
                {Array.from(Array(5).keys()).map((i) => (
                  <div className='slide-cell'>
                    <Button>#Slide {i + 1}</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='horizontall-scroll-button next'>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
        <div className='body-content'>
          <div className='virtual-container'>
            <div className='horizontall-scroll'>
              <div className='horizontall-scroll-content column'>
                <div className='layout-column'>
                  <div className='d-flex flex-row gap-10'>
                    <Typography.Text className='text-extra-gray'>
                      Le Hoang Long
                    </Typography.Text>
                    <Typography.Text className='text-extra-gray'>
                      2/10 điểm
                    </Typography.Text>
                  </div>
                  <div className='d-flex flex-slide'>
                    {Array.from(Array(5).keys()).map((i) => (
                      <div className='slide-cell'></div>
                    ))}
                  </div>
                </div>
                <div className='layout-column'>
                  <div className='d-flex flex-row gap-10'>
                    <Typography.Text className='text-extra-gray'>
                      Le Hoang Long
                    </Typography.Text>
                    <Typography.Text className='text-extra-gray'>
                      2/10 điểm
                    </Typography.Text>
                  </div>
                  <div className='d-flex flex-slide'>
                    {Array.from(Array(5).keys()).map((i) => (
                      <div className='slide-cell'></div>
                    ))}
                  </div>
                </div>
                <div className='layout-column'>
                  <div className='d-flex flex-row gap-10'>
                    <Typography.Text className='text-extra-gray'>
                      Le Hoang Long
                    </Typography.Text>
                    <Typography.Text className='text-extra-gray'>
                      2/10 điểm
                    </Typography.Text>
                  </div>
                  <div className='d-flex flex-slide'>
                    {Array.from(Array(5).keys()).map((i) => (
                      <div className='slide-cell'></div>
                    ))}
                  </div>
                </div>
                <div className='layout-column'>
                  <div className='d-flex flex-row gap-10'>
                    <Typography.Text className='text-extra-gray'>
                      Le Hoang Long
                    </Typography.Text>
                    <Typography.Text className='text-extra-gray'>
                      2/10 điểm
                    </Typography.Text>
                  </div>
                  <div className='d-flex flex-slide'>
                    {Array.from(Array(5).keys()).map((i) => (
                      <div className='slide-cell'></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewWork;
