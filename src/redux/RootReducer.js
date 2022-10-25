import { combineReducers } from "redux";
import { LinkReducer } from "./linkshortner/LinkReducer";
import { errorReducer } from "./linkshortner/LinkReducer";

const RootReducer = combineReducers({
    LinkReducer, errorReducer
})

export default RootReducer;