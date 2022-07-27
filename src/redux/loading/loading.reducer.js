import loadingType from './loading.types';

const INITIAL = { isShow: true };
const loadingReducer = (state = INITIAL, action) => {
  switch (action.type) {
    case loadingType.PRE_LOAD:
      return {
        ...state,
        isShow: true,
      };
    case loadingType.AFTER_LOAD:
      return {
        ...state,
        isShow: false,
      };
    default:
      return state;
  }
};

export default loadingReducer;
