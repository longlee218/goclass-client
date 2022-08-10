import HttpClient from '../utils/HttpClient';

const assignmentFolderService = {
  getFolderAndAssignment: async (parentId) => {
    try {
      const { data } = await HttpClient({
        url: parentId ? '/assign/category/' + parentId : '/assign/category',
        method: 'GET',
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  createFolder: async (nameFolder, parentId) => {
    try {
      const { data } = await HttpClient({
        url: parentId ? '/assign/category/' + parentId : '/assign/category',
        method: 'POST',
        data: {
          name: nameFolder,
        },
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default assignmentFolderService;
