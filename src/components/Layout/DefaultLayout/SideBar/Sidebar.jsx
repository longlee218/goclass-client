import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import sidebarRoutes from '../../../../routes/sidebar.route';
import { useLocation } from 'react-router';

const SideBar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className='sidbar_wrapper'>
      <div>
        <div className='sidebar__fastaction_button' aria-expanded='false'>
          <FontAwesomeIcon icon={faPlus} fontSize={19} />
        </div>
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
