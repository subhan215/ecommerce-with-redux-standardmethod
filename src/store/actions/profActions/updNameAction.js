import ActionType from "../../constant/constant";
const updateName = (checkData , name , uid) => {
    return (dispatch)=> {
        let logInData = JSON.parse(localStorage.getItem("logInUser"));
        logInData.name = name;

        let signUpData = JSON.parse(localStorage.getItem("usersData"));
        localStorage.setItem("logInUser", JSON.stringify(logInData))
        let flag = false;
        for (var i = 0; i < signUpData.length; i++) {
            if (signUpData[i].uid === uid) {
                flag = true;
                signUpData[i].name = name

            }
        }
        localStorage.setItem("usersData", JSON.stringify(signUpData))
        alert("Name has been changed!")
        dispatch({ type: ActionType.checkData, ...checkData, name })
    }
}
export { updateName }