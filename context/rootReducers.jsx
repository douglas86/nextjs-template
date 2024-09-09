import { combineReducers } from "@/context/combineReducers";
import { dataReducers, formReducers, userReducers } from "@/context/reducers";

export const rootReducers = combineReducers({
  dataReducers,
  formReducers,
  userReducers,
});
