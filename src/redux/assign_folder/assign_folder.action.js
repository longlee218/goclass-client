import assignFolderType from './assign_folder.type';

const assignFolderActions = {
  setFolder: (payload) => ({
    type: assignFolderType.SET_ASSIGN_FOLDER,
    payload,
  }),
  reset: () => ({
    type: assignFolderType.RESET_ASSIGN_FOLDER,
  }),
};

export default assignFolderActions;
