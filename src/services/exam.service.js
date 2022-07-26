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
  findRosterGroup: async (rosterGroupId) => {
    try {
      const { data } = await HttpClient({
        url: '/exam/roster-group/' + rosterGroupId,
        method: 'GET',
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  joinAssignment: async (assignmentId, rosterGroupId) => {
    try {
      const { data } = await HttpClient({
        url: '/exam/join/',
        method: 'POST',
        data: {
          assignmentId,
          rosterGroupId,
        },
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  rejectAssignment: async (assignWorkId) => {
    try {
      const { data } = await HttpClient({
        url: '/assignment-work/reject',
        method: 'POST',
        data: {
          assignWorkId,
        },
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteRosterGroup: async (id) => {
    try {
      const { data } = await HttpClient({
        url: '/exam/roster-group/' + id,
        method: 'DELETE',
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
  getFinishExam: async () => {
    try {
      const { data } = await HttpClient({
        url: '/exam/analyze/',
        method: 'GET',
        params: {
          type: 'finish',
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
