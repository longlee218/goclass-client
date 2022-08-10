import { Modal } from 'antd';
import React from 'react';

const ModalAddFolder = ({ visible, onOk, onCancel, children, isLoading }) => {
  return (
    <Modal
      key='modal-add-folder'
      title='Tạo thư mục'
      visible={visible}
      centered
      onOk={onOk}
      onCancel={onCancel}
      okText='Xác nhận'
      cancelText='Hủy'
      confirmLoading={isLoading}
      okButtonProps={{ danger: true }}
    >
      {children}
    </Modal>
  );
};

export default ModalAddFolder;
