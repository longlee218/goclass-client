const PREFIX_TEACHER = '/teacher';
const PREFIX_STUDENT = '/student';

export const teacherRouteConfig = {
  dashboard: PREFIX_TEACHER + '/dashboard',
  assignmentStores: PREFIX_TEACHER + '/store-assignments',
  assignmentStoresWithParam: PREFIX_TEACHER + '/store-assignments/:fatherId',
  assignmentWithParam: PREFIX_TEACHER + '/assignments/:assignId',
  slideWithParam: PREFIX_TEACHER + '/assignments/:assignId/slide/:slideId',
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
