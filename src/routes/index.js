import {
  publicRouteConfig,
  studentRouteConfig,
  teacherRouteConfig,
} from '../config/route.config';

import { AuthLayout } from '../components/Layout';
import ClassDetail from '../pages/Teacher/ClassDetail';
import Login from '../pages/General/Login';
import ManagerClass from '../pages/Teacher/ManagerClass';
import SignUp from '../pages/General/SignUp';
import StudentDashboard from '../pages/Student/Dashboard';
import TeacherDashboard from '../pages/Teacher/Dashboard';

const publicRoutes = [
  { path: publicRouteConfig.login, page: Login, layout: AuthLayout },
  { path: publicRouteConfig.signUp, page: SignUp, layout: AuthLayout },
];

const teacherRoutes = [
  {
    path: teacherRouteConfig.dashboard,
    page: TeacherDashboard,
    isPrivate: true,
    roles: ['teacher'],
  },
  {
    path: teacherRouteConfig.myClass,
    page: ManagerClass,
    isPrivate: true,
    roles: ['teacher'],
    child: [
      {
        path: teacherRouteConfig.myClassDetail,
        page: ClassDetail,
        isPrivate: true,
        roles: ['teacher'],
        father: [teacherRouteConfig.myClass],
      },
    ],
  },
  {
    path: teacherRouteConfig.myClassDetail,
    page: ClassDetail,
    isPrivate: true,
    roles: ['teacher'],
    father: [teacherRouteConfig.myClass],
  },
];

const studentRoutes = [
  {
    path: studentRouteConfig.dashboard,
    page: StudentDashboard,
    isPrivate: true,
    roles: ['teacher', 'student'],
  },
];

export const parentRoutes = [];

const finalRoutes = [
  ...publicRoutes,
  ...teacherRoutes,
  ...studentRoutes,
  ...parentRoutes,
];

export default finalRoutes;
