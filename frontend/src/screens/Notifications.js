import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { resetNewNotification } from '../actions/likeCommenentActions'
import { useSocket } from '../chat/contexts/SocketProvider'
import NamePicNotification from '../components/NamePicNotification'
import { useHistory } from "react-router-dom";

export default function Notifications({SocketNotifications , setSocketNotifications}) {


        const dispatch = useDispatch()
        const socket = useSocket()
        const history = useHistory()

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
                <Container style={{marginTop:'30px' , border:' 1px solid rgba(0,0,0,.125)' , padding:'30px 10px' }}>
                <h1 className='fl'style={{fontSize:'40px'}} > Notifications </h1>
                {user && SocketNotifications && SocketNotifications.length !== 0 && SocketNotifications.map(x => 
                <div className='pro-card px-5' onClick={()=>history.push(`${x.link}`)} >
                <h1><b>{x.type}{' by '}{x.byName}</b> </h1>
                <p>{x.text}</p> 
                </div>
                )}


                {/* {user.notification.map(x => <div>
                 <h1><br>{x.type}</br> {' by '} <b>{x.byName}</b></h1>
                <p>{x.text}</p> 
                </div> )}         */}
                {user && user.notification.map(x => 
                <div className='pro-card px-5' onClick={()=>history.push(`${x.link}`)} >
                <h2><b>{x.type}{' by '}{x.byName}</b> </h2>
                <p>{x.text}</p> 
                </div>)}


                </Container>
        )
}
