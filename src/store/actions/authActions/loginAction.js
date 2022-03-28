import ActionType from "../../constant/constant";
const signIn = (email, password, navigate, handleShow , handleClose) => {
    return (dispatch) => {

        let data = JSON.parse(localStorage.getItem("usersData"))
        let flag = false;
        if (data) {
            for (var i = 0; i < data.length; i++) {
                if (email === data[i].email && password === data[i].password) {
                    flag = true;
                    dispatch({ type: ActionType.Login_Requested })
                    
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
                    setTimeout(() => {
                        navigate("/profile")
                        dispatch({ type: ActionType.Login_Succeed })
                        handleClose()
                    }, 3000)
                }
            }

        } if (flag === false && (email.length === 0 || password.length === 0)) {

            alert("Please fill both fields")

        }
        if (flag === false && (email.length > 0 && password.length > 0)) {
            dispatch({ type: ActionType.Login_Requested })
            handleShow()
            setTimeout(() => {
                dispatch({ type: ActionType.Login_Failed })
                handleClose()
                alert("You have entered wrong password or email!")
               
            }, 3000)

        }












    }
}
export { signIn }