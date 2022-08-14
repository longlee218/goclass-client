import './style.css';

import { Layout, Typography } from 'antd';
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuDrawer from '../../../MenuDrawer';
import SvgLogo from '../../../SvgLogo';
import UserInfo from '../../../UserInfo';
import { useAppContext } from '../../../../hooks/useAppContext';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useRef } from 'react';

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

const Header = () => {
  const { pathname } = useLocation();
  const { titleHeader } = useAppContext();
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [isShowUserInfo, setIsShowUserInfo] = useState(false);
  const refModal = useRef(null);
  const refUserAvatar = useRef(null);

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
            <FontAwesomeIcon icon={faBell} fontSize={19} />
          </div>
          <img
            className='app__header_content_avatar'
            alt='user-thumbnail'
            src='https://graph.facebook.com/1615573495302871/picture?width=400&height=400'
            onClick={() => setIsShowUserInfo(!isShowUserInfo)}
            ref={refUserAvatar}
          />
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
