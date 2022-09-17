import alertActions from '../alert/alert.action';
import notifyService from '../../services/notify.service';
import notifyType from './notify.type';

const notifyAction = {
  createNotify: function (content) {
    const success = (payload) => ({
      type: notifyType.CREATE_NOTIFY,
      payload,
    });

    return async (dispatch) => {
      dispatch(alertActions.loading());
      try {
        const notify = await notifyService.create(content);
        dispatch(alertActions.success());
        dispatch(success(notify));
        return notify;
      } catch (error) {
        dispatch(alertActions.error(error.message));
        return error;
      }
    };
  },
  updateNotify: function (id, content) {
    const success = (payload) => ({
      type: notifyType.UPDATE_NOTIFY,
      payload,
    });

    return async (dispatch) => {
      dispatch(alertActions.loading());
      try {
        const notify = await notifyService.update(id, content);
        dispatch(alertActions.success());
        dispatch(success(notify));
        return notify;
      } catch (error) {
        dispatch(alertActions.error(error.message));
        return error;
      }
    };
  },
  deleteNotify: function (id) {
    const success = (payload) => ({
      type: notifyType.DELETE_NOTIFY,
      payload,
    });

    return async (dispatch) => {
      dispatch(alertActions.loading());
      try {
        const notify = await notifyService.delete(id);
        dispatch(alertActions.success());
        dispatch(success(notify));
        return notify;
      } catch (error) {
        dispatch(alertActions.error(error.message));
        return error;
      }
    };
  },
  getNotify: function () {
    const success = (payload) => ({
      type: notifyType.GET_NOTIFY,
      payload,
    });

    return async (dispatch) => {
      try {
        const notify = await notifyService.get();
        dispatch(success(notify));
        return notify;
      } catch (error) {
        dispatch(alertActions.error(error.message));
        return error;
      }
    };
  },
};

export default notifyAction;
