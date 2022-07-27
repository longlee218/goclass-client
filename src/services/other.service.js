import HttpClient from '../utils/HttpClient';

const otherService = {
  searchOrganization: async (search, page = 1, limit = 10) => {
    try {
      const { data } = await HttpClient({
        url: '/organization',
        method: 'GET',
        params: {
          search,
          page,
          limit,
        },
      });
      return data.docs;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default otherService;
