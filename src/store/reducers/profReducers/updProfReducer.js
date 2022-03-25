import ActionType from "../../constant/constant"


const INITIAL_STATE = {
    checkData : {
        name : "",
        email : "",
        password : "" , 
        uid : "" , 
        phoneNo : ""
  
     }
}
function updProfReducer(state =  INITIAL_STATE , action) {
     switch(action.type) {
         case ActionType.checkData : 
         return {...state , checkData : {...state.checkData , name : action.name , email : action.email , password : action.password , uid : action.uid , phoneNo : action.phoneNo} }
     } return state
}
export default updProfReducer