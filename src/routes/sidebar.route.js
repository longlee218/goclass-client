import {
  faBookAtlas,
  faBookOpen,
  faGlobe,
  faGraduationCap,
  faHome,
  faTrashArrowUp,
} from '@fortawesome/free-solid-svg-icons';

import { teacherRouteConfig } from '../config/route.config';

export const sidebarTeacherRoutes = [
  {
    path: teacherRouteConfig.dashboard,
    title: 'Bảng tin',
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
  {
    path: '#',
    title: 'Website',
    icon: faGlobe,
  },
  {
    path: '#',
    title: 'Thùng rác',
    icon: faTrashArrowUp,
  },
];

export const sidebarStudentRoutes = [
  {
    path: teacherRouteConfig.dashboard,
    title: 'Home',
    icon: faHome,
  },
  {
    path: '#',
    title: 'Bài tập',
    icon: faBookOpen,
  },
  {
    path: '#',
    title: 'Đề thi',
    icon: faGraduationCap,
  },
];
