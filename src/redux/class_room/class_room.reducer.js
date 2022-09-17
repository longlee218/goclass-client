import classRoomType from './class_room.type';

const initState = {
  id: '',
  filter: '',
  classRoomGroup: [],
  alert: {},
};

export function classRoomReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case classRoomType.RESET_CLASS: {
      return { ...state, ...initState };
    }
    case classRoomType.GET_CLASS_SUCCESS:
      return { ...state, classRoomGroup: payload };
    case classRoomType.FILTER_CLASS:
      return {
        ...state,
        filter: payload,
      };
    case classRoomType.FIND_CLASS:
      return {
        ...state,
        id: payload,
      };
    case classRoomType.CREATE_CLASS:
      return state;
    case classRoomType.UPDATE_CLASS:
      return state;
    case classRoomType.DUPLICATE_CLASS:
      const newClassGroup = [...state.classRoomGroup].map(
        ({ group, classRooms }) => {
          if (group === null && !payload.classRoomGroupId) {
            return { group, classRooms: [...classRooms, payload] };
          }
          if (group !== null && payload.classRoomGroupId === group._id) {
            return { group, classRooms: [...classRooms, payload] };
          }
          return { group, classRooms };
        }
      );
      return {
        ...state,
        classRoomGroup: newClassGroup,
      };
    case classRoomType.DELETE_CLASS:
      const { classRoomGroup } = state;
      classRoomGroup.forEach((clg) => {
        clg.classRooms = clg.classRooms.filter(
          (classRoom) => classRoom._id !== payload
        );
      });
      return { ...state, classRoomGroup };
    case classRoomType.GET_ALERT_CLASS:
      // means this class dont have any alert
      if (payload.length === 0) {
        return state;
      }
      const firstAlert = payload[0];
      return {
        ...state,
        alert: { ...state.alert, [firstAlert.classRoomId]: payload },
      };
    default:
      return state;
  }
}
