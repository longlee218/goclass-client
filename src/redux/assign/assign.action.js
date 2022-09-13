import alertAction from '../alert/alert.action';
import alertActions from '../alert/alert.action';
import assignType from './assign.type';
import assignmentService from '../../services/assignment.service';
import slideService from '../../services/slide.service';

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
      // dispatch(alertAction.loading());
      assignmentService
        .updateAssign(id, payload)
        .then((assignment) => {
          // dispatch(alertAction.success());
          dispatch(this.getAssignmentSuccess(assignment));
        })
        .catch((error) => dispatch(alertAction.error(error.message)));
    };
  },
  updateSlide: function (id, payload) {
    return async (dispatch) => {
      slideService.update(id, payload).then((data) => {
        dispatch({
          type: assignType.UPDATED_SLIDE,
          payload: data,
        });
      });
    };
  },
  duplicateSlide: function (id) {
    return async (dispatch) => {
      dispatch(alertActions.loading());
      slideService.duplicate(id).then((data) => {
        dispatch({
          type: assignType.DUPLICATE_SLIDE,
          payload: data,
        });
        dispatch(alertActions.success());
      });
    };
  },
};

export default assignActions;
