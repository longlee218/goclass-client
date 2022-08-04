import { Button, Form, Input, Modal, Popover, message } from 'antd';

import React from 'react';
import alertActions from '../../redux/alert/alert.action';
import classGroupActions from '../../redux/class_group/class_group.action';
import classGroupService from '../../services/classGroup.service';
import classRoomActions from '../../redux/class_room/class_room.action';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const ContentClassGroup = (classGroup, setVisible, formEdit) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

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
      content: 'Bạn có chắc muốn xóa nhóm ?',
      okText: 'Tiếp tục',
      cancelText: 'Hủy',
      onOk: () => {
        dispatch(classGroupActions.delete(classGroup._id)).then(() => {
          dispatch(classRoomActions.get());
          setVisible(false);
        });
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
      form={formEdit}
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
  const [formEdit] = Form.useForm();

  const onVisibleChangePopover = (newVisible) => {
    if (!newVisible) {
      formEdit.resetFields();
    }
    setVisible(newVisible);
  };

  return (
    <Popover
      onVisibleChange={onVisibleChangePopover}
      trigger='click'
      title='Cập nhật nhóm'
      content={ContentClassGroup(classGroup, setVisible, formEdit)}
      placement='bottomLeft'
      visible={visible}
    >
      {children}
    </Popover>
  );
};

export default PopoverInfoClassGroup;
