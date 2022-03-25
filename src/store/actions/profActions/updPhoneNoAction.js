import ActionType from "../../constant/constant";


const updatePhoneNo = (checkData , phoneNo , uid) => {
    return (dispatch) => {
        let logInData = JSON.parse(localStorage.getItem("logInUser"));
        logInData.phoneNo = phoneNo;

        let signUpData = JSON.parse(localStorage.getItem("usersData"));
        localStorage.setItem("logInUser", JSON.stringify(logInData))
        let flag = false;
        for (var i = 0; i < signUpData.length; i++) {
            if (signUpData[i].uid === uid) {
                flag = true;
                signUpData[i].phoneNo = phoneNo
            }
        }
        localStorage.setItem("usersData", JSON.stringify(signUpData))
        alert("Phone No has been changed!")
        dispatch({ type: ActionType.checkData, ...checkData, phoneNo })
    }
}
export { updatePhoneNo }