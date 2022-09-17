import alertActions from '../alert/alert.action';
import classRoomService from '../../services/classRoom.service';
import classRoomType from './class_room.type';

const classRoomActions = {
  reset: () => ({
    type: classRoomType.RESET_CLASS,
  }),
  get: () => {
    const success = (payload) => ({
      type: classRoomType.GET_CLASS_SUCCESS,
      payload,
    });
    return async (dispatch) => {
      return classRoomService
        .get()
        .then((classRooms) => {
          dispatch(success(classRooms));
          return Promise.resolve(classRooms);
        })
        .catch((error) => {
          dispatch(alertActions.error(error.message));
          return Promise.reject(error);
        });
    };
  },
  duplicateSuccess: (payload) => ({
    type: classRoomType.DUPLICATE_CLASS,
    payload,
  }),
  duplicate: function (id) {
    const self = this;
    return async (dispatch) => {
      dispatch(alertActions.loading());
      try {
        const classRoomDuplicate = await classRoomService.duplicate(id);
        dispatch(alertActions.success());
        dispatch(self.duplicateSuccess(classRoomDuplicate));
        return classRoomDuplicate;
      } catch (error) {
        dispatch(alertActions.error(error.message));
        return error;
      }
    };
  },
  addNewSession: function (payload) {
    const self = this;
    return async (dispatch) => {
      dispatch(alertActions.loading());
      try {
        await classRoomService.addNewSession(payload);
        dispatch(alertActions.success());
        dispatch(self.get());
      } catch (error) {
        dispatch(alertActions.error(error.message));
        return error;
      }
    };
  },
  createAlert: function (id, content) {
    return async (dispatch) => {
      const data = await classRoomService.createAlertInClass(id, content);
      return data;
    };
  },
  getAlert: function (id) {
    const success = (payload) => ({
      type: classRoomType.GET_ALERT_CLASS,
      payload,
    });
    return async (dispatch) => {
      try {
        const notify = await classRoomService.getAlertInClass(id);
        dispatch(success(notify));
        return notify;
      } catch (error) {
        return error;
      }
    };
  },
  filter: (text) => ({
    type: classRoomType.FILTER_CLASS,
    payload: text,
  }),
  find: (id) => ({
    type: classRoomType.FIND_CLASS,
    payload: id,
  }),
  create: (payload) => ({
    type: classRoomType.CREATE_CLASS,
    payload: payload,
  }),
  delete: (id) => ({
    type: classRoomType.DELETE_CLASS,
    payload: id,
  }),
  update: (payload) => ({
    type: classRoomType.UPDATE_CLASS,
    payload: payload,
  }),
};

export default classRoomActions;
