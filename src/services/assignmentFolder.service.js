import HttpClient from '../utils/HttpClient';

const assignmentFolderService = {
  getFolderAndAssignment: async (parentId) => {
    try {
      const { data } = await HttpClient({
        url: '/assign/category/' + (parentId || ''),
        method: 'GET',
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getBreadcrumbs: async (parentId) => {
    try {
      const { data } = await HttpClient({
        url: '/assign/breadcrumbs',
        method: 'GET',
        params: {
          parentId,
        },
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
        url: '/assign/category/' + (parentId || ''),
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
  editFolder: async (id, nameFolder) => {
    try {
      const { data } = await HttpClient({
        url: '/assign-category/' + id,
        method: 'PUT',
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
  deleteFolder: async (id) => {
    try {
      await HttpClient({
        url: '/assign-category/' + id,
        method: 'DELETE',
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default assignmentFolderService;
