import { CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, PROFILE_PIC_UPLOAD_FAIL, PROFILE_PIC_UPLOAD_REQUEST, PROFILE_PIC_UPLOAD_SUCCESS } from '../types/imagesTypes';


export const profilePicReducer = (state = {}, action) => {
        switch (action.type) {
          case PROFILE_PIC_UPLOAD_REQUEST:
            return { loading: true };
          case PROFILE_PIC_UPLOAD_SUCCESS:
            return { loading: false, success : true };
          case PROFILE_PIC_UPLOAD_FAIL:
            return { loading: false, error: action.payload };
          default:
            return state;
        }
};




export const createPostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { loading: true };
    case CREATE_POST_SUCCESS:
      console.log('CREATE_POST_SUCCESS');
      return { loading: false, success : action.payload };
    case CREATE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};