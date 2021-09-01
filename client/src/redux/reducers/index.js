import { combineReducers } from "redux";
import memoryReducer from "./memoryReducer";
import userReducer from "./userReducer";

const ROOT_REDUCER = combineReducers({
  memory: memoryReducer,
  user: userReducer,
});

export default ROOT_REDUCER;
