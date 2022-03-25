import ActionType from "../../constant/constant";


const updatePass = (checkData, currentPass, checkPass, updPass, uid) => {
    return (dispatch) => {
        if (currentPass === checkPass) {
            let logInData = JSON.parse(localStorage.getItem("logInUser"));
            logInData.password = updPass;
            localStorage.setItem("logInUser", JSON.stringify(logInData))
            let signUpData = JSON.parse(localStorage.getItem("usersData"));

            let flag = false;
            for (var i = 0; i < signUpData.length; i++) {
                if (signUpData[i].uid === uid) {
                    flag = true;
                    signUpData[i].password = updPass
                }
            }
            localStorage.setItem("usersData", JSON.stringify(signUpData))
            alert("Password has been changed!")
            dispatch({ type: ActionType.checkData, ...checkData, password: updPass })
        } else {
            alert("You have wrote incorrect password")
        }
    }
}
export { updatePass }