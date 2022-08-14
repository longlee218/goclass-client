import { Menu, Modal, Typography } from 'antd';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import alertActions from '../../../../redux/alert/alert.action';
import assignActions from '../../../../redux/assign_folder/assign_folder.action';
import assignmentFolderService from '../../../../services/assignmentFolder.service';
import { useDispatch } from 'react-redux';

const MenuActionFolder = ({ onOpenModalFolder, currentFolder, fetchData }) => {
  const dispatch = useDispatch();
  const onEditFolder = () => {
    dispatch(assignActions.setFolder(currentFolder));
    onOpenModalFolder();
  };

  const onDeleteFolder = (e) => {
    e.domEvent.stopPropagation();
    Modal.confirm({
      title: 'Xác nhận',
      content: (
        <Typography>
          Bạn có chắc muốn xóa thư mục <b>{currentFolder.name}</b> ?
        </Typography>
      ),
      okText: 'Tiếp tục',
      cancelText: 'Hủy',
      okButtonProps: {
        danger: true,
      },
      onOk: () => {
        dispatch(alertActions.loading());
        assignmentFolderService
          .deleteFolder(currentFolder._id)
          .then(() => {
            dispatch(alertActions.success('Xóa thành công!'));
            fetchData();
          })
          .catch((error) => dispatch(alertActions.error(error.message)));
      },
    });
  };

  return (
    <Menu>
      <Menu.Item
        key='edit'
        icon={<FontAwesomeIcon icon={faPen} />}
        onClick={onEditFolder}
      >
        Sửa thư mục
      </Menu.Item>
      <Menu.Item
        key='delete'
        icon={<FontAwesomeIcon icon={faTrash} />}
        style={{ color: 'red' }}
        onClick={onDeleteFolder}
      >
        Xóa thư mục
      </Menu.Item>
    </Menu>
  );
};

export default MenuActionFolder;
