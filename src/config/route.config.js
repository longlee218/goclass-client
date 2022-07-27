const PREFIX_TEACHER = '/teacher';
const PREFIX_STUDENT = '/student';

export const teacherRouteConfig = {
  dashboard: PREFIX_TEACHER + '/dashboard',
  managerClass: PREFIX_TEACHER + '/manage-class',
};

export const studentRouteConfig = {
  dashboard: PREFIX_STUDENT + '/dashboard',
};

export const publicRouteConfig = {
  login: '/login',
  signUp: '/sign-up',
};
