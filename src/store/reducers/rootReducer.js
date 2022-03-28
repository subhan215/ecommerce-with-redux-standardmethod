import { combineReducers } from "redux";
import logInReducer from "./authReducers/loginReducer";
import PostsReducer from "./postReducers/PostsReducer";
import updProfReducer from "./profReducers/updProfReducer";


const rootReducer = combineReducers({
    logInReducer,
    PostsReducer,
    updProfReducer
})
export default rootReducer