import ActionType from "../../constant/constant";


const deletePost = (uid) => {
    return (dispatch) => {
        let oldPostData = JSON.parse(localStorage.getItem("posts"));
        let flag = false;
        for (var i = 0; i < oldPostData.length; i++) {
            if (oldPostData[i].postUid + i === uid) {
                flag = true;
                console.log(oldPostData)
                oldPostData.splice(i, 1);
                console.log(oldPostData)
                localStorage.setItem("posts", JSON.stringify(oldPostData))
                dispatch({ type: ActionType.Posts, posts: oldPostData })
            }
        }
    }
}
export { deletePost }