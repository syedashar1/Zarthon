import { LIST_FORCHAT_FAIL, LIST_FORCHAT_REQUEST, LIST_FORCHAT_SUCCESS, POP_NOTIFICATION, UN_POP_NOTIFICATION } from '../types/chatTypes'




export const ListForChatReducer = (state = { loading: true }, action) => {
        switch (action.type) {
          case LIST_FORCHAT_REQUEST:
            return { loading: true };
          case LIST_FORCHAT_SUCCESS:
            return { loading: false, users : action.payload };
          case LIST_FORCHAT_FAIL:
            return { loading: false, error: action.payload };
          default:
            return state;
        }
};

export const NotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case POP_NOTIFICATION:
      return { senders : action.payload };
    default:
      return state;
  }
};