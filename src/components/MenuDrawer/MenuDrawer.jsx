import './style.css';

import { Drawer, Typography } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import drawerRoutes from '../../routes/drawer.route';
import { useLocation } from 'react-router';

const MenuDrawer = ({ visibleDrawer, setVisibleDrawer }) => {
  const location = useLocation();
  const { pathname } = location;
  const onClose = () => setVisibleDrawer(false);
  return (
    <Drawer
      title={process.env.REACT_APP_APPNAME}
      placement='left'
      onClose={onClose}
      visible={visibleDrawer}
      closable={true}
      key='left'
      width={550}
    >
      <div className='drawer_mobile_menu_scrollable'>
        <div className='drawer_mobile_user'>
          <div className='user_info_basic'>
            <img
              className='user_info_basic_avatar'
              alt='avatar'
              src='https://graph.facebook.com/1615573495302871/picture?width=400&height=400'
            />
            <h6 className='user_info_basic_fullname'>Long Lê</h6>
          </div>
        </div>
        <div className='drawer_mobile_listwrap'>
          {drawerRoutes.map((groupRoutes, i) => (
            <ul key={`ul-${i}`} className='drawer_mobile_list'>
              {groupRoutes.map((route, j) => {
                return (
                  <li key={`li-${j}`} className='drawer_mobile_list_item'>
                    <Link
                      to={route.path}
                      className={
                        pathname === route.path && 'drawer_mobile_item_active'
                      }
                    >
                      <em>
                        <FontAwesomeIcon icon={route.icon} fontSize={19} />
                      </em>
                      <Typography.Text>{route.title}</Typography.Text>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </Drawer>
  );
};
export default MenuDrawer;
