import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { ListForChatReducer, NotificationReducer } from './reducers/chatReducers';
import { createPostReducer, profilePicReducer } from './reducers/imagesReducers';
import { getLikesReducer, likeReducer , commentReducer, newNotificationReducer} from './reducers/likeCommentReducer';
import {  userRegisterReducer, userSigninReducer , getDetailsReducer, userListReducer, searchedUsersReducer, userUpdateStatusReducer, userSuggestionReducer } from './reducers/userReducers';



const initialState = {};


const reducer = combineReducers({

  userSignin : userSigninReducer ,
  userRegister : userRegisterReducer ,
  getDetails : getDetailsReducer ,
  userList : userListReducer ,
  searchedUsers : searchedUsersReducer ,
  userUpdateStatus : userUpdateStatusReducer ,
  userSuggestion : userSuggestionReducer ,
  
  
  profilePic : profilePicReducer ,
  createPost : createPostReducer ,


  ListForChat : ListForChatReducer ,
  Notification : NotificationReducer ,



  like : likeReducer ,
  getLikes : getLikesReducer ,
  comment : commentReducer ,
  newNotification : newNotificationReducer ,


  
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;