import { Button, Form, Input, Modal, Popover, message } from 'antd';

import React from 'react';
import alertActions from '../../redux/alert/alert.action';
import classGroupService from '../../services/classGroup.service';
import classRoomActions from '../../redux/class_room/class_room.action';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const ContentClassGroup = (classGroup, setVisible) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const onClick = () => {
    message.loading({ content: 'Đang tái...', key: 'delete-classgroup' });
    setTimeout(() => {
      message.success({
        content: 'Xóa thành công!',
        key: 'delete-classgroup',
        duration: 2,
      });
    }, 3000);
  };

  const onSubmitForm = (values) => {
    setIsLoading(true);
    dispatch(alertActions.loading());
    classGroupService
      .update(classGroup._id, values)
      .then(() => {
        dispatch(alertActions.success());
        dispatch(classRoomActions.get());
        setVisible(false);
      })
      .catch((error) => dispatch(alertActions.error(error.message)))
      .finally(() => setIsLoading(false));
  };

  const onClickDelete = () => {
    Modal.confirm({
      title: 'Xác nhận',
      content: 'Bạn có chắc muốn nhóm ?',
      okText: 'Tiếp tục',
      cancelText: 'Hủy',
      onOk: () => {
        dispatch(alertActions.loading());
        classGroupService
          .delete(classGroup._id)
          .then(() => {
            dispatch(alertActions.success('Xóa thành công!'));
            dispatch(classRoomActions.get());
            setVisible(false);
          })
          .catch((error) => dispatch(alertActions.error(error.message)));
      },
    });
  };

  return (
    <Form
      name='form-update-groupclass'
      layout='vertical'
      autoComplete='off'
      scrollToFirstError
      initialValues={{
        name: classGroup?.name || '',
      }}
      onFinish={onSubmitForm}
    >
      <Form.Item
        name='name'
        rules={[
          {
            required: true,
            message: 'Không được bỏ trống.',
          },
        ]}
        hasFeedback
      >
        <Input
          name='name'
          type='text'
          placeholder='Tên nhóm'
          autoComplete='off'
        />
      </Form.Item>
      <Form.Item>
        <div className='d-flex justify-content-between gap-15'>
          <Button danger block htmlType='button' onClick={onClickDelete}>
            Xóa
          </Button>
          <Button
            type='primary'
            className='btn-success'
            block
            htmlType='submit'
            loading={isLoading}
          >
            Lưu
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

const PopoverInfoClassGroup = ({ classGroup, children }) => {
  const [visible, setVisible] = useState(false);
  const onVisibleChangePopover = (newVisible) => {
    setVisible(newVisible);
  };

  return (
    <Popover
      onVisibleChange={onVisibleChangePopover}
      trigger='click'
      title='Cập nhật nhóm'
      content={ContentClassGroup(classGroup, setVisible)}
      placement='bottomLeft'
      visible={visible}
    >
      {children}
    </Popover>
  );
};

export default PopoverInfoClassGroup;
