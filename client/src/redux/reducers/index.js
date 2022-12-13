import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
export const rootReducers = combineReducers({ userReducer });
