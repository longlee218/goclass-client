import './style.css';

import React, { useEffect } from 'react';
import {
  sidebarStudentRoutes,
  sidebarTeacherRoutes,
} from '../../../../routes/sidebar.route';
import {
  studentRouteConfig,
  teacherRouteConfig,
} from '../../../../config/route.config';
import { useLocation, useNavigate } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
      {location.pathname !== teacherRouteConfig.dashboard &&
      location.pathname !== studentRouteConfig.dashboard ? (
        <div>
          <Tooltip title='Quay lại' placement='right'>
            <div
              className='sidebar__fastaction_button'
              aria-expanded='false'
              onClick={() => navigate(-1)}
            >
              <FontAwesomeIcon icon={faArrowLeft} fontSize={19} />
            </div>
          </Tooltip>
        </div>
      ) : (
        <div style={{ height: 50 }}></div>
      )}

      <ul className='sidebar__wrapper_list'>
        {sidebarRoutes.map((route, i) => (
          <li key={`li-sidebar-${i}`} className='sidebar__wrapper_item'>
            <Tooltip placement='right' title={route.title}>
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
                {/* <span>{route.title}</span> */}
              </Link>
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
