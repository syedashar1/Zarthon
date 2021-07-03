import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { resetNewNotification } from '../actions/likeCommenentActions'
import { useSocket } from '../chat/contexts/SocketProvider'
import NamePicNotification from '../components/NamePicNotification'

export default function Notifications({SocketNotifications , setSocketNotifications}) {


        const dispatch = useDispatch()
        const socket = useSocket()

        const user = useSelector(state => state.getDetails.user)

        const [Page, setPage] = useState(6)

        // useEffect(() => {
                
        //         dispatch( userDetails() )
                
        // }, [])

        
        useEffect(() => {

                dispatch( resetNewNotification() )

                if (socket == null) return
                const Append = (x) => setSocketNotifications( a => [...a, x] );
                socket.on('receive-notification', Append )
                return () => socket.off('receive-notification')
        }, [socket])



        const scrollToEnd = () => {
                setPage(Page + 0.5)
                console.log(Page);

        }



        return (
                <div>

                {user && SocketNotifications && SocketNotifications.length !== 0 && SocketNotifications.map(y => <div>
                <NamePicNotification type={y.type} by={y.by} id={user._id} post={y.post} comment={y.comment} />
                </div>
                )}


                <InfiniteScroll
                        dataLength={Page}
                        next={scrollToEnd}
                        hasMore={true}
                        style={{overflow:'visible'}}
                        >
                {user && user.notification && user.notification.slice(0, Page).map(x => <div>
                <NamePicNotification type={x.type} by={x.by} id={user._id} post={x.post} comment={x.comment} />
                
                </div>)}

                </InfiniteScroll>

                </div>
        )
}
