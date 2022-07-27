import {
  publicRouteConfig,
  studentRouteConfig,
  teacherRouteConfig,
} from '../config/route.config';

import { AuthLayout } from '../components/Layout';
import Login from '../pages/General/Login';
import ManagerClass from '../pages/Teacher/ManagerClass';
import SignUp from '../pages/General/SignUp';
import StudentDashboard from '../pages/Student/Dashboard';
import TeacherDashboard from '../pages/Teacher/Dashboard';

const publicRoutes = [
  { path: publicRouteConfig.login, component: Login, layout: AuthLayout },
  { path: publicRouteConfig.signUp, component: SignUp, layout: AuthLayout },
];

const teacherRoutes = [
  {
    path: teacherRouteConfig.dashboard,
    component: TeacherDashboard,
    isPrivate: true,
    roles: ['teacher'],
  },
  {
    path: teacherRouteConfig.managerClass,
    component: ManagerClass,
    isPrivate: true,
    roles: ['teacher'],
  },
];

const studentRoutes = [
  {
    path: studentRouteConfig.dashboard,
    component: StudentDashboard,
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
