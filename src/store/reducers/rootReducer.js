import { combineReducers } from "redux";
import loadingReducer from "./authReducers/loadingReducer";
import logInReducer from "./authReducers/loginReducer";
import PostsReducer from "./postReducers/PostsReducer";
import updProfReducer from "./profReducers/updProfReducer";


const rootReducer = combineReducers({
    logInReducer,
    PostsReducer,
    updProfReducer,
    loadingReducer
})
export default rootReducer