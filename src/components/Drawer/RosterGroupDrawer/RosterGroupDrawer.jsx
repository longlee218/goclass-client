import DrawerBase from '../DrawerBase';
import React from 'react';

const RosterGroupDrawer = ({ visible, setVisible }) => {
  const onClose = () => {
    setVisible(false);
  };

  return (
    <DrawerBase
      key='add-student-drawer'
      className='add-student-drawer'
      title={'Phân công'}
      onClose={onClose}
      visible={visible}
    >
      {visible && 'Hello'}
    </DrawerBase>
  );
};

export default RosterGroupDrawer;
