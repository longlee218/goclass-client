import HttpClient from '../utils/HttpClient';

const assignmentService = {
  initBlankAssign: async (parentId) => {
    try {
      const { data } = await HttpClient({
        url: '/assign/init-blank/' + (parentId || ''),
        method: 'POST',
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  updateAssign: async (id, payload) => {
    try {
      const { data } = await HttpClient({
        url: '/assignment/' + id,
        method: 'PATCH',
        data: payload,
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  findById: async (id) => {
    try {
      const { data } = await HttpClient({
        url: '/assignment/' + id,
        method: 'GET',
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  delete: async (id) => {
    try {
      const { data } = await HttpClient({
        url: '/assignment/' + id,
        method: 'DELETE',
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  duplicate: async (id) => {
    try {
      const { data } = await HttpClient({
        url: '/assignment/' + id + '/duplicate',
        method: 'POST',
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default assignmentService;
