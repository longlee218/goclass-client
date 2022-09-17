import './style.css';

import { Badge, Layout, Popover, Typography } from 'antd';
import React, { useState } from 'react';
import {
  faBars,
  faBell,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import {
  studentRouteConfig,
  teacherRouteConfig,
} from '../../../../config/route.config';

import AvatarOwner from '../../../AvatarOwner/AvatarOwner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import MenuDrawer from '../../../MenuDrawer';
import UserInfo from '../../../UserInfo';
import moment from 'moment';
import notifyService from '../../../../services/notify.service';
import { notifySocket } from '../../../../services/socket.service';
import { useAppContext } from '../../../../hooks/useAppContext';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

moment.locale('vi');
const { Header: AntdHeader } = Layout;

const CenterHeader = ({ pathname, titleHeader }) => {
  const inputSearch = (
    <div className='search-wrapper' aria-expanded='false'>
      <div className='search-icon'></div>
      <input
        type='text'
        spellCheck='false'
        placeholder='Tìm kiếm lớp học, bài tập, học sinh,...'
        className='search-input'
      />
    </div>
  );

  return (
    <div className='app__header_content_search app__navbar_action flex-1'>
      {[
        teacherRouteConfig.dashboard,
        teacherRouteConfig.myClass,
        studentRouteConfig.dashboard,
      ].includes(pathname) ? (
        inputSearch
      ) : (
        <Typography.Title style={{ fontWeight: 600 }} level={4}>
          {titleHeader}
        </Typography.Title>
      )}
    </div>
  );
};

const PopoverNotify = ({ user, notifies }) => {
  const prefix = user.roles.includes('teacher') ? '/teacher' : '/student';
  return (
    <ul className='notify__warpper'>
      <header>
        <Typography.Title level={5}>Thông báo</Typography.Title>
      </header>
      <div className='notify__content'>
        {notifies.map(({ content, createdAt, createdBy, linkTo }) => (
          <div>
            <Link className='notify__content__link' to={prefix + linkTo}>
              <div className='notify__image'>
                <AvatarOwner fullname={createdBy.fullname} />
              </div>
              <div className='notify__message'>
                <div
                  style={{ lineHeight: '20px' }}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
                <div className='notify__createdAt'>
                  {moment(createdAt).fromNow()}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </ul>
  );
};

const Header = () => {
  const { pathname } = useLocation();
  const { titleHeader } = useAppContext();
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [isShowUserInfo, setIsShowUserInfo] = useState(false);
  const [notifies, setNotifies] = useState([]);
  const refModal = useRef(null);
  const refUserAvatar = useRef(null);
  const [newNotify, setNewNotify] = useState(0);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const clickOutSide = (e) => {
      const { target } = e;
      if (!refUserAvatar.current || !refModal.current) {
        return;
      }
      if (
        !refUserAvatar.current.contains(target) &&
        !refModal.current.contains(target)
      ) {
        setIsShowUserInfo(false);
      }
    };

    document.addEventListener('mousedown', clickOutSide);

    return () => document.removeEventListener('mousedown', clickOutSide);
  }, [refModal, refUserAvatar]);

  useEffect(() => {
    notifySocket.emit('join', user._id);
    notifySocket.on('notify', (data) => {
      setNewNotify((prev) => prev + 1);
      setNotifies((prev) => [data, ...prev]);
    });
  }, []);

  useEffect(() => {
    notifyService.get().then(({ docs }) => {
      setNotifies(docs);
    });
  }, []);

  return (
    <>
      <AntdHeader className='app__header'>
        <div className='app__header_content_mobile flex-1'>
          <em>
            <FontAwesomeIcon
              icon={faBars}
              fontSize={20}
              onClick={() => setVisibleDrawer(true)}
            />
          </em>
        </div>
        <div className='app__header_content_logo app__navbar_logo flex-1'>
          {/* <SvgLogo /> */}
          <h4 className='app__header_content_logo_text'>
            {process.env.REACT_APP_APPNAME}
          </h4>
        </div>
        <CenterHeader pathname={pathname} titleHeader={titleHeader} />
        <div className='app__header_content_info app_navbar_info flex-1'>
          <div className='app__header_content_info_search'>
            <a href='#'>
              <FontAwesomeIcon icon={faMagnifyingGlass} fontSize={19} />
            </a>
          </div>
          {/* <button className='app__header_content_button'>
            Lớp đang kiểm tra
          </button> */}
          <div className='app__header_content_notification'>
            <Popover
              placement='leftBottom'
              content={<PopoverNotify user={user} notifies={notifies} />}
              trigger='click'
              onClick={() => setNewNotify(0)}
            >
              <Badge size='default' count={newNotify}>
                <FontAwesomeIcon
                  className='text-bold-gray'
                  icon={faBell}
                  fontSize={19}
                />
              </Badge>
            </Popover>
          </div>
          <div
            className='app__header_content_avatar'
            onClick={() => setIsShowUserInfo(!isShowUserInfo)}
            ref={refUserAvatar}
          >
            <AvatarOwner fullname={user?.fullname} />
          </div>
          {isShowUserInfo && <UserInfo refModal={refModal} />}
        </div>
      </AntdHeader>
      <MenuDrawer
        visibleDrawer={visibleDrawer}
        setVisibleDrawer={setVisibleDrawer}
      />
    </>
  );
};

export default Header;
