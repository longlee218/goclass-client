import studentType from './student.type';

const initState = {
  id: '',
  filter: '',
  students: [],
  totalDocs: 1,
  limit: 10,
  totalPages: 1,
  page: 1,
  pagingCounter: 1,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null,
};

export default function studentReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case studentType.RESET_STUDENT:
      return { ...state, ...initState };
    case studentType.GET_STUDENT_OF_CLASS:
      return {
        ...state,
        students: payload.docs,
        totalDocs: payload.totalDocs,
        limit: payload.limit,
        totalPages: payload.totalPages,
        page: payload.page,
        pagingCounter: payload.pagingCounter,
        hasPrevPage: payload.hasPrevPage,
        hasNextPage: payload.hasNextPage,
        prevPage: payload.prevPage,
        nextPage: payload.nextPage,
      };
    case studentType.CREATE_STUDENT:
      return state;
    default:
      return state;
  }
}
