import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk"; // Fix: Import thunk correctly
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses LocalStorage
import rootReducer from "./reducers";

// Redux Persist Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["posts"], // Persist only the posts reducer
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create Redux Store
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// Persistor
export const persistor = persistStore(store);

export default store;
