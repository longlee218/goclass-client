import {
  faBookAtlas,
  faBookOpen,
  faGlobe,
  faGraduationCap,
  faHome,
  faKey,
  faRightFromBracket,
  faTrashArrowUp,
  faUserGraduate,
} from '@fortawesome/free-solid-svg-icons';

import { teacherRouteConfig } from '../config/route.config';

const drawerRoutes = [
  [
    {
      path: '#',
      title: 'Thông tin cá nhân',
      icon: faUserGraduate,
    },
  ],
  [
    {
      path: teacherRouteConfig.dashboard,
      title: 'Home',
      icon: faHome,
    },
    {
      path: teacherRouteConfig.assignmentStores,
      title: 'Bài tập',
      icon: faBookOpen,
    },
    // {
    //   path: '#',
    //   title: 'Đề thi',
    //   icon: faGraduationCap,
    // },
    {
      path: teacherRouteConfig.myClass,
      title: 'Lớp',
      icon: faBookAtlas,
    },
  ],
  [
    {
      path: '#',
      title: 'Website',
      icon: faGlobe,
    },
    // {
    //   path: '#',
    //   title: 'Thùng rác',
    //   icon: faTrashArrowUp,
    // },
  ],
  [
    {
      path: '#',
      title: 'Thay đổi mật khẩu',
      icon: faKey,
    },
    {
      path: '#',
      title: 'Đăng xuất',
      icon: faRightFromBracket,
    },
  ],
];

export default drawerRoutes;
