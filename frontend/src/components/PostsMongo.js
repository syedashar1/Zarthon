import React, { Component } from 'react'
import { connect } from 'react-redux';
import { like , getLikes , comment } from '../actions/likeCommenentActions';
import { SocketProvider } from '../chat/contexts/SocketProvider';
import SinglePost from './SinglePost';

class PostsMongo extends Component {




        render() {
        
        const {user , userInfo } = this.props


        return (
                <div>

                 { userInfo && userInfo._id && user.posts.length > 0 && <div>

                                <SocketProvider id={userInfo._id }>
                                        {user.posts.reverse().map( x => 
                                        <SinglePost id={userInfo._id} postid={x._id} />)
                                        }
                                </SocketProvider>   

                        </div>
                        
                }                       

                                
                </div>
        )
        }
}



export default connect(
        
        (state) => ({ 
                userInfo : state.userSignin.userInfo ,
                user : state.getDetails.user , 
        }),
        {
                
        } 
      
)(PostsMongo);
