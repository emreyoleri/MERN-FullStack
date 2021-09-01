import * as actionTypes from "../actionTypes";

const initialState = {
  memories: [],
};
const memoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL_MEMORIES:
      return {
        ...state,
        memories: action.payload,
      };

    case actionTypes.CREATE_MEMORY:
      return {
        ...state,
        memories: [...state.memories, action.payload],
      };

    case actionTypes.DELETE_MEMORY:
      return {
        ...state,
        memories: [
          ...state.memories.filter((memory) => memory._id !== action.payload),
        ],
      };

    case actionTypes.UPDATE_MEMORY:
      return {
        ...state,
        memories: [
          ...state.memories.map((memory) =>
            memory._id === action.payload._id ? action.payload : memory
          ),
        ],
      };
    default:
      return state;
  }
};

export default memoryReducer;
