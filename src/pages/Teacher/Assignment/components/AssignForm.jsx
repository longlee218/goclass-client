import { Col, Form, Input, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import SelectListGrade from './SelectListGrade';
import SelectListSubject from './SelectListSubject';
import SelectedAccess from './SelectedAccess';
import assignActions from '../../../../redux/assign/assign.action';
import { assignSelector } from '../../../../redux/assign/assign.selector';
import { useCallback } from 'react';
import useDebounce from '../../../../hooks/useDebounce';
import { useEffect } from 'react';

const AssignForm = () => {
  const dispatch = useDispatch();
  const assignment = useSelector(assignSelector);
  const [form] = Form.useForm();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeInput = useCallback(
    useDebounce(function (e) {
      dispatch(
        assignActions.updateAssignment(assignment._id, {
          [e.target.name]: e.target.value,
        })
      );
    }, 1000),
    [assignment]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeSubjects = useCallback(
    useDebounce(function (value) {
      dispatch(
        assignActions.updateAssignment(assignment._id, {
          subjects: value,
        })
      );
    }, 1000),
    [assignment]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeGrades = useCallback(
    useDebounce(function (value) {
      dispatch(
        assignActions.updateAssignment(assignment._id, {
          grades: value,
        })
      );
    }, 1000),
    [assignment]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeAccess = useCallback(
    useDebounce(function (value) {
      dispatch(
        assignActions.updateAssignment(assignment._id, {
          access: value,
        })
      );
    }, 1000),
    [assignment]
  );

  useEffect(() => {
    form.setFieldsValue({
      name: assignment?.name,
      access: assignment?.access || 'private',
      subjects: assignment?.subjects || [],
      grades: assignment?.grades || [],
      desc: assignment?.desc || '',
    });
  }, [assignment, form]);

  useEffect(() => {
    document.title = assignment.name;
  }, [assignment]);

  return (
    <div className='assign-form__container'>
      <Form form={form} layout='vertical' name='editor-form-assign'>
        <Row gutter={[6, 12]} style={{ justifyContent: 'space-between' }}>
          <Col span={16}>
            <Form.Item
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Không được bỏ trống tên bài tập',
                },
              ]}
            >
              <Input
                type='text'
                placeholder='Tên bài tập'
                name='name'
                onChange={onChangeInput}
              />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item name='subjects'>
              <SelectListSubject
                name='subject'
                placeholder='Chủ đề'
                disabled={false}
                onChange={onChangeSubjects}
                key='select-subject'
              />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item name='grades'>
              <SelectListGrade
                name='grades'
                placeholder='Khối'
                disabled={false}
                onChange={onChangeGrades}
                key='select-grades'
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name='access'>
              <SelectedAccess
                name='access'
                placeholder='Quyền truy cập'
                disabled={false}
                key='select-access'
                onChange={onChangeAccess}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name='desc'>
              <Input.TextArea
                placeholder='Mô tả'
                rows={3}
                showCount
                maxLength={200}
                name='desc'
                onChange={onChangeInput}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AssignForm;
