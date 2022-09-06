import { Button, Checkbox, Col, Form, Input, Radio, Row, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import DatePickerVN from '../../DatePickerVN';
import DrawerBase from '../DrawerBase';
import RangeDatePickerVN from '../../RangeDatePickerVN';
import React from 'react';
import alertActions from '../../../redux/alert/alert.action';
import { classRoomsOnlySelector } from '../../../redux/class_room/class_room.selector';
import examService from '../../../services/exam.service';
import { removeVietnameseTones } from '../../../helpers/string.helper';
import studentService from '../../../services/student.service';
import { useState } from 'react';

const { Option } = Select;

const RosterGroupDrawer = ({ visible, setVisible, assignment }) => {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const classRooms = useSelector(classRoomsOnlySelector);
  const [form] = Form.useForm();
  const [isFull, setIsFull] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    setVisible(false);
    setIsFull(true);
    form.setFieldsValue({
      isFull: true,
      classRoom: null,
      name: '',
      students: [],
    });
  };

  const onChangeRadio = (e) => {
    setIsFull(e.target.value);
    if (e.target.value === false) {
      if (form.getFieldValue('classRoom')) {
        studentService
          .getOfClass(form.getFieldValue('classRoom'))
          .then((students) => {
            setStudents(students);
          });
      }
    }
  };

  const onChangeSelectClassRoom = (classId) => {
    if (classId && !isFull) {
      studentService.getOfClass(classId).then((students) => {
        setStudents(students);
      });
    }
  };

  const onChangeCheckboxStudents = (values) => {
    console.log({ students: values });
  };

  const onFinish = (values) => {
    setIsLoading(true);
    dispatch(alertActions.loading());
    examService
      .create(assignment.roster, values)
      .then((data) => {
        dispatch(alertActions.success());
        onClose();
      })
      .catch((error) => dispatch(alertActions.error(error.message)))
      .finally(() => setIsLoading(false));
  };

  return (
    <DrawerBase
      key='add-student-drawer'
      className='add-student-drawer'
      title={'Phân công'}
      onClose={onClose}
      visible={visible}
    >
      {visible && (
        <Form
          layout='vertical'
          requiredMark={false}
          onFinish={onFinish}
          form={form}
        >
          <Row gutter={16} style={{ marginRight: 0 }}>
            <Col span={24}>
              <Form.Item
                name='classRoom'
                label='Lớp'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn lớp',
                  },
                ]}
              >
                <Select
                  showSearch
                  name='classRoom'
                  placeholder='VD. Lớp lập trình cơ bản'
                  onChange={onChangeSelectClassRoom}
                  filterOption={(input, option) => {
                    return option.children
                      .map((item) => removeVietnameseTones(item))
                      .includes(removeVietnameseTones(input));
                  }}
                >
                  {classRooms.map(({ name, _id }, index) => (
                    <Option key={index} value={_id}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginRight: 0 }}>
            <Col span={24}>
              <Form.Item name='timer' label='Thời gian làm'>
                <RangeDatePickerVN name='timer' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginRight: 0 }}>
            <Col span={24}>
              <Form.Item name='isFull' label='Phân công theo'>
                <Radio.Group
                  name='isFull'
                  onChange={onChangeRadio}
                  value={isFull}
                  defaultValue={true}
                >
                  <Radio value={true}>Cả lớp</Radio>
                  <Radio value={false}>Nhóm</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          {!isFull && (
            <>
              <Row gutter={16} style={{ marginRight: 0 }}>
                <Col span={24}>
                  <Form.Item
                    name='name'
                    label='Tên nhóm'
                    rules={[
                      {
                        required: true,
                        message: 'Không được bỏ trống tên nhóm.',
                      },
                    ]}
                  >
                    <Input
                      type='text'
                      name='fullname'
                      placeholder='VD. Nhóm số 1'
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginRight: 0, marginBottom: 10 }}>
                <Col span={24}>
                  <Form.Item
                    name='students'
                    label='Học sinh'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn ít nhất 1 học sinh.',
                      },
                    ]}
                  >
                    <Checkbox.Group
                      style={{ width: '100%' }}
                      onChange={onChangeCheckboxStudents}
                    >
                      <Row gutter={[8, 12]}>
                        {students.map((student, i) => (
                          <Col
                            key={student._id}
                            xs={24}
                            sm={24}
                            md={12}
                            lg={12}
                            xl={12}
                          >
                            <Checkbox key={student._id} value={student._id}>
                              {student.studentName}
                            </Checkbox>
                          </Col>
                        ))}
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}

          <Row gutter={16} style={{ marginRight: 0 }}>
            <Col span={24}>
              <Form.Item>
                <Button
                  type='primary'
                  className='btn-success'
                  shape='round'
                  htmlType='submit'
                  loading={isLoading}
                >
                  Lưu
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </DrawerBase>
  );
};

export default RosterGroupDrawer;
