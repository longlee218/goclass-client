import HttpClient from '../utils/HttpClient';

const classRoomService = {
  create: async (payload) => {
    try {
      const { data } = await HttpClient({
        url: '/class-room',
        method: 'POST',
        data: payload,
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  update: async (payload, id) => {
    try {
      const { data } = await HttpClient({
        url: '/class-room/' + id,
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
        url: '/class-room',
        method: 'GET',
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default classRoomService;
