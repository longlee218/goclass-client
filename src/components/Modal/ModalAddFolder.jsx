import { Modal } from 'antd';
import React from 'react';

const ModalAddFolder = ({
  title,
  visible,
  onOk,
  onCancel,
  children,
  isLoading,
}) => {
  return (
    <Modal
      key='modal-add-folder'
      title={title}
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
