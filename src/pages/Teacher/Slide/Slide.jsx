import './style.css';

import { Col, Form, Input, Pagination, Row } from 'antd';
import React, { useCallback, useState } from 'react';
import {
  assignSelector,
  slideSelector,
} from '../../../redux/assign/assign.selector';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import FormItem from 'antd/lib/form/FormItem';
import Whiteboard from '../../../components/Whiteboard';
import assignActions from '../../../redux/assign/assign.action';
import assignmentService from '../../../services/assignment.service';
import { teacherRouteConfig } from '../../../config/route.config';
import useDebounce from '../../../hooks/useDebounce';
import { useEffect } from 'react';

const Slide = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const assignment = useSelector(assignSelector);
  const slide = useSelector(slideSelector).find(
    ({ _id }) => _id === params.slideId
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [libraryItems, setLibraryItems] = useState([]);

  useEffect(() => {
    if (!assignment || !slide) {
      dispatch(assignActions.findAssignment(params.assignId));
    }
  }, [assignment, slide, params, dispatch]);

  useEffect(() => {
    if (slide) {
      document.title = slide.name;
      form.setFieldsValue({
        name: slide.name,
        desc: slide?.desc ?? '',
        points: slide.points,
      });
    }
  }, [slide, form, assignment]);

  useEffect(() => {
    assignmentService
      .getAllLibrary()
      .then((data) => {
        const lib = data.map(({ elements }) => [...elements]);
        setLibraryItems(lib);
      })
      .catch((error) => dispatch(error.message));
  }, [dispatch]);

  const onChangeInput = useCallback(
    useDebounce(function (e) {
      const slideId = params.slideId;
      dispatch(
        assignActions.updateSlide(slideId, {
          [e.target.name]: e.target.value,
        })
      );
    }, 1000),
    [params]
  );

  const onChangePage = (page) => {
    const slide = assignment.slides.find(({ order }) => order === page);
    if (slide) {
      let link = teacherRouteConfig.slideWithParam.replace(
        ':assignId',
        params.assignId
      );
      link = link.replace(':slideId', slide._id);
      return navigate(link);
    }
  };

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
                        message: 'Không được để trống tên Slide.',
                      },
                    ]}
                  >
                    <Input
                      type='text'
                      name='name'
                      placeholder='Tên Slide'
                      value={slide?.name}
                      onChange={onChangeInput}
                    />
                  </FormItem>
                </Col>
                <Col span={18}>
                  <FormItem name='desc' noStyle>
                    <Input
                      type='text'
                      name='desc'
                      placeholder='Mô tả nội dung'
                      onChange={onChangeInput}
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
                      onChange={onChangeInput}
                    />
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col>
              <FormItem noStyle>
                <Pagination
                  size='small'
                  current={slide?.order}
                  defaultCurrent={1}
                  defaultPageSize={1}
                  showTotal={(total) => `Tổng ${total} Slides`}
                  total={assignment?.slideCounts}
                  onChange={onChangePage}
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
        {slide && (
          <Whiteboard slide={slide} user={user} libraryItems={libraryItems} />
        )}
      </div>
    </div>
  );
};

export default Slide;
