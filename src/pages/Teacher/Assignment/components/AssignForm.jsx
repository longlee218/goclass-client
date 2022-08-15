import { Col, Form, Input, Row } from 'antd';

import React from 'react';
import SelectListGrade from './SelectListGrade';
import SelectListSubject from './SelectListSubject';
import SelectedAccess from './SelectedAccess';
import { assignSelector } from '../../../../redux/assign/assign.selector';
import { useCallback } from 'react';
import useDebounce from '../../../../hooks/useDebounce';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const AssignForm = () => {
  const assignment = useSelector(assignSelector);
  const [title, setTitle] = useState(
    assignment?.name || process.env.REACT_APP_NAME
  );
  const [form] = Form.useForm();

  const onSubmit = useCallback(
    useDebounce(function (e) {
      console.log(e);
    }),
    []
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
    document.title = title;
  }, [title]);

  const onChangeInputName = (e) => {
    const value = e.target.value;
    setTitle(value);
    form.setFieldsValue({ name: value });
  };

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
                onChange={onSubmit}
              />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Form.Item name='subjects'>
              <SelectListSubject
                name='subject'
                placeholder='Chủ đề'
                disabled={false}
                value=''
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
                value=''
                key='select-grades'
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name='access'>
              <SelectedAccess
                name='access'
                placeholder='Chủ Quyền truy cập'
                disabled={false}
                key='select-access'
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
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AssignForm;
