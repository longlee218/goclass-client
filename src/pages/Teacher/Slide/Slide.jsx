import './style.css';

import { Col, Form, Input, Pagination, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Excalidraw } from '@excalidraw/excalidraw';
import FormItem from 'antd/lib/form/FormItem';
import Whiteboard from '../../../components/Whiteboard';
import assignActions from '../../../redux/assign/assign.action';
import { assignSelector } from '../../../redux/assign/assign.selector';
import slideService from '../../../services/slide.service';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const Slide = () => {
  const params = useParams();
  const [form] = Form.useForm();
  const [slide, setSlide] = useState(undefined);
  const assignment = useSelector(assignSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const slideId = params.slideId;
    slideService.findById(slideId).then((data) => {
      setSlide(data);
    });
  }, [params]);

  useEffect(() => {
    if (slide) {
      document.title = slide.name;

      form.setFieldsValue({
        name: slide.name,
        points: slide.points,
      });
    }
  }, [slide, form]);

  useEffect(() => {
    if (!assignment) {
      dispatch(assignActions.findAssignment(params.assignId));
    }
  }, [assignment, params, dispatch]);

  return (
    <div className='d-flex flex-column slide__wrapper'>
      <div className='slide__wrapper_container'>
        <Form form={form} layout='vertical' name='editor-form-slide'>
          <Row gutter={[6, 12]} justify='center'>
            <Col span={24}>
              <Row gutter={[6, 12]} justify='center'>
                <Col span={4}>
                  <FormItem
                    noStyle
                    name='name'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter slide name',
                      },
                    ]}
                  >
                    <Input
                      type='text'
                      name='name'
                      placeholder='Tên Slide'
                      value={slide?.name}
                    />
                  </FormItem>
                </Col>
                <Col span={18}>
                  <FormItem name='desc' noStyle>
                    <Input
                      type='text'
                      name='desc'
                      placeholder='Mô tả nội dung'
                    />
                  </FormItem>
                </Col>
                <Col span={2}>
                  <FormItem name='points' noStyle>
                    <Input
                      type='text'
                      name='points'
                      suffix='điểm'
                      placeholder='Điểm'
                    />
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col>
              <FormItem noStyle>
                <Pagination
                  size='small'
                  defaultCurrent={slide?.order}
                  defaultPageSize={1}
                  showTotal={(total) => `Tổng ${total} Slides`}
                  total={assignment?.slideCounts}
                />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div
        className='excalidraw-wrapper'
        style={{ height: 'calc(100vh - 158px)' }}
      >
        {slide && <Whiteboard id={slide?._id} name={slide?.name} />}
      </div>
    </div>
  );
};

export default Slide;
