import './style.css';

import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import DatePickerVN from '../../DatePickerVN';
import DrawerBase from '../DrawerBase';
import FormItem from 'antd/lib/form/FormItem';
import alertActions from '../../../redux/alert/alert.action';
import otherService from '../../../services/other.service';
import { randomString } from '../../../helpers/string.helper';
import studentActions from '../../../redux/student/student.action';
import { useDispatch } from 'react-redux';
import { useReducer } from 'react';

const { Option } = Select;

const GENDER_OPTIONS = [
  { value: 'male', name: 'Nam' },
  { value: 'female', name: 'Nữ' },
  { value: 'other', name: 'Khác' },
];

const INIT_SELECT_EMAIL = [];

const reducerSelectEmail = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'clear':
      return [];
    case 'get':
      return payload.map((item) => ({
        _id: item._id,
        value: item.email,
        email: item.email,
        fullname: item.fullname,
        gender: item.gender,
      }));
    case 'add':
      return [
        ...state,
        {
          _id: null,
          value: '#_' + payload.email,
          email: payload.email,
          fullname: '',
          gender: 'other',
        },
      ];
    default:
      break;
  }
};

let timeOut = null;
let currentEmail = '';

const StudentAddedDrawer = ({
  visible,
  setVisible,
  classId,
  studentInfo,
  setStudentInfo,
  setClassRoom,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [valueGender, setValueGender] = useState('other');
  const dispatch = useDispatch();
  const [dob, setDob] = useState(undefined);
  const [listEmail, dispatchEmail] = useReducer(
    reducerSelectEmail,
    INIT_SELECT_EMAIL
  );
  const inputRef = useRef(null);
  const [formAddEmail] = Form.useForm();
  const [formAddStudent] = Form.useForm();

  useEffect(() => {
    if (studentInfo) {
      formAddStudent.setFieldsValue({
        _id: studentInfo._id,
        student: studentInfo.student._id,
        fullname: studentInfo.studentName,
        email: studentInfo.email,
        gender: studentInfo.gender || 'other',
        code: studentInfo.studentCode,
        dob: studentInfo.dob,
      });
    }
  }, [studentInfo, formAddStudent]);

  const onClose = () => {
    setDob(undefined);
    setStudentInfo(undefined);
    formAddStudent.resetFields();
    formAddEmail.resetFields();
    dispatchEmail({ type: 'clear', payload: [] });
    setIsLoading(false);
    setVisible(false);
  };

  const onSearchEmail = (value) => {
    if (timeOut) {
      clearTimeout(timeOut);
      timeOut = null;
    }
    currentEmail = value.trim();
    const fetchEmail = () => {
      otherService.searchEmail(currentEmail).then((data) => {
        if (currentEmail === value.trim()) {
          dispatchEmail({ type: 'get', payload: data });
        }
      });
    };
    timeOut = setTimeout(fetchEmail, 300);
  };

  const onClickIntoEmailSelect = () => {
    if (listEmail.length === 0) {
      otherService
        .searchEmail()
        .then((data) => dispatchEmail({ type: 'get', payload: data }));
    }
  };

  const handleAddEmail = ({ email }) => {
    otherService
      .checkExistEmail(email)
      .then((isExist) => {
        if (!isExist) {
          if (!listEmail.find(({ email: oldEmail }) => oldEmail === email)) {
            dispatchEmail({
              type: 'add',
              payload: {
                email,
              },
            });
            formAddEmail.setFieldsValue({ email: '' });
          }
        }
      })
      .finally(() => {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      });
  };

  const onChangeSelectEmail = (id) => {
    if (id.toString().startsWith('#_')) {
      setDob(undefined);
      formAddStudent.setFieldsValue({
        _id: null,
        student: null,
        email: id.replace('#_', ''),
        fullname: '',
        gender: 'other',
        code: '',
        dob: null,
      });
    } else {
      const student = listEmail.find(({ value }) => value === id);
      if (student) {
        formAddStudent.setFieldsValue({
          _id: studentInfo?._id || null,
          student: student._id,
          email: student.email,
          fullname: student.fullname,
          gender: student.gender,
          code: student.studentCode,
          dob: dob,
        });
      }
    }
  };

  const submitFormStudent = ({
    _id,
    email,
    fullname,
    gender,
    code,
    student,
  }) => {
    setIsLoading(true);
    if (_id) {
      dispatch(
        studentActions.update(
          classId,
          _id,
          email,
          dob,
          fullname,
          gender,
          code,
          student
        )
      )
        .then(() => {
          dispatch(alertActions.success());
          dispatch(studentActions.get(classId, {}));
          onClose();
        })
        .finally(() => setIsLoading(false));
    } else {
      dispatch(
        studentActions.create(
          classId,
          _id,
          email,
          dob,
          fullname,
          gender,
          code,
          student
        )
      )
        .then(() => {
          dispatch(alertActions.success());
          dispatch(studentActions.get(classId, {}));
          setClassRoom((prev) => ({
            ...prev,
            countStudents: prev.countStudents + 1,
          }));
          onClose();
        })
        .finally(() => setIsLoading(false));
    }
  };

  const onClickMakeCode = () => {
    formAddStudent.setFieldsValue({ code: randomString() });
  };

  return (
    <DrawerBase
      key='add-student-drawer'
      className='add-student-drawer'
      title={studentInfo ? 'Sửa thông tin học sinh' : 'Thêm học sinh'}
      onClose={onClose}
      visible={visible}
    >
      <Form
        layout='vertical'
        requiredMark={false}
        form={formAddStudent}
        onFinish={submitFormStudent}
      >
        <Form.Item name='_id' noStyle>
          <Input name='_id' hidden />
        </Form.Item>
        <Form.Item name='student' noStyle>
          <Input name='student' hidden />
        </Form.Item>
        <Row gutter={16} style={{ marginRight: 0 }}>
          <Col span={24}>
            <Form.Item
              name='email'
              label='Email học sinh'
              rules={[
                { required: true, message: 'Vui lòng chọn Email học sinh' },
              ]}
            >
              <Select
                onChange={onChangeSelectEmail}
                showSearch
                name='email'
                type='text'
                filterOption={false}
                placeholder='Nhập email học sinh'
                onSearch={onSearchEmail}
                value={studentInfo?.email}
                dropdownRender={(menu) => {
                  return (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Space style={{ padding: '0 8px 4px' }}>
                        <Form
                          layout='inline'
                          onFinish={(values) => handleAddEmail(values)}
                          form={formAddEmail}
                        >
                          <FormItem
                            name='email'
                            rules={[
                              {
                                required: true,
                                message: 'Không được bỏ trống.',
                              },
                              {
                                type: 'email',
                                message: 'Định dạng e-mail không đúng.',
                              },
                            ]}
                          >
                            <Input
                              name='email'
                              type='email'
                              ref={inputRef}
                              placeholder='Nhập Email muốn tạo'
                            />
                          </FormItem>
                          <FormItem>
                            <Button type='primary' htmlType='submit'>
                              Thêm Email
                            </Button>
                          </FormItem>
                        </Form>
                      </Space>
                    </>
                  );
                }}
                style={{ marginBottom: 8 }}
                onClick={onClickIntoEmailSelect}
              >
                {listEmail.map((item, index) => (
                  <Option key={index} value={item.value}>
                    {item.email}
                  </Option>
                ))}
              </Select>
              <Typography.Text
                italic
                style={{ fontSize: 13, marginTop: 8 }}
                type='secondary'
              >
                Nếu thầy/cô không tìm thấy Email có nghĩa là tài khoản này không
                tồn tại trên hệ thống. Hãy tạo 1 tài khoản mới cho học sinh.
              </Typography.Text>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginRight: 0 }}>
          <Col span={24}>
            <Form.Item
              name='fullname'
              label='Họ tên học sinh'
              rules={[{ required: true, message: 'Vui lòng nhập học tên' }]}
            >
              <Input
                name='fullname'
                type='text'
                placeholder='VD. Lê Hoàng Long'
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginRight: 0 }}>
          <Col span={24}>
            <Input.Group
              compact
              style={{ display: 'flex', alignItems: 'flex-end' }}
            >
              <Form.Item name='code' label='Mã học sinh' style={{ flex: 1 }}>
                <Input placeholder='VD. 127262' style={{ width: '100%' }} />
              </Form.Item>
              <Button
                type='primary'
                htmlType='button'
                style={{ marginLeft: '3px', marginBottom: '24px' }}
                onClick={onClickMakeCode}
              >
                Lấy mã
              </Button>
            </Input.Group>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginRight: 0 }}>
          <Col span={24}>
            <Form.Item label='Giới tính' name='gender'>
              <Radio.Group
                name='gender'
                onChange={(e) => setValueGender(e.target.value)}
                defaultValue={valueGender}
              >
                {GENDER_OPTIONS.map(({ value, name }) => (
                  <Radio key={value} value={value} name='gender'>
                    {name}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginRight: 0 }}>
          <Col span={24}>
            <Form.Item name='dob' label='Ngày sinh'>
              <DatePickerVN
                name='dob'
                style={{ width: '100%' }}
                placeholder='Chọn ngày sinh'
                value={dob}
                onChange={(e, dateString) => {
                  console.log({ change: e.toISOString() });
                  setDob(e.toISOString());
                }}
              />
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
                htmlType='submit'
                loading={isLoading}
              >
                Lưu
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </DrawerBase>
  );
};

export default StudentAddedDrawer;
