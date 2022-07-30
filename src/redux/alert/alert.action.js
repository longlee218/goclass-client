import alertType from './alert.type';

const alertActions = {
  success: (message = 'Thành công!') => ({
    type: alertType.SUCCESS,
    payload: { content: message, key: 'message', duration: 3 },
  }),
  loading: (message = 'Đang tải...') => ({
    type: alertType.PRELOAD,
    payload: { content: message, key: 'message' },
  }),
  warning: (message) => ({
    type: alertType.WARNING,
    payload: { content: message, key: 'message', duration: 8 },
  }),
  error: (message) => ({
    type: alertType.ERROR,
    payload: { content: message, key: 'message', duration: 8 },
  }),
  clear: () => ({
    type: alertType.CLEAR,
  }),
};

export default alertActions;
