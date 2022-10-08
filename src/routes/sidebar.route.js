import {
  faBookAtlas,
  faFile,
  faGlobe,
  faGraduationCap,
  faHome,
  faStore,
  faTrash,
  faTrashArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { studentRouteConfig, teacherRouteConfig } from '../config/route.config';

export const sidebarTeacherRoutes = [
  {
    path: teacherRouteConfig.dashboard,
    title: 'Trang chủ',
    icon: faHome,
  },
  {
    path: teacherRouteConfig.assignmentStores,
    title: 'Kho bài tập',
    icon: faFile,
  },
  // {
  //   path: '#',
  //   title: 'Đề thi',
  //   icon: faGraduationCap,
  // },
  {
    path: teacherRouteConfig.myClass,
    title: 'Quản lý lớp',
    icon: faBookAtlas,
  },
  // {
  //   path: '#',
  //   title: 'Website',
  //   icon: faGlobe,
  // },
  {
    path: teacherRouteConfig.assignmentLibrary,
    title: 'Thư viện bài tập',
    icon: faStore,
  },
  {
    path: teacherRouteConfig.trash,
    title: 'Thùng rác',
    icon: faTrash,
  },
];

export const sidebarStudentRoutes = [
  {
    path: studentRouteConfig.dashboard,
    title: 'Trang chủ',
    icon: faHome,
  },
  // {
  //   path: '#',
  //   title: 'Bài tập',
  //   icon: faBookOpen,
  // },
  {
    path: studentRouteConfig.assignments,
    title: 'Bài tập',
    icon: faFile,
  },
  {
    path: studentRouteConfig.myClass,
    title: 'Quản lý lớp',
    icon: faBookAtlas,
  },
];
