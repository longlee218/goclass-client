import HttpClient from '../utils/HttpClient';

const classGroupService = {
  create: async (nameGroup) => {
    try {
      const { data } = await HttpClient({
        url: '/class-group',
        method: 'POST',
        data: {
          name: nameGroup,
        },
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
        url: '/class-group/' + id,
        method: 'DELETE',
      });
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  update: async (id, payload) => {
    delete payload._id;
    try {
      const { data } = await HttpClient({
        url: '/class-group/' + id,
        method: 'PUT',
        data: payload,
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  get: async () => {
    try {
      const { data } = await HttpClient({
        url: '/class-group',
        method: 'GET',
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default classGroupService;
