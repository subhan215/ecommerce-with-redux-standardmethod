import ActionType from "../../constant/constant";

const INITIAL_STATE = {
    posts: []
}
function PostsReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionType.Posts:
            return { posts: action.posts }
    } return state
}
export default PostsReducer;