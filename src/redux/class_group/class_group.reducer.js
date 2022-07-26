import classGroupType from './class_group.type';

const initState = [];
export function classGroupReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case classGroupType.GET_CLASS_GROUP:
      return payload;
    case classGroupType.CREATE_CLASS_GROUP:
      return [...state, payload];
    case classGroupType.UPDATE_CLASS_GROUP:
      console.log({
        state,
        payload,
      });
      return state.map((s) => {
        if (s._id === payload._id) {
          return {
            ...s,
            ...payload,
          };
        }
        return s;
      });
    case classGroupType.DELETE_CLASS_GROUP:
      return state.filter(({ _id }) => _id !== payload);
    case classGroupType.RESET_CLASS_GROUP:
      return initState;
    default:
      return state;
  }
}
