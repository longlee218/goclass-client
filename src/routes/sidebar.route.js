import {
  faBookAtlas,
  faBookOpen,
  faGlobe,
  faGraduationCap,
  faHome,
  faStore,
  faTrashArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { studentRouteConfig, teacherRouteConfig } from '../config/route.config';

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
    path: teacherRouteConfig.assignmentLibrary,
    title: 'Thư viện',
    icon: faStore,
  },
  // {
  //   path: '#',
  //   title: 'Thùng rác',
  //   icon: faTrashArrowUp,
  // },
];

export const sidebarStudentRoutes = [
  {
    path: studentRouteConfig.dashboard,
    title: 'Home',
    icon: faHome,
  },
  // {
  //   path: '#',
  //   title: 'Bài tập',
  //   icon: faBookOpen,
  // },
  {
    path: studentRouteConfig.myClass,
    title: 'Lớp',
    icon: faBookAtlas,
  },
  {
    path: studentRouteConfig.assignments,
    title: 'Đề thi',
    icon: faGraduationCap,
  },
];
