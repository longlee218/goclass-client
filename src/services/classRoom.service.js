import HttpClient from '../utils/HttpClient';

const classRoomService = {
  findById: async (id) => {
    try {
      const { data } = await HttpClient({
        url: '/class-room/' + id,
        method: 'GET',
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
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
  delete: async (classRoomId) => {
    try {
      const { data } = await HttpClient({
        url: '/class-room/' + classRoomId,
        method: 'DELETE',
      });
      return data;
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
  duplicate: async (id) => {
    try {
      const { data } = await HttpClient({
        url: '/class-room-duplicate',
        method: 'POST',
        data: {
          id,
        },
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  addNewSession: async (payload) => {
    try {
      const res = await HttpClient({
        url: '/class-room-new-session', // return 201
        method: 'POST',
        data: payload,
      });
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getAlertInClass: async (id) => {
    try {
      const { data } = await HttpClient({
        url: '/class-room-alert/' + id,
        method: 'GET',
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  createAlertInClass: async (id, formData) => {
    try {
      const { data } = await HttpClient({
        url: '/class-room-alert/' + id,
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  updateAlertInClass: async (id, formData) => {
    try {
      const { data } = await HttpClient({
        url: '/class-room-alert/detail/' + id,
        method: 'PATCH',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData,
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteAlertInClass: async (id) => {
    try {
      return await HttpClient({
        url: '/class-room-alert/detail/' + id,
        method: 'DELETE',
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  removeFileAlertInClass: async (id, body) => {
    try {
      return await HttpClient({
        url: '/class-room-alert/detail/' + id + '/files',
        method: 'DELETE',
        data: body,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default classRoomService;
