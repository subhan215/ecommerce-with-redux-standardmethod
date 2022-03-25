import ActionType from "../../constant/constant";

const savePost = (postData, checkUid, logInUid) => {
    return (dispatch) => {
        let postDb = { ...postData, postUid: checkUid ? checkUid : logInUid }

        let arr = [];
        let oldPostData = JSON.parse(localStorage.getItem("posts"))
        if (oldPostData === null) {
            arr.push(postDb)
            localStorage.setItem("posts", JSON.stringify(arr));
            dispatch({ type: ActionType.addPost, posts: arr })
        } else {
            oldPostData.push(postDb)
            localStorage.setItem("posts", JSON.stringify(oldPostData));
            dispatch({
                type: ActionType.Posts, posts: oldPostData
            })

        }
    }
}
export { savePost }