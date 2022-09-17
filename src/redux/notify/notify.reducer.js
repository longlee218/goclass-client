import notifyType from './notify.type';

const initState = [];

export function notifyReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case notifyType.GET_NOTIFY: {
      return [...payload];
    }
    case notifyType.CREATE_NOTIFY:
      return [payload, ...state];
    case notifyType.UPDATE_NOTIFY:
      return state.map((item) => {
        if (item._id === payload._id) {
          return payload;
        }
        return item;
      });
    case notifyType.DELETE_NOTIFY:
      return state.filter((item) => item._id !== payload);
    default:
      return state;
  }
}
