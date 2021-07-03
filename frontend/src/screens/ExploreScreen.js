import React, { useEffect , useState } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import ChatApp from '../chat/components/ChatApp';
import Modal from '../components/Modal';
import { SocketProvider } from '../chat/contexts/SocketProvider';
import { motion } from 'framer-motion';
import SearchComponent from '../components/SearchComponent';
import FavoriteIcon from '@material-ui/icons/Favorite';


export default function ExploreScreen() {


        const userSignin = useSelector((state) => state.userSignin);
        const { userInfo } = userSignin;
        const [selectedImg, setSelectedImg] = useState(null);
        const [postBy, setpostBy] = useState(null)
        const history = useHistory()
        const [state ,setState ] = useState([])
        const [page ,setPage ] = useState(1) 
        const [loading, setloading] = useState(false)
        const [Search, setSearch] = useState('')


        useEffect(() => {
                
                setloading(true)
                axios.get(`/api/newsfeed/explore?pageNumber=${page}`)
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

                        <SearchComponent Search={Search} setSearch={setSearch} />

                        <InfiniteScroll
                        dataLength={state.length}
                        next={scrollToEnd}
                        hasMore={true}
                        style={{overflow:'visible'}}
                        >


                        {userInfo && userInfo._id && state.length > 0 && Search=='' && <div>

                                <ChatApp show={true} /> 
                                <SocketProvider id={userInfo._id }>
                                


                                <div className="img-grid">
                                {state.map(x => (
                                <motion.div className="img-wrap container-ofouter-image" key={x.postID}  layout
                                whileHover={{ opacity: 1 }}s
                                onClick={() => {setSelectedImg(x.postID) ; setpostBy(x.postedBy) }}
                                >
                                <img src={x.pic} alt="uploaded pic" className='image-to-hover'/>
                                <div className="middle-text">
                                <h1> {x.totalLikes} <FavoriteIcon/></h1>
                                </div>  
                                </motion.div>
                                ))}
                                </div>
                                { selectedImg && (
                                <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} postBy={postBy} />
                                )}


                                </SocketProvider>   

                        </div>
                        
                        
                        }



                        </InfiniteScroll>
                
                        
                </div>
        )
}
