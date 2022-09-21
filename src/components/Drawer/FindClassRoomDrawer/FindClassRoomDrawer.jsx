import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';

import DrawerBase from '../DrawerBase';
import React from 'react';
import alertActions from '../../../redux/alert/alert.action';
import classRoomService from '../../../services/classRoom.service';
import { useDispatch } from 'react-redux';
import { useForm } from 'antd/lib/form/Form';
import { useState } from 'react';

const FindClassRoomDrawer = ({ visible, setVisible, setTrigger }) => {
  const [form] = useForm();
  const [classRoomFinding, setClassRoomFinding] = useState(null);
  const dispatch = useDispatch();

  const onClose = () => {
    setVisible(false);
    form.setFieldsValue({
      classCode: null,
    });
  };

  const onJoinClass = () => {
    dispatch(alertActions.loading());
    classRoomService
      .joinClass(classRoomFinding._id)
      .then(() => {
        setTrigger((prev) => !prev);
        onClose();
        dispatch(alertActions.success());
      })
      .catch((error) => dispatch(alertActions.error(error.message)));
  };

  const onFindClass = () => {
    const classCode = form.getFieldValue('classCode');
    classRoomService
      .query({ q: { hashId: classCode, isCanJoin: true }, limit: 1 })
      .then((data) => {
        dispatch(alertActions.clear());
        setClassRoomFinding(data);
        form.setFieldsValue({
          classCode: null,
        });
      })
      .catch(() =>
        dispatch(alertActions.error('Không tìm thấy mã lớp: ' + classCode))
      );
  };

  return (
    <DrawerBase
      key='finding-class-drawer'
      className='setting-class-drawer'
      title='Xin vào lớp'
      onClose={onClose}
      visible={visible}
    >
      {visible && (
        <>
          <Form layout='vertical' requiredMark={false} form={form}>
            <Row gutter={16} style={{ marginRight: 0 }}>
              <Col span={24}>
                <Form.Item
                  name='classCode'
                  label='Tìm kiếm'
                  rules={[{ required: true, message: 'Vui lòng nhập mã lớp.' }]}
                >
                  <Input placeholder='Nhập mã lớp' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginRight: 0 }}>
              <Col span={24}>
                <Form.Item>
                  <Button
                    type='primary'
                    className='btn-success'
                    shape='round'
                    htmlType='button'
                    onClick={onFindClass}
                  >
                    Tìm kiếm
                  </Button>
                </Form.Item>
              </Col>
            </Row>
            {JSON.stringify(classRoomFinding) === '{}' && 'Không tìm thấy'}
            {classRoomFinding && Object.keys(classRoomFinding).length !== 0 && (
              <Row gutter={16} style={{ marginRight: 0, marginTop: 8 }}>
                <Col span={24}>
                  <Card
                    hoverable
                    key={classRoomFinding._id}
                    size='small'
                    bordered={true}
                    title={
                      <div className='d-flex align-center'>
                        {classRoomFinding.color && (
                          <div
                            className='color-circle'
                            style={{
                              backgroundColor: classRoomFinding.color,
                              marginRight: 10,
                            }}
                          />
                        )}
                        <Typography>{classRoomFinding.name}</Typography>
                      </div>
                    }
                    onClick={onJoinClass}
                  >
                    <div className='d-flex justify-content-between'>
                      <Typography.Text strong>
                        Sĩ số: {classRoomFinding.countStudents}
                      </Typography.Text>
                      <Typography.Text
                        type='secondary'
                        style={{ fontSize: 11 }}
                      >
                        Năm học: {classRoomFinding.session}
                      </Typography.Text>
                    </div>
                  </Card>
                </Col>
              </Row>
            )}
          </Form>
        </>
      )}
    </DrawerBase>
  );
};

export default FindClassRoomDrawer;
