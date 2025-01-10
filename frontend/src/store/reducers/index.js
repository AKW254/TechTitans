import { combineReducers } from "redux";
import authReducer from "./authReducer";
// import other reducers

const rootReducer = combineReducers({
  auth: authReducer,
  // ... other reducers
});

export default rootReducer;
