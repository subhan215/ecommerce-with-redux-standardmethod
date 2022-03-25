import ActionType from "../../constant/constant";


const updateEmail = (checkData , email , uid) => {
    return (dispatch) => {
        let logInData = JSON.parse(localStorage.getItem("logInUser"));
        logInData.email = email;

        let signUpData = JSON.parse(localStorage.getItem("usersData"));
        localStorage.setItem("logInUser", JSON.stringify(logInData))
        let flag = false;
        for (var i = 0; i < signUpData.length; i++) {
            if (signUpData[i].uid === uid) {
                flag = true;
                signUpData[i].email = email
            }
        }
        localStorage.setItem("usersData", JSON.stringify(signUpData))
        alert("Email has been changed!")
        dispatch({ type: ActionType.checkData, ...checkData, email })
    }
}
export { updateEmail }