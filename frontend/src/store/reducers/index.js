import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
// import other reducers

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  // ... other reducers
});

export default rootReducer;
