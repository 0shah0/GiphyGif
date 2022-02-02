import { combineReducers } from "redux";
import { ActionType } from "../../types/enums";
import { IAction, IAppState, IErrorObject, IGif } from "../../types/interfaces";
import { AppState} from "../model/store-model";
const initialState = new AppState()

const gifList = (state: IGif[] = initialState.gifs, action: IAction) : IGif[] =>{
     switch(action.type){
        case ActionType.UPDATE_GIFS_TO_STORE:
         state =  (action.payload)? action.payload as IGif[]: state;
         break;
        case ActionType.APPEND_GIFS_TO_STORE:
         state = [...state,  ...action.payload];
         break; 
        default:
         // nothing to change
    }
   return state;  
}
const setModalContent = (state: IGif = initialState.modalContent, action: IAction) : IGif =>{
    switch(action.type){
       case ActionType.SET_MODAL_CONTENT:
        state =  (action.payload)? action.payload as IGif: state;
        break;
       default:
        // nothing to change
   }
  return state;  
}
const setModalState = (state: boolean = initialState.modalState, action: IAction) : boolean =>{
    switch(action.type){
       case ActionType.SET_MODAL_STATE:
        state =   action.payload;
        break;
       default:
        // nothing to change
   }
  return state;  
}
const setError = (state: IErrorObject = initialState.error, action: IAction) : IErrorObject =>{
  switch(action.type){
     case ActionType.SET_API_ERROR:
      state =   action.payload;
      break;
     default:
      // nothing to change
 }
return state;  
}
let reducers : Record<keyof IAppState, (state: any, action: any)=>any> = {
    gifs : gifList,
    modalContent: setModalContent,
    modalState: setModalState,
    error: setError
}
// key of IAppState
export default combineReducers(reducers);