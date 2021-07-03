import Axios from 'axios';
import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, PROFILE_PIC_UPLOAD_FAIL, PROFILE_PIC_UPLOAD_REQUEST, PROFILE_PIC_UPLOAD_SUCCESS } from '../types/imagesTypes';


export const uploadProfilePic = (url) => async (dispatch , getState) => {

        dispatch({ type: PROFILE_PIC_UPLOAD_REQUEST });
        const userInfo = getState().userSignin.userInfo
      
        try {
                await Axios.put(`/api/users/profilepic`, { profilePic: url } , {
                        headers: { Authorization: `Bearer ${userInfo.token}` } } )        
                dispatch({ type: PROFILE_PIC_UPLOAD_SUCCESS  });
        } 
      
        catch (error) {
              dispatch({
                      type: PROFILE_PIC_UPLOAD_FAIL,
                      payload:
                      error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message,
          });
        }
};




export const createPost = (url , caption ) => async (dispatch , getState) => {

        dispatch({ type: CREATE_POST_REQUEST });
        const userInfo = getState().userSignin.userInfo
        console.log('creating a posts');
      
        try {
                const { data } = await Axios.put(`/api/users/createpost`, { url , caption } , {
                        headers: { Authorization: `Bearer ${userInfo.token}` } } )        
                dispatch({ type: CREATE_POST_SUCCESS , payload : data });
        } 
      
        catch (error) {
              dispatch({
                      type: CREATE_POST_FAIL,
                      payload:
                      error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message,
          });
        }
};