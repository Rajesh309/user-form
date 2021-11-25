import React,{useContext,createContext} from "react";
 
export const UserContext = createContext();
export const useUserValue = () => useContext(UserContext);
 
export const reducer = (state,action) => {
    switch(action.type) {
        case "ADD_DETAILS": {
            return {
              ...state,
              userDetails: [
                  ...state.userDetails,
                  action.payload
              ],
            };
          }
          default : return state
    }
   
    
}

export const initialState = {
    userDetails : []
}