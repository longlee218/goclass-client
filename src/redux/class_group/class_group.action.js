import alertActions from '../alert/alert.action';
import classGroupService from '../../services/classGroup.service';
import classGroupType from './class_group.type';
import classRoomActions from '../class_room/class_room.action';

const classGroupActions = {
  get: () => async (dispatch) => {
    try {
      const data = await classGroupService.get();
      dispatch({
        type: classGroupType.GET_CLASS_GROUP,
        payload: data,
      });
      return data;
    } catch (error) {
      dispatch(alertActions.error(error.message));
      return Promise.reject(error);
    }
  },
  create: (name) => async (dispatch) => {
    const success = (payload) => ({
      type: classGroupType.CREATE_CLASS_GROUP,
      payload,
    });
    try {
      dispatch(alertActions.loading());
      const data = await classGroupService.create(name);
      dispatch(alertActions.success());
      dispatch(success(data));
      return data;
    } catch (error) {
      dispatch(alertActions.error(error.message));
      return Promise.reject(error);
    }
  },
  delete: (id) => async (dispatch) => {
    const success = (payload) => ({
      type: classGroupType.DELETE_CLASS_GROUP,
      payload,
    });
    dispatch(alertActions.loading());
    try {
      const data = await classGroupService.delete(id);
      dispatch(success(id));
      dispatch(alertActions.success('Xóa thành công!'));
      return data;
    } catch (error) {
      dispatch(alertActions.error(error.message));
      return Promise.reject(error);
    }
  },
  update: (id, payload) => async (dispatch) => {
    dispatch(alertActions.loading());
    const success = (payload) => ({
      type: classGroupType.UPDATE_CLASS_GROUP,
      payload,
    });
    try {
      const data = await classGroupService.update(id, payload);
      dispatch(success(data));
      dispatch(alertActions.success());
      dispatch(classRoomActions.get());
      return data;
    } catch (error) {
      dispatch(alertActions.error(error.message));
      return Promise.reject(error);
    }
  },
  reset: () => ({
    type: classGroupType.RESET_CLASS_GROUP,
  }),
};

export default classGroupActions;
