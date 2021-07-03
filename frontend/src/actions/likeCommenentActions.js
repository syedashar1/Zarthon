import Axios from 'axios';
import { GET_LIKES_FAIL, GET_LIKES_REQUEST, GET_LIKES_SUCCESS, LIKE_FAIL, LIKE_REQUEST, LIKE_SUCCESS , COMMENT_REQUEST , COMMENT_SUCCESS , COMMENT_FAIL, NOTIFICATION_SUCCESS, NOTIFICATION_REQUEST, NOTIFICATION_FAIL, NOTIFICATION_RESET, EDIT_CAPTION_REQUEST, EDIT_CAPTION_SUCCESS, EDIT_CAPTION_FAIL, DELETE_POST_REQUEST, DELETE_POST_FAIL } from '../types/likeCommentTypes';

export const like = ({id , postid}) => async (dispatch , getState) => {

        const userInfo = getState().userSignin.userInfo
        dispatch({ type: LIKE_REQUEST  });
        console.log(id);
      
        try {
                const { data } = await Axios.put(`/api/likecomment/like/${id}/${postid}`, {} , {
                        headers: { Authorization: `Bearer ${userInfo.token}` } } )  
                dispatch({ type: LIKE_SUCCESS , payload : data });


        } 
      
        catch (error) {
              dispatch({
                      type: LIKE_FAIL,
                      payload:
                      error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message,
          });
        }




};






export const comment = ({id , postid , comment}) => async (dispatch , getState) => {

        if(comment == '') return
        const userInfo = getState().userSignin.userInfo
        dispatch({ type: COMMENT_REQUEST  });
        console.log(id);
      
        try {
                const { data } = await Axios.put(`/api/likecomment/comment/${id}/${postid}`, {comment} , {
                        headers: { Authorization: `Bearer ${userInfo.token}` } } )  
                dispatch({ type: COMMENT_SUCCESS , payload : data });
        } 
      
        catch (error) {
              dispatch({
                      type: COMMENT_FAIL,
                      payload:
                      error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message,
          });
        }




};






export const editCaption = ({id , postid , caption}) => async (dispatch , getState) => {

        const userInfo = getState().userSignin.userInfo
        dispatch({ type: EDIT_CAPTION_REQUEST  });
      
        try {
                await Axios.put(`/api/likecomment/editcaption/${id}/${postid}`, {caption} , {
                        headers: { Authorization: `Bearer ${userInfo.token}` } } ) 


        } 
      
        catch (error) {
              dispatch({
                      type: EDIT_CAPTION_FAIL,
                      payload:
                      error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message,
          });
        }




};



export const deletePost = ({id , postid}) => async (dispatch , getState) => {

        const userInfo = getState().userSignin.userInfo
        dispatch({ type: DELETE_POST_REQUEST  });
      
        try {
                await Axios.put(`/api/likecomment/delete/${id}/${postid}`, { } , {
                        headers: { Authorization: `Bearer ${userInfo.token}` } } )
                
                console.log('post deleted');


        } 
      
        catch (error) {
              dispatch({
                      type: DELETE_POST_FAIL,
                      payload:
                      error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message,
          });
        }




};




export const getLikes = ({id , postid}) => async (dispatch , getState) => {

        const userInfo = getState().userSignin.userInfo
        dispatch({ type: GET_LIKES_REQUEST  });
        
      
        try {
                const { data } = await Axios.get(`/api/likecomment/getlikes/${id}/${postid}`, {} , {
                        headers: { Authorization: `Bearer ${userInfo.token}` } } )    
             
                    
                dispatch({ type: GET_LIKES_SUCCESS , payload : data });
        } 
      
        catch (error) {
              dispatch({
                      type: GET_LIKES_FAIL,
                      payload:
                      error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message,
          });
        }




};



export const newNotification = () => async (dispatch , getState) => {
        
        console.log('notification action');
        const newNotification = getState().newNotification.notification

        dispatch({type : NOTIFICATION_REQUEST })
        

        try {
        dispatch({type: NOTIFICATION_SUCCESS , payload : newNotification + 1 })
        } catch (error) {
          const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message;
              dispatch({type : NOTIFICATION_FAIL , payload : message })
        }
              
};


export const resetNewNotification = () => async (dispatch , getState) => {
        
        const userInfo = getState().userSignin.userInfo
        dispatch({type : NOTIFICATION_RESET })
        

        try {
        
        await Axios.put(`/api/likecomment/notificationreset`, { } , {
                headers: { Authorization: `Bearer ${userInfo.token}` } } )  
       
        } catch (error) {
          const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message;
              dispatch({type : NOTIFICATION_FAIL , payload : message })
        }
              
};