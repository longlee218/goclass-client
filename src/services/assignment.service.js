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
};

export default assignmentService;
