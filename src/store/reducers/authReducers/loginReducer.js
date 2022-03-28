import ActionType from "../../constant/constant";

const INITIAL_STATE = {

    login: {
        name: "",
        email: "",
        password: "",
        uid: "",
        phoneNo: ""
    }
}
function logInReducer(state = INITIAL_STATE , action) {
   switch(action.type) {
       case ActionType.SignIn : 
        return {login : {...state.login , name : action.name , email : action.email , password : action.password , uid : action.uid , phoneNo : action.phoneNo} }
   } return state
}
export default logInReducer