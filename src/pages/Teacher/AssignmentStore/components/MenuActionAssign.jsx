import {
  faCopy,
  faEye,
  faTrash,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from 'antd';
import React from 'react';

const MenuActionAssign = () => {
  return (
    <Menu>
      <Menu.Item
        key='watch'
        icon={<FontAwesomeIcon icon={faEye} />}
        // onClick={}
      >
        Theo dõi
      </Menu.Item>
      <Menu.Item
        key='roster'
        icon={<FontAwesomeIcon icon={faUserPlus} />}
        // onClick={}
      >
        Phân công
      </Menu.Item>
      <Menu.Item
        key='duplicate'
        icon={<FontAwesomeIcon icon={faCopy} />}
        // onClick={}
      >
        Nhân đôi
      </Menu.Item>
      <Menu.Item
        key='delete'
        icon={<FontAwesomeIcon icon={faTrash} />}
        style={{ color: 'red' }}
        // onClick={onDeleteFolder}
      >
        Xóa
      </Menu.Item>
    </Menu>
  );
};

export default MenuActionAssign;
