import alertType from './alert.type';
import { message } from 'antd';

export function alertReducer(state = {}, action) {
  switch (action.type) {
    case alertType.PRELOAD:
      message.loading(action.payload);
      return {
        type: 'alert-loading',
        message: action.payload,
      };
    case alertType.SUCCESS:
      // toast.success(action.payload, {
      //   position: 'bottom-center',
      //   autoClose: 5000,
      //   hideProgressBar: true,
      //   closeOnClick: true,
      //   pauseOnHover: false,
      //   draggable: true,
      //   progress: undefined,
      // });
      message.success(action.payload);
      return {
        type: 'alert-success',
        message: action.payload,
      };
    case alertType.WARNING:
      // toast.warning(action.payload, {
      //   position: 'bottom-center',
      //   autoClose: 5000,
      //   hideProgressBar: true,
      //   closeOnClick: true,
      //   pauseOnHover: false,
      //   draggable: true,
      //   progress: undefined,
      // });
      message.warning(action.payload);
      return {
        type: 'alert-warning',
        message: action.payload,
      };
    case alertType.ERROR:
      // toast.error(action.payload, {
      //   position: 'bottom-center',
      //   autoClose: 5000,
      //   hideProgressBar: true,
      //   closeOnClick: true,
      //   pauseOnHover: false,
      //   draggable: true,
      //   progress: undefined,
      // });
      message.error(action.payload);
      return {
        type: 'alert-danger',
        message: action.payload,
      };
    case alertType.CLEAR:
      return {};
    default:
      return state;
  }
}
