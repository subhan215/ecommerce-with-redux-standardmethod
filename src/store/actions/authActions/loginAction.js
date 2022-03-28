import ActionType from "../../constant/constant";
const signIn = (email , password , navigate) => {
    return (dispatch) => {
        let data = JSON.parse(localStorage.getItem("usersData"))
        let flag = false;
        if (data) {
            for (var i = 0; i < data.length; i++) {
                if (email === data[i].email && password === data[i].password) {
                    flag = true;
                    let Name = data[i].name

                    dispatch({
                        type: ActionType.SignIn,
                        email: email,
                        password: password,
                        name: Name,
                        uid: data[i].uid,
                        phoneNo: data[i].phoneNo
                    })
                    localStorage.setItem("logInUser", JSON.stringify({ email: email, password: password, name: Name, uid: data[i].uid, phoneNo: data[i].phoneNo }))
                    navigate("/profile")
                } else if (email === data[i].email && password.length === 0) {
                    alert("Please enter password!")
                }
            }

        } if (flag === false && (email.length === 0 || password.length === 0)) {

            alert("Please fill both fields")
        }
        if (flag === false && (email.length > 0 && password.length > 0)) {
            alert("You have entered wrong password or email!")
        }
    }
}
export { signIn }