import configType from './config.types';

const configActions = {
  setTitle: (title) => ({
    type: configType.SET_TITLE,
    payload: title,
  }),
  setSubTitle: (title) => ({
    type: configType.SET_SUB_TITLE,
    payload: title,
  }),
};

export default configActions;
