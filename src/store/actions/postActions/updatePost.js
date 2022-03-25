import ActionType from "../../constant/constant";


const updPost = (uidandi, updPostData) => {
    return (dispatch) => {
        let postData = JSON.parse(localStorage.getItem("posts"));
        let flag = false
        for (var i = 0; i < postData.length; i++) {
            if (postData[i].postUid + i === uidandi) {
                flag = true
                postData.splice(i, 1, updPostData);
                localStorage.setItem("posts", JSON.stringify(postData))

                dispatch({ type: ActionType.Posts, posts: postData })

            }
        }
    }

}
export { updPost  }