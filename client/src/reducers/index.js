import { combineReducers } from "redux";

import userState from "./auth";
import userAccount from "./transactions";

export default combineReducers({ userState, userAccount });
