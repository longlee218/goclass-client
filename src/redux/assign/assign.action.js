import alertAction from '../alert/alert.action';
import assignType from './assign.type';
import assignmentService from '../../services/assignment.service';

const assignActions = {
  getAssignmentSuccess: (payload) => ({
    type: assignType.GET_ASSIGN_SUCCESS,
    payload,
  }),
  findAssignment: function (id) {
    return async (dispatch) => {
      assignmentService
        .findById(id)
        .then((assignment) => {
          dispatch(this.getAssignmentSuccess(assignment));
          dispatch(alertAction.clear());
        })
        .catch((error) => dispatch(alertAction.error(error.message)));
    };
  },
  updateAssignment: function (id, payload) {
    return async (dispatch) => {
      dispatch(alertAction.loading());
      assignmentService
        .updateAssign(id, payload)
        .then((assignment) => {
          dispatch(alertAction.success());
          dispatch(this.getAssignmentSuccess(assignment));
        })
        .catch((error) => dispatch(alertAction.error(error.message)));
    };
  },
};

export default assignActions;
