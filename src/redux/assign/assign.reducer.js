import assignType from './assign.type';

const initState = {};
function assignReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case assignType.GET_ASSIGN_SUCCESS:
      return { ...state, ...payload };
    case assignType.UPDATED_SLIDE:
      const oldSlides = state.slides;
      const newSlides = oldSlides.map((slide) => {
        if (slide._id === payload._id) {
          return payload;
        }
        return slide;
      });
      return { ...state, slides: newSlides };
    case assignType.DUPLICATE_SLIDE:
      return { ...state, slides: [...state.slides, payload] };
    default:
      return state;
  }
}

export default assignReducer;
