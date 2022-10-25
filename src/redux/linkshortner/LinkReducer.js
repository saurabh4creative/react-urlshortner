import { ADD_LINK, URL_LINK, ERROR_URL } from "./LinkTypes";

const initialState = {
     loading : true,
     status  : false,
     isLoad  : false,
     data    : []
};

export const LinkReducer = (state = initialState, action) => {
     switch( action.type ){
          case ADD_LINK :
            return {
                ...state,
                loading : false,
                status  : true,
                isLoad  : false,
                data    : action.payload
            }; 
          
          case URL_LINK :
              if( action.payload ){
                   return {
                        ...state,
                        loading : false,
                        status  : true,
                        isLoad  : false,
                        data    : action.payload
                   }; 
              }
              else{
                   return {
                       ...state,
                       loading : false,
                       status  : false,
                       isLoad  : true,
                       data    : [ ]
                   }; 
              }

          default : return state;     
     }
}

const initState = {
     error: null
};

export const errorReducer = (state = initState, action) => {
     switch( action.type ){
          case ERROR_URL :
               return { 
                    error : action.payload        
               }
          default : return state     
     } 
}