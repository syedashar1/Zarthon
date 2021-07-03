import React, { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import SinglePost from '../components/SinglePost';
import { SocketProvider } from '../chat/contexts/SocketProvider';
import ChatApp from '../chat/components/ChatApp';
import Fade from 'react-reveal/Fade';

export default function NewsFeedScreen() {

        const userList = useSelector((state) => state.userList);
        // const { loading, error, users } = userList;

 
        const userSignin = useSelector((state) => state.userSignin);
        const { userInfo } = userSignin;

        const dispatch = useDispatch();
        const history = useHistory()

        const [state ,setState ] = useState([])
        const [page ,setPage ] = useState(1) 
        const [loading, setloading] = useState(false)


        useEffect(() => {
                
                setloading(true)
                axios.get(`/api/newsfeed?pageNumber=${page}`)
                .then(res => {
                        console.log(res);
                        setState([...state , ...res.data]);
                        setloading(false)
                } )

                if(!userInfo || !userInfo._id ){ history.push('/signin') }

                

        }, [ page , userInfo ]);




        const scrollToEnd = () => {
                setPage(page + 1)

        }


        
        


        return (
                <div> 
                        
                        <div>
                        <InfiniteScroll
                        dataLength={state.length}
                        next={scrollToEnd}
                        hasMore={true}
                        style={{overflow:'visible'}}
                        >
                
                        { userInfo && userInfo._id && state.length > 0 && <div>

                                <ChatApp show={true} /> 

                                <SocketProvider id={userInfo._id }>
                                        {state.reverse().map( x => <div style={{marginBottom:'50px'}} >
                                        <SinglePost id={x.postedBy} postid={x.postId} />
                                        </div>

                                        )}
                                </SocketProvider>   

                        </div>
                        
                        
                        }
                        </InfiniteScroll>

</div>
                        <h1>{loading ? 
                        <div className='row center upgap' > <div className='cm-spinner' ></div> </div>
                        : 
                        
                        <Fade>
                        <h1 style={{fontSize:100,textAlign:'center',overflow:'hidden'}} className='logo'> Fin. </h1>
                        </Fade>

                        }</h1>

                </div>
        )
}
