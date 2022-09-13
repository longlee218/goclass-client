import './style.css';

import React, { useEffect } from 'react';
import {
  sidebarStudentRoutes,
  sidebarTeacherRoutes,
} from '../../../../routes/sidebar.route';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Popover } from 'antd';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router';
import { useState } from 'react';

const content = (
  <div>
    <Link to='#'>Tạo đề</Link>
    <br></br>
    <Link to='#'>Tạo lớp</Link>
  </div>
);

const SideBar = () => {
  const location = useLocation();
  const { pathname } = location;
  const [sidebarRoutes, setSidebarRoutes] = useState([]);

  useEffect(() => {
    setSidebarRoutes(
      pathname.startsWith('/teacher/')
        ? sidebarTeacherRoutes
        : sidebarStudentRoutes
    );
  }, [pathname]);

  return (
    <div className='sidbar_wrapper'>
      <div>
        <Popover
          placement='topRight'
          title='Tạo đề'
          content={content}
          trigger='click'
        >
          <div className='sidebar__fastaction_button' aria-expanded='false'>
            <FontAwesomeIcon icon={faPlus} fontSize={19} />
          </div>
        </Popover>
      </div>
      <ul className='sidebar__wrapper_list'>
        {sidebarRoutes.map((route, i) => (
          <li key={`li-sidebar-${i}`} className='sidebar__wrapper_item'>
            <Link
              to={route.path}
              aria-current='page'
              className={
                new RegExp(`^${route.path}`).test(pathname)
                  ? 'sidebar-item-active'
                  : ''
              }
            >
              <FontAwesomeIcon icon={route.icon} fontSize={18} />
              <span>{route.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
