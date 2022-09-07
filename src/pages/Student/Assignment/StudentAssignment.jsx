import './style.css';

import { Avatar, Card, Collapse, Space, Typography } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Search from 'antd/lib/transfer/search';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';

const { Meta } = Card;
const { Panel } = Collapse;
const StudentAssignment = () => {
  return (
    <div className='assginment-wrapper'>
      <div className='assignment-box assignment-new'>
        <div className='assignment-box__search'>
          <Search placeholder='Tìm kiếm' onSearch={() => {}} />
        </div>
        <div className='roster-group'>
          <Collapse accordion>
            <Panel
              header={
                <div className='block-header-info'>
                  <div className='heading-avatar'>
                    <Avatar
                      style={{
                        backgroundColor: '#7265e6',
                        verticalAlign: 'middle',
                      }}
                      size='default'
                      gap={2}
                    >
                      LL
                    </Avatar>
                  </div>
                  <div className='heading'>
                    <Typography.Title level={5} className='title'>
                      Thầy Lê hoàng Long
                    </Typography.Title>
                    <Typography.Text className='sub-title'>
                      Nhóm số 1 Lớp Lập trình Python cơ bản
                    </Typography.Text>
                  </div>
                </div>
              }
              key='1'
              extra={<Typography.Text>Số lượng đề: 2</Typography.Text>}
            >
              <Card size='small' hoverable style={{ marginBottom: 16 }}>
                <Space>
                  <div className='block-body-status'>
                    <FontAwesomeIcon
                      icon={faFileLines}
                      style={{ color: 'var(--danger)' }}
                      size='4x'
                    />
                  </div>
                  <div className='block-body-content'>
                    <Typography.Title level={5}>
                      Đề kiêm tra Python cơ bản - Ngày 09/07/2022
                    </Typography.Title>
                    <Typography.Paragraph>
                      Lưu ý: Sau khi làm xong, phải báo cáo lại ngay với quản
                      trị viên hoặc giáo viên để kiểm tra. Không nộp bài trực
                      tiếp
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      Thời gian làm bài: Không giới hạn
                    </Typography.Paragraph>
                  </div>
                </Space>
              </Card>
              <Card size='small' hoverable style={{ marginBottom: 16 }}>
                <Space>
                  <div className='block-body-status'>
                    <FontAwesomeIcon
                      icon={faFileLines}
                      style={{ color: 'var(--danger)' }}
                      size='4x'
                    />
                  </div>
                  <div className='block-body-content'>
                    <Typography.Title level={5}>
                      Đề kiêm tra Python cơ bản - Ngày 09/07/2022
                    </Typography.Title>
                    <Typography.Paragraph>
                      Lưu ý: Sau khi làm xong, phải báo cáo lại ngay với quản
                      trị viên hoặc giáo viên để kiểm tra. Không nộp bài trực
                      tiếp
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      Thời gian làm bài: Không giới hạn
                    </Typography.Paragraph>
                  </div>
                </Space>
              </Card>
            </Panel>
          </Collapse>
        </div>
        <div className='roster-group'>
          <Collapse accordion>
            <Panel
              header={
                <Typography.Title level={5} className='title'>
                  Các đề đã làm
                </Typography.Title>
              }
              key='1'
              extra={<Typography.Text>Số lượng đề: 2</Typography.Text>}
            >
              <Card size='small' hoverable style={{ marginBottom: 16 }}>
                <Space>
                  <div className='block-body-status'>
                    <FontAwesomeIcon
                      icon={faFileLines}
                      style={{ color: 'var(--success)' }}
                      size='4x'
                    />
                  </div>
                  <div className='block-body-content'>
                    <Typography.Title level={5}>
                      Javascript ES6 - Ngày 09/07/2022
                    </Typography.Title>
                    <Typography.Paragraph>
                      Thời gian làm bài: 14:30 07/09/2022 - không giới hạn
                    </Typography.Paragraph>
                  </div>
                </Space>
              </Card>
              <Card size='small' hoverable style={{ marginBottom: 16 }}>
                <Space>
                  <div className='block-body-status'>
                    <FontAwesomeIcon
                      icon={faFileLines}
                      style={{ color: 'var(--success)' }}
                      size='4x'
                    />
                  </div>
                  <div className='block-body-content'>
                    <Typography.Title level={5}>
                      Javascript ES6 - Ngày 09/07/2022
                    </Typography.Title>
                    <Typography.Paragraph>
                      Thời gian làm bài: 14:30 07/09/2022 - không giới hạn
                    </Typography.Paragraph>
                  </div>
                </Space>
              </Card>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default StudentAssignment;
