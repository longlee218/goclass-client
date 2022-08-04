import HttpClient from '../utils/HttpClient';

const userService = {
  getIn4OfUser: async (id) => {
    try {
      const { data } = await HttpClient({
        url: '/user/info/' + id,
        method: 'GET',
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default userService;
