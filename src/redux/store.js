import { configureStore } from "@reduxjs/toolkit";
import login from "./slices/login";

export default configureStore({
  reducer: { login },
});
