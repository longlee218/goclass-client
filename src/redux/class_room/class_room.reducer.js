import classRoomType from './class_room.type';

const initState = {
  id: '',
  filter: '',
  classRoomGroup: [
    {
      group: null,
      classRooms: [],
    },
  ],
};

export function classRoomReducer(state = initState, action) {
  switch (action.type) {
    case classRoomType.GET_CLASS_SUCCESS:
      return { ...state, classRoomGroup: action.payload };
    case classRoomType.FILTER_CLASS:
      return {
        ...state,
        filter: action.payload,
      };
    case classRoomType.FIND_CLASS:
      return {
        ...state,
        id: action.payload,
      };
    case classRoomType.CREATE_CLASS:
      return state;
    case classRoomType.UPDATE_CLASS:
      return state;
    case classRoomType.DELETE_CLASS:
      return state;
    default:
      return state;
  }
}
