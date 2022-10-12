const PREFIX_TEACHER = '/teacher';
const PREFIX_STUDENT = '/student';

export const teacherRouteConfig = {
  dashboard: PREFIX_TEACHER + '/dashboard',
  assignmentStores: PREFIX_TEACHER + '/store-assignments',
  assignmentStoresWithParam: PREFIX_TEACHER + '/store-assignments/:fatherId',
  assignmentLibrary: PREFIX_TEACHER + '/lib-assignments',
  assignmentLibraryDetail: PREFIX_TEACHER + '/lib-assignments/:id',
  slideLibraryWithParam:
    PREFIX_TEACHER + '/lib-assignments/:assignId/slide/:slideId',
  slideWithParam: PREFIX_TEACHER + '/assignments/:assignId/slide/:slideId',
  assignmentWithParam: PREFIX_TEACHER + '/assignments/:assignId',
  slideWithParamRoster: PREFIX_TEACHER + '/assignments/:assignId/roster',
  slideWithParamWatch: PREFIX_TEACHER + '/assignments/:assignId/watch',
  slideWithParamWatchDetail:
    PREFIX_TEACHER + '/assignments/:assignId/watch/:rosterGroupId',
  myClass: PREFIX_TEACHER + '/my-class',
  myClassDetail: PREFIX_TEACHER + '/my-class/:id',
  trash: PREFIX_TEACHER + '/trash',
};

export const studentRouteConfig = {
  dashboard: PREFIX_STUDENT + '/dashboard',
  myClass: PREFIX_STUDENT + '/my-class',
  assignments: PREFIX_STUDENT + '/assignments',
  myClassDetail: PREFIX_STUDENT + '/my-class/:id',
};

export const publicRouteConfig = {
  login: '/login',
  signUp: '/sign-up',
};
