import { Button, Form, Input, Popover, message } from 'antd';

import React from 'react';

const Content = () => {
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
  return (
    <Form
      name='form-update-groupclass'
      layout='vertical'
      // onFinish={(values) => setValues(values)}
      // onFinishFailed={onFinishFailed}
      autoComplete='off'
      scrollToFirstError
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
          <Button danger block htmlType='button' onClick={onClick}>
            Xóa
          </Button>
          <Button
            type='primary'
            className='btn-success'
            block
            htmlType='submit'
          >
            Lưu
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

const PopoverInfoClassGroup = ({ onVisibleChangePopover, children }) => {
  return (
    <Popover
      onVisibleChange={onVisibleChangePopover}
      trigger='click'
      title='Cập nhật nhóm'
      content={Content}
      placement='bottomLeft'
    >
      {children}
    </Popover>
  );
};

export default PopoverInfoClassGroup;
