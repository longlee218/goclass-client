import loadingType from './loading.types';

const loadingActions = {
  preLoadingDOM: () => ({
    type: loadingType.PRE_LOAD,
  }),
  afterLoadingDOM: () => ({
    type: loadingType.AFTER_LOAD,
  }),
};

export default loadingActions;
