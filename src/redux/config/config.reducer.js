import configType from './config.types';

const INITIAL = { title: 'Education', subTitle: '' };
const configReducer = (state = INITIAL, action) => {
  const { type, payload } = action;
  switch (type) {
    case configType.SET_TITLE:
      return {
        ...state,
        title: payload,
      };
    case configType.SET_SUB_TITLE:
      return {
        ...state,
        subTitle: payload,
      };
    default:
      return state;
  }
};

export default configReducer;
