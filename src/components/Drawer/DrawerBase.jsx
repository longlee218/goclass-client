import { Button, Drawer, Space } from 'antd';

import PropTypes from 'prop-types';
import React from 'react';

const DrawerBase = ({ title, key, className, onClose, visible, children }) => {
  return (
    <Drawer
      key={key}
      className={className || ''}
      title={title}
      width='36em'
      contentWrapperStyle={{
        maxWidth: '100vw',
      }}
      placement='right'
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={onClose}>Hủy</Button>
        </Space>
      }
    >
      {children}
    </Drawer>
  );
};

DrawerBase.propTypes = {
  title: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default DrawerBase;
