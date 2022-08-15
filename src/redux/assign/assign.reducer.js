import assignType from './assign.type';

const initState = {};
function assignReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case assignType.GET_ASSIGN_SUCCESS:
      return { ...state, ...payload };
    default:
      return state;
  }
}

export default assignReducer;
