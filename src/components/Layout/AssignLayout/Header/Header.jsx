import './style.css';

import { Button, Dropdown, Layout, Menu, Typography } from 'antd';
import { faEllipsisV, faHome } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import AssignDirector from '../../../AssignmentDirector';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import alertActions from '../../../../redux/alert/alert.action';
import assignActions from '../../../../redux/assign/assign.action';
import { assignSelector } from '../../../../redux/assign/assign.selector';
import assignmentService from '../../../../services/assignment.service';
import authAction from '../../../../redux/auth/auth.action';
import { teacherRouteConfig } from '../../../../config/route.config';
import { useEffect } from 'react';

const { Header: AntdHeader } = Layout;

const DropdownActionsAssignment = ({ onClickLogout, onClickDelete }) => {
  return (
    <Menu
      items={[
        {
          key: 'delete',
          label: (
            <div className='menu-item-action' onClick={onClickDelete}>
              <Typography.Text strong type='danger'>
                Xóa bài tập
              </Typography.Text>
            </div>
          ),
        },
        // {
        //   key: 'logout',
        //   label: (
        //     <div className='menu-item-action' onClick={onClickLogout}>
        //       <Typography.Text strong type='danger'>
        //         Đăng xuất
        //       </Typography.Text>
        //     </div>
        //   ),
        // },
      ]}
    />
  );
};

const Header = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const assignment = useSelector(assignSelector);

  useEffect(() => {
    const id = params.assignId;
    dispatch(assignActions.findAssignment(id));
  }, [params, dispatch]);

  const onClickLogout = (e) => {
    e.preventDefault();
    dispatch(authAction.logout());
  };

  const onDeleteAssignment = () => {
    dispatch(alertActions.loading());
    assignmentService
      .delete(assignment._id)
      .then(() => {
        dispatch(alertActions.success());
        const parentId = assignment.parentId ?? '';
        navigate(
          teacherRouteConfig.assignmentStoresWithParam.replace(
            ':fatherId',
            parentId
          )
        );
      })
      .catch((error) => dispatch(alertActions.error(error.message)));
  };

  return (
    <AntdHeader className='app__header--assignManager'>
      <div className='app__header--assignManager_left'>
        <div className='app__header--assignManager_left__home'>
          <Button
            className='btn-backhome'
            onClick={() => navigate(teacherRouteConfig.assignmentStores)}
          >
            <FontAwesomeIcon icon={faHome} />
          </Button>
          <div className='assign-title'>
            <Typography.Text>{assignment?.name}</Typography.Text>
          </div>
          {/* <div className='saving-text'>Saving...</div> */}
          <div className='saving-text'></div>
        </div>
      </div>
      <AssignDirector />
      <div className='app__header--assignManager_right'>
        <Dropdown
          placement='bottomLeft'
          arrow
          overlay={
            <DropdownActionsAssignment
              onClickLogout={onClickLogout}
              onClickDelete={onDeleteAssignment}
            />
          }
          trigger={['click']}
        >
          <Button>
            <FontAwesomeIcon icon={faEllipsisV} />
          </Button>
        </Dropdown>
      </div>
    </AntdHeader>
  );
};

export default Header;
