const PREFIX_TEACHER = '/teacher';
const PREFIX_STUDENT = '/student';

export const teacherRouteConfig = {
  dashboard: PREFIX_TEACHER + '/dashboard',
  myClass: PREFIX_TEACHER + '/my-class',
  myClassDetail: PREFIX_TEACHER + '/my-class/:id',
};

export const studentRouteConfig = {
  dashboard: PREFIX_STUDENT + '/dashboard',
};

export const publicRouteConfig = {
  login: '/login',
  signUp: '/sign-up',
};
