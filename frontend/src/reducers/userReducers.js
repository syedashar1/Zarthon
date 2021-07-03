import { USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAIL , USER_SIGNIN_SUCCESS , USER_SIGNIN_FAIL , USER_LIST_REQUEST
        , USER_DETAILS_REQUEST , USER_DETAILS_SUCCESS , USER_DETAILS_FAIL , USER_SIGNOUT , USER_SIGNIN_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, SEARCH_USERS_REQUEST, SEARCH_USERS_SUCCESS, SEARCH_USERS_FAIL, SEARCH_USERS_RESET, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS, USERS_SUGGESTIONS_REQUEST, USERS_SUGGESTIONS_FAIL, USERS_SUGGESTIONS_SUCCESS
 } from "../types/userTypes";


export const userSigninReducer = (
        
        state = { userInfo : localStorage.getItem('userInfo') ? 
                JSON.parse(localStorage.getItem('userInfo'))
                : null }

                , action ) => 
        
        {switch (action.type) {

                case USER_SIGNIN_REQUEST:
                        return { loading: true };

                case USER_SIGNIN_SUCCESS:
                        console.log('signing');
                        return { loading: false, userInfo: action.payload };

                case USER_SIGNIN_FAIL:
                        return { loading: false, error: action.payload };

                case USER_SIGNOUT:
                        return {};

                default:
                return state;
        }
};



export const userRegisterReducer = (state = {}, action) => {
        switch (action.type) {
          case USER_REGISTER_REQUEST:
            return { loading: true };
          case USER_REGISTER_SUCCESS:
            console.log('USER_REGISTER_SUCCESS');
            return { loading: false, userInfo: action.payload };
          case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
          default:
            return state;
        }
};



export const getDetailsReducer = ( state = { loading : true } , action) =>{

        switch (action.type){
                case USER_DETAILS_REQUEST :
                        return {loading : true}
                
                case USER_DETAILS_SUCCESS :
                        return { loading : false , user : action.payload }
                case USER_DETAILS_FAIL :
                        return { loading : false , error : action.payload }
                default:
                        return state;
        }


}



export const userListReducer = (state = { loading: true }, action) => {
        switch (action.type) {
          case USER_LIST_REQUEST:
            return { loading: true };
          case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload };
          case USER_LIST_FAIL:
            return { loading: false, error: action.payload };
          default:
            return state;
        }
};



export const searchedUsersReducer = (state = { }, action) => {
        switch (action.type) {
          case SEARCH_USERS_REQUEST:
            return { loading: true };
          case SEARCH_USERS_SUCCESS:
            return { loading: false, users: action.payload };
          case SEARCH_USERS_FAIL:
            return { loading: false, error: action.payload };
          case SEARCH_USERS_RESET :
             return { } ;
          default:
            return state;
        }
};


export const userUpdateStatusReducer = (state = { }, action) => {
        switch (action.type) {
 
          case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success : true };
          case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload };
          case USER_UPDATE_PROFILE_RESET :
             return { } ;
          default:
            return state;
        }
};


export const userSuggestionReducer = (state = { }, action) => {
        switch (action.type) {
 
          case USERS_SUGGESTIONS_REQUEST:
            return { loading: true };
          case USERS_SUGGESTIONS_SUCCESS:
            return { loading : false , Suggestedusers : action.payload };
          case USERS_SUGGESTIONS_FAIL :
             return { loading: false, error: action.payload } ;
          default:
            return state;
        }
};

