import Axios from 'axios';
import { LIST_FORCHAT_FAIL, LIST_FORCHAT_REQUEST, LIST_FORCHAT_SUCCESS, POP_NOTIFICATION } from '../types/chatTypes'






export const avaliableForChat = () => async (dispatch , getState) => {
  
        const userInfo = getState().userSignin.userInfo

        dispatch({ type: LIST_FORCHAT_REQUEST });      
      
        try {
          const { data } = await Axios.get(`/api/chat/forchat/${userInfo._id}`);
          // console.log(data);
          dispatch({ type: LIST_FORCHAT_SUCCESS, payload: data });
        } catch (error) {
          const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message;
          dispatch({ type: LIST_FORCHAT_FAIL, payload: message });
        }
};


export const popChatNotification = (sender) => async (dispatch , getState) => {

  const userInfo = getState().userSignin.userInfo


  try {
    const { data } = await Axios.get(`/api/chat/notification/${sender}` , {
      headers: { Authorization: `Bearer ${userInfo.token}` } } );

    dispatch({ type: POP_NOTIFICATION , payload : data  });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log('there was an error');
  }

  
  
};



export const UnpopChatNotification = (sender) => async (dispatch , getState) => {

  const userInfo = getState().userSignin.userInfo


  try {
    const { data } = await Axios.get(`/api/chat/removenotification/${sender}` , {
      headers: { Authorization: `Bearer ${userInfo.token}` } } );

    dispatch({ type: POP_NOTIFICATION , payload : data  });

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log('there was an error');
  }

};



// export const popChatNotification = (  ) => async (dispatch ) => {

//   try {
//     console.log('chat notification');
//     dispatch({ type: POP_NOTIFICATION });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     console.log(message);
//   }
// };






