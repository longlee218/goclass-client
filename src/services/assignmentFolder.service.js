import HttpClient from '../utils/HttpClient';
import { checkIfDuplicateExists } from '../helpers/array.helper';

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
  createFolder: async (nameFolder, parentId, sameLevelFolder) => {
    const listName = nameFolder.split(',');
    const checkingArray = [...listName, ...sameLevelFolder.map((e) => e.name)];
    if (checkIfDuplicateExists(checkingArray)) {
      return Promise.reject(
        new Error('Tên thư mục đã tồn tại. Vui lòng chọn tên khác')
      );
    }
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

  editFolder: async (id, nameFolder, sameLevelFolder) => {
    const checkingArray = sameLevelFolder.map((item) => {
      if (item._id === id) {
        return nameFolder;
      }
      return item.name;
    });
    if (checkIfDuplicateExists(checkingArray)) {
      return Promise.reject(
        new Error('Tên thư mục đã tồn tại. Vui lòng chọn tên khác')
      );
    }
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
