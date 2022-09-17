import HttpClient from '../utils/HttpClient';

const notifyService = {
  create: async (content) => {
    try {
      const { data } = await HttpClient({
        url: '/notify',
        method: 'POST',
        data: {
          content,
        },
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  update: async (id, payload) => {
    delete payload._id;
    try {
      const { data } = await HttpClient({
        url: '/notify/' + id,
        method: 'PATCH',
        data: payload,
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  delete: async (id) => {
    try {
      await HttpClient({
        url: '/notify/' + id,
        method: 'DELETE',
      });
      return id;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  get: async () => {
    try {
      const { data } = await HttpClient({
        url: '/notify',
        method: 'GET',
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default notifyService;
