import HttpClient from '../utils/HttpClient';

const examService = {
  createRosterGroup: async (rosterId, payload) => {
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
  getRosterGroup: async (rosterId) => {
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
  updateRosterGroup: async (id, payload) => {
    try {
      const { data } = await HttpClient({
        url: '/exam/roster-group/' + id,
        method: 'PATCH',
        data: payload,
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getToDoExam: async () => {
    try {
      const { data } = await HttpClient({
        url: '/exam/analyze/',
        method: 'GET',
        params: {
          type: 'todo',
        },
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default examService;
