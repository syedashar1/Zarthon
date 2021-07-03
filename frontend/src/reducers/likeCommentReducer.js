import { GET_LIKES_FAIL, GET_LIKES_REQUEST, GET_LIKES_SUCCESS, LIKE_FAIL, LIKE_REQUEST, LIKE_SUCCESS , COMMENT_REQUEST , COMMENT_SUCCESS , COMMENT_FAIL, NOTIFICATION_REQUEST, NOTIFICATION_SUCCESS, NOTIFICATION_FAIL, NOTIFICATION_RESET } from '../types/likeCommentTypes';



export const likeReducer = ( state = { loading : true } , action) =>{

        switch (action.type){
                case LIKE_REQUEST :
                        return {loading : true}
                
                case LIKE_SUCCESS :
                        return { loading : false , user : action.payload }
                case LIKE_FAIL :
                        return { loading : false , error : action.payload }
                default:
                        return state;
        }


}



export const commentReducer = ( state = { loading : true } , action) =>{

        switch (action.type){
                case COMMENT_REQUEST :
                        return {loading : true}
                
                case COMMENT_SUCCESS :
                        return { loading : false , user : action.payload }
                case COMMENT_FAIL :
                        return { loading : false , error : action.payload }
                default:
                        return state;
        }


}



export const getLikesReducer = ( state = { loading : true } , action) =>{

        switch (action.type){
                case GET_LIKES_REQUEST :
                        return {loading : true}
                case GET_LIKES_SUCCESS :
                        return { loading : false , users : action.payload }
                case GET_LIKES_FAIL :
                        return { loading : false , error : action.payload }
                default:
                        return state;
        }


}


export const newNotificationReducer = ( state = { notification : 0 } , action) =>{

        switch (action.type){
                case NOTIFICATION_REQUEST :
                        return {loading : true}
                case NOTIFICATION_SUCCESS :
                        return { loading : false , notification : action.payload }
                case NOTIFICATION_FAIL :
                        return { loading : false , error : action.payload }
                case NOTIFICATION_RESET :
                        return { loading : false , notification : 0 }
                default:
                        return state;
        }


}


