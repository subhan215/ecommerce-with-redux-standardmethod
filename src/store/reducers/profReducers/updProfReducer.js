import ActionType from "../../constant/constant"


const INITIAL_STATE = {
    checkData : {
        checkName : "",
        checkEmail : "",
        checkPassword : "" , 
        checkUid : "" , 
        checkPhoneNo : ""
  
     }
}
function updProfReducer(state =  INITIAL_STATE , action) {
     switch(action.type) {
         case ActionType.checkData : 
         return {...state , checkData : {...state.checkData , checkName : action.name , checkEmail : action.email , checkPassword : action.password , checkUid : action.uid , checkPhoneNo : action.phoneNo} }
     } return state
}
export default updProfReducer