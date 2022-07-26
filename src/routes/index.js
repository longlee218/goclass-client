import {
  publicRouteConfig,
  studentRouteConfig,
  teacherRouteConfig,
} from '../config/route.config';

import AssignLayout from '../components/Layout/AssignLayout/AssignLayout';
import AssignSlide from '../pages/Teacher/AssignSlide';
import Assignment from '../pages/Teacher/Assignment';
import AssignmentLibrary from '../pages/Teacher/AssignmentLibrary';
import AssignmentLibraryDetail from '../pages/Teacher/AssignmentLibraryDetail';
import AssignmentStore from '../pages/Teacher/AssignmentStore';
import { AuthLayout } from '../components/Layout';
import ClassDetail from '../pages/Teacher/ClassDetail';
import EditAssignLayout from '../components/Layout/EditAssignLayout';
import Login from '../pages/General/Login';
import ManagerClass from '../pages/Teacher/ManagerClass';
import ShortLayout from '../components/Layout/ShortLayout/ShortLayout';
import SignUp from '../pages/General/SignUp';
import Slide from '../pages/Teacher/Slide';
import StudentAssignment from '../pages/Student/Assignment/StudentAssignment';
import StudentClassRoom from '../pages/Student/ClassRoom';
import StudentDashboard from '../pages/Student/Dashboard';
import TeacherDashboard from '../pages/Teacher/Dashboard';
import Trash from '../pages/Teacher/Trash';
import ViewWork from '../pages/Teacher/ViewWork';
import SlideOnlyView from '../pages/Teacher/SlideOnlyView';
import AssignLayoutNoDirector from '../components/Layout/AssignLayoutNoDirector/AssignLayoutNoDirector';

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
    // child: [
    //   {
    //     path: teacherRouteConfig.myClassDetail,
    //     page: ClassDetail,
    //     isPrivate: true,
    //     roles: ['teacher'],
    //   },
    // ],
  },
  {
    path: teacherRouteConfig.assignmentStores,
    page: AssignmentStore,
    isPrivate: true,
    roles: ['teacher'],
  },
  {
    path: teacherRouteConfig.assignmentStoresWithParam,
    page: AssignmentStore,
    isPrivate: true,
    roles: ['teacher'],
  },
  {
    path: teacherRouteConfig.assignmentWithParam,
    page: Assignment,
    layout: AssignLayout,
    isPrivate: true,
    roles: ['teacher'],
  },
  {
    path: teacherRouteConfig.slideWithParam,
    page: Slide,
    layout: EditAssignLayout,
    isPrivate: true,
    roles: ['teacher'],
  },
  {
    path: teacherRouteConfig.assignmentLibrary,
    page: AssignmentLibrary,
    layout: ShortLayout,
    isPrivate: true,
    roles: ['teacher'],
  },
  {
    path: teacherRouteConfig.assignmentLibraryDetail,
    page: AssignmentLibraryDetail,
    layout: ShortLayout,
    isPrivate: true,
    roles: ['teacher'],
  },
  {
    path: teacherRouteConfig.myClassDetail,
    page: ClassDetail,
    isPrivate: true,
    roles: ['teacher'],
  },
  {
    path: teacherRouteConfig.slideWithParamRoster,
    page: AssignSlide,
    isPrivate: true,
    roles: ['teacher'],
    layout: AssignLayout,
  },
  {
    path: teacherRouteConfig.slideWithParamWatch,
    page: ViewWork,
    isPrivate: true,
    roles: ['teacher'],
    layout: AssignLayout,
  },
  {
    path: teacherRouteConfig.slideWithParamWatchDetail,
    page: ViewWork,
    isPrivate: true,
    roles: ['teacher'],
    layout: AssignLayout,
  },
  // {
  //   path: teacherRouteConfig.trash,
  //   page: Trash,
  //   isPrivate: true,
  //   roles: ['teacher'],
  // },
  {
    path: teacherRouteConfig.slideLibraryWithParam,
    page: SlideOnlyView,
    isPrivate: true,
    roles: ['teacher'],
    layout: AssignLayoutNoDirector,
  },
];

const studentRoutes = [
  {
    path: studentRouteConfig.dashboard,
    page: StudentDashboard,
    isPrivate: true,
    roles: ['teacher', 'student'],
  },
  {
    path: studentRouteConfig.myClass,
    page: StudentClassRoom,
    isPrivate: true,
    roles: ['teacher', 'student'],
  },
  {
    path: studentRouteConfig.assignments,
    page: StudentAssignment,
    isPrivate: true,
    roles: ['teacher', 'student'],
  },
  {
    path: studentRouteConfig.myClassDetail,
    page: ClassDetail,
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
