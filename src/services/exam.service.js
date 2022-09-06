import HttpClient from '../utils/HttpClient';

const examService = {
  create: async (rosterId, payload) => {
    try {
      const { data } = await HttpClient({
        url: '/exam/roster/' + rosterId + '/roster-group',
        method: 'POST',
        data: payload,
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  get: async (rosterId) => {
    try {
      const { data } = await HttpClient({
        url: '/exam/roster/' + rosterId + '/roster-group',
        method: 'GET',
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default examService;
