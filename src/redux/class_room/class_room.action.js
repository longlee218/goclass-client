import alertActions from '../alert/alert.action';
import classRoomService from '../../services/classRoom.service';
import classRoomType from './class_room.type';

const classRoomActions = {
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
