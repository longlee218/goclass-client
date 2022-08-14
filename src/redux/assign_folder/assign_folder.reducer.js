import assignFolderType from './assign_folder.type';

const initState = [];
export function assignReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case assignFolderType.SET_ASSIGN_FOLDER:
      return { ...state, ...payload };
    case assignFolderType.RESET_ASSIGN_FOLDER:
      return initState;
    default:
      return state;
  }
}
