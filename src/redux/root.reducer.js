import { alertReducer } from './alert/alert.reducer';
import { assignReducer } from './assign_folder/assign_folder.reducer';
import authReducer from './auth/auth.reducer';
import { classGroupReducer } from './class_group/class_group.reducer';
import { classRoomReducer } from './class_room/class_room.reducer';
import { combineReducers } from 'redux';
import loadingReducer from './loading/loading.reducer';
import studentReducer from './student/student.reducer';

const allReducers = combineReducers({
  loading: loadingReducer,
  alert: alertReducer,
  auth: authReducer,
  classRoom: classRoomReducer,
  classGroup: classGroupReducer,
  student: studentReducer,
  assignFolder: assignReducer,
});

const rootReducer = (state, action) => {
  // if (action.type === 'RESET_APP') {
  //   console.log(state, action);
  //   state = undefined;
  // }
  return allReducers(state, action);
};

export default rootReducer;
