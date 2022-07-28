import { alertReducer } from './alert/alert.reducer';
import authReducer from './auth/auth.reducer';
import { classGroupReducer } from './class_group/class_group.reducer';
import { classRoomReducer } from './class_room/class_room.reducer';
import { combineReducers } from 'redux';
import loadingReducer from './loading/loading.reducer';

const rootReducer = combineReducers({
  loading: loadingReducer,
  alert: alertReducer,
  auth: authReducer,
  classRoom: classRoomReducer,
  classGroup: classGroupReducer,
});

export default rootReducer;
