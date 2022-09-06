import HttpClient from '../utils/HttpClient';

const studentService = {
  addStudent: async (
    classId,
    _id = '',
    email,
    dob,
    fullname,
    gender,
    code,
    student
  ) => {
    try {
      return await HttpClient({
        url: '/students-class' + classId,
        method: 'POST',
        data: {
          _id,
          email,
          dob,
          fullname,
          gender,
          code,
          student,
        },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  updateStudent: async (
    classId,
    _id = '',
    email,
    dob,
    fullname,
    gender,
    code,
    student
  ) => {
    try {
      return await HttpClient({
        url: '/students-class' + classId,
        method: 'PUT',
        data: {
          _id,
          email,
          dob,
          fullname,
          gender,
          code,
          student,
        },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getOfClass: async (classId) => {
    try {
      const { data } = await HttpClient({
        url: '/students-class' + classId + '/all',
        method: 'GET',
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  paginateStudent: async (classId, query) => {
    try {
      const { data } = await HttpClient({
        url: '/students-class' + classId,
        method: 'GET',
        params: query,
      });
      const { data: dataResponse } = data;
      return dataResponse;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  delete: async (classId, id) => {
    try {
      return await HttpClient({
        url: `/students-class${classId}/${id}`,
        method: 'DELETE',
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default studentService;
