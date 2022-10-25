import axios from "axios";
import { ADD_LINK, API_URL, URL_LINK, ERROR_URL } from "./LinkTypes";

export const addUrl = (data) => {
     return async (dispatch) => {
          const postData = {
               link : data,
               date : new Date(),
               url  : Math.random().toString(36).slice(2)
          };

          const response = await axios.post(`${API_URL}/shortlink`, postData);

          dispatch({
                type : ADD_LINK,
                payload : response.data 
          });
     } 
}

export const redirectUrl = (url) => {
     return async (dispatch) => {
          const response = await axios.get(`${API_URL}/shortlink?url=${url}`);
          
          if( response.data.length ){
                dispatch({
                        type : URL_LINK,
                        payload : response.data[0] 
                });
          } 
          else{
                dispatch({
                        type : URL_LINK,
                        payload : ''
                });
          } 
     }
}

export const getError = (error) => {
     return {
           type : ERROR_URL,
           payload : error.message
     }
}