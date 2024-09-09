import { combineReducers } from "@/context/combineReducers";
import { dataReducers, formsReducers, userReducers } from "@/context/reducers";

export const rootReducers = combineReducers({
  dataReducers,
  formsReducers,
  userReducers,
});
