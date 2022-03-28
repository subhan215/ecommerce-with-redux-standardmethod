import ActionType from "../../constant/constant";

const INITIAL_STATE = {

    login: {
        logInName: "",
        logInEmail: "",
        logInPassword: "",
        logInUid: "",
        logInPhoneNo: ""
    }
}
function logInReducer(state = INITIAL_STATE , action) {
   switch(action.type) {
       case ActionType.SignIn : 
        return {login : {...state.login , logInName : action.name , logInEmail : action.email , logInPassword : action.password , logInUid : action.uid , logInPhoneNo : action.phoneNo} }
   } return state
}
export default logInReducer