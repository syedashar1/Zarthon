import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from '../actions/userActions';
import ChatApp from '../chat/components/ChatApp';
import { SocketProvider, useSocket } from '../chat/contexts/SocketProvider'
import Notifications from './Notifications';

export default function NotitificationScreen() {
        


        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const dispatch = useDispatch()    
        const user = useSelector(state => state.getDetails.user)
        
        const [SocketNotifications, setSocketNotifications] = useState([])

        useEffect(() => {
                dispatch( userDetails() )
        }, [])
        

        
        return (
                <div>{userInfo && userInfo._id && user &&
                <div>
                <SocketProvider id={userInfo._id }>
                        <Notifications SocketNotifications={SocketNotifications} setSocketNotifications={setSocketNotifications}  />
                </SocketProvider>
                <ChatApp show={true} />
                </div>
                }
                
                        
                </div>
        )
}
