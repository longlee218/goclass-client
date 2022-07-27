import {
  faBookAtlas,
  faBookOpen,
  faGlobe,
  faGraduationCap,
  faHome,
  faTrashArrowUp,
} from '@fortawesome/free-solid-svg-icons';

import { teacherRouteConfig } from '../config/route.config';

const sidebarRoutes = [
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
  {
    path: teacherRouteConfig.managerClass,
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

export default sidebarRoutes;
