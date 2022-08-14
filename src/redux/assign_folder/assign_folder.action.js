import assignFolderType from './assign_folder.type';

const assignActions = {
  setFolder: (payload) => ({
    type: assignFolderType.SET_ASSIGN_FOLDER,
    payload,
  }),
  reset: () => ({
    type: assignFolderType.RESET_ASSIGN_FOLDER,
  }),
};

export default assignActions;
