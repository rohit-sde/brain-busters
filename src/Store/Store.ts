import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./AboutGame.ts"; // Import combined reducers from the previous step

export default configureStore({
  reducer: rootReducer,
});
