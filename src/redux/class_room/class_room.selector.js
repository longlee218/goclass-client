import { removeVietnameseTones } from '../../helpers/string.helper';

export const classRoomsSelector = (state) => {
  const { filter, classRoomGroup } = state.classRoom;
  const filterVN = removeVietnameseTones(filter).toLowerCase();
  const classRoomGroupFilter = classRoomGroup.map(({ group, classRooms }) => {
    const classRoomsFilter = classRooms.filter(({ name }) => {
      const nameVN = removeVietnameseTones(name).toLowerCase();
      return nameVN.includes(filterVN);
    });
    return {
      group,
      classRooms: classRoomsFilter,
    };
  });
  return classRoomGroupFilter;
};

export const classRoomFindBydId = (state) => {
  const { id, classRoomGroup } = state.classRoom;
  const classRooms = classRoomGroup.reduce(
    (prev, current) => prev.concat(current.classRooms),
    []
  );
  return classRooms.find((classRoom) => classRoom._id === id);
};
