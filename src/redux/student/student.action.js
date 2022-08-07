import alertActions from '../alert/alert.action';
import studentService from '../../services/student.service';
import studentType from './student.type';

const studentActions = {
  create: (classId, _id, email, dob, fullname, gender, code, student) => {
    return async (dispatch) => {
      dispatch(alertActions.loading());
      try {
        const response = await studentService.addStudent(
          classId,
          _id,
          email,
          dob,
          fullname,
          gender,
          code,
          student
        );
        dispatch(alertActions.success());
        return response;
      } catch (error) {
        dispatch(alertActions.error(error.message));
        return Promise.reject(error);
      }
    };
  },
  update: (classId, _id, email, dob, fullname, gender, code, student) => {
    return async (dispatch) => {
      dispatch(alertActions.loading());
      try {
        const response = await studentService.updateStudent(
          classId,
          _id,
          email,
          dob,
          fullname,
          gender,
          code,
          student
        );
        dispatch(alertActions.success());
        return response;
      } catch (error) {
        dispatch(alertActions.error(error.message));
        return Promise.reject(error);
      }
    };
  },
  get: (classId, query) => {
    const success = (payload) => ({
      type: studentType.GET_STUDENT_OF_CLASS,
      payload,
    });
    return async (dispatch) => {
      try {
        const data = await studentService.paginateStudent(classId, query);
        dispatch(success(data));
        return data;
      } catch (error) {
        dispatch(alertActions.error(error.message));
        return Promise.reject(error);
      }
    };
  },
  delete: (classId, id) => {
    return async (dispatch) => {
      dispatch(alertActions.loading());
      try {
        const data = await studentService.delete(classId, id);
        dispatch(alertActions.success('Xóa thành công!'));
        return data;
      } catch (error) {
        dispatch(alertActions.error(error.message));
        return Promise.reject(error);
      }
    };
  },
};

export default studentActions;
