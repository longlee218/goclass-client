import HttpClient from '../utils/HttpClient';

const slideService = {
  findById: async (id) => {
    try {
      const { data } = await HttpClient({
        url: '/slide/' + id,
        method: 'GET',
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  update: async (id, payload) => {
    try {
      const { data } = await HttpClient({
        url: '/slide/' + id,
        method: 'PATCH',
        data: payload,
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
        url: '/slide/' + id + '/duplicate',
        method: 'POST',
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  add: async (assignmentId) => {
    try {
      const { data } = await HttpClient({
        url: '/slide/',
        method: 'POST',
        data: {
          assignmentId,
        },
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  changeOrder: async (id, order) => {
    try {
      const { data } = await HttpClient({
        url: '/slide/' + id + '/order',
        method: 'POST',
        data: {
          order,
        },
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default slideService;
