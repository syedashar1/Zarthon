import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SinglePostJustPic from './SinglePostJustPic'
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion';
import Modal from './Modal'
import { useHistory } from 'react-router';

export default function SavedPosts() {


        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const user = useSelector((state) => state.getDetails.user);
        const [selectedImg, setSelectedImg] = useState(null);
        const [postBy, setpostBy] = useState(null)




        return (
                <div> <h1>Saved Posts</h1>
                        {user._id === userInfo._id &&
                                
                        <InfiniteScroll
                        dataLength={user.savedPosts.length}
                        hasMore={false}
                        style={{overflow:'visible'}}
                        >



                                <div className="img-grid">
                                {user.savedPosts.map(x => (
                                <motion.div className="img-wrap container-ofouter-image" key={x.postId}  layout
                                whileHover={{ opacity: 1 }}s
                                onClick={() => {setSelectedImg(x.postId) ; setpostBy(x.postedBy) }}
                                >
                                {
                                        
                                <SinglePostJustPic id={x.postedBy} postid={x.postId} />
                                        
                                }
                                </motion.div>
                                ))}
                                </div>
                                { selectedImg && (
                                <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} postBy={postBy} />
                                )}






                        </InfiniteScroll>
                                
                        }
                        {user && user._id === userInfo._id &&  user.savedPosts.length === 0 && <p>u have no saved posts</p> }  
                </div>
        )
}
