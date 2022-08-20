import { Button, Menu, Modal, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AssignSlide from './AssignSlide';
import alertActions from '../../../../redux/alert/alert.action';
import assignActions from '../../../../redux/assign/assign.action';
import { assignSelector } from '../../../../redux/assign/assign.selector';
import assignType from '../../../../redux/assign/assign.type';
import slideService from '../../../../services/slide.service';
import { useParams } from 'react-router';

const AssignSlides = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const assignment = useSelector(assignSelector);
  const [isShowModal, setIsShowModal] = useState(false);
  const [slideCurrent, setSlideCurrent] = useState(null);

  const onOpenModal = () => setIsShowModal(true);

  const onOk = () => {};

  const onCancel = () => {
    setIsShowModal(false);
  };

  const onSelectOrder = (e) => {
    const order = +e.key;
    dispatch(alertActions.loading());
    slideService
      .changeOrder(slideCurrent._id, order)
      .then(() => {
        dispatch(alertActions.success());
        dispatch(assignActions.findAssignment(slideCurrent.assignment));
        setSlideCurrent(null);
        onCancel();
      })
      .catch((error) => dispatch(alertActions.error(error.message)));
  };

  const onAddNewSlide = () => {
    dispatch(alertActions.loading());
    slideService.add(params.assignId).then((data) => {
      dispatch({
        type: assignType.DUPLICATE_SLIDE,
        payload: data,
      });
      dispatch(alertActions.success());
    });
  };
  return (
    <>
      <Space
        direction='horizontal'
        size={15}
        style={{ display: 'flex', flexWrap: 'wrap' }}
        align='center'
      >
        {assignment?.slides?.map((item) => (
          <AssignSlide
            slide={item}
            openModal={onOpenModal}
            setSlideCurrent={setSlideCurrent}
          />
        ))}
        <Button
          className='btn_add--slide'
          type='dashed'
          onClick={onAddNewSlide}
        >
          Thêm Slide
        </Button>
      </Space>
      <Modal
        title='Di chuyển Slide'
        visible={isShowModal}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Typography.Paragraph>Tới vị trí</Typography.Paragraph>
        <Menu selectedKeys={[slideCurrent?.order.toString()]}>
          {Array.from({ length: assignment.slideCounts }, (_, i) => i + 1).map(
            (item) => (
              <Menu.Item key={item.toString()} onClick={onSelectOrder}>
                Vị trí {item}
              </Menu.Item>
            )
          )}
        </Menu>
      </Modal>
    </>
  );
};

export default AssignSlides;
