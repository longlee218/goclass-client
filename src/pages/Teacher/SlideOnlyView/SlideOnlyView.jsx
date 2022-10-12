import { Col, Form, Pagination, Row, Typography } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Whiteboard from '../../../components/Whiteboard';
import { teacherRouteConfig } from '../../../config/route.config';
import assignActions from '../../../redux/assign/assign.action';
import {
  assignSelector,
  slideSelector,
} from '../../../redux/assign/assign.selector';

const SlideOnlyView = () => {
  const params = useParams();
  const navigate = useNavigate();
  const assignment = useSelector(assignSelector);
  const slide = useSelector(slideSelector).find(
    ({ _id }) => _id === params.slideId
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!assignment || !slide) {
      dispatch(assignActions.findSharedAssignment(params.assignId));
    }
  }, [params, dispatch, assignment, slide]);

  useEffect(() => {
    if (slide) {
      document.title = slide.name;
    }
  }, [slide]);

  const onChangePage = (page) => {
    const slide = assignment.slides.find(({ order }) => order === page);
    if (slide) {
      let link = teacherRouteConfig.slideLibraryWithParam.replace(
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
        <Row gutter={[6, 12]} justify='center'>
          <Col>
            <Pagination
              size='small'
              current={slide?.order}
              defaultCurrent={1}
              defaultPageSize={1}
              showTotal={(total) => `Tổng ${total} Slides`}
              total={assignment?.slideCounts}
              onChange={onChangePage}
            />
          </Col>
        </Row>
      </div>
      <div
        className='excalidraw-wrapper'
        style={{ height: 'calc(100vh - 114px)' }}
      >
        {slide && <Whiteboard slide={slide} user={user} onlyView />}
      </div>
    </div>
  );
};

export default SlideOnlyView;
