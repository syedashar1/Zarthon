import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Col, Container, Image, Row , Tabs , Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SingleResponse from '../components/SingleResponse'
import NamePic from '../components/NamePic';
import SinglePaymentCard from '../components/SinglePaymentCard';
import { SocketProvider, useSocket } from '../chat/contexts/SocketProvider';
import ChatApp from '../chat/components/ChatApp';
import MyJobCard from '../components/MyJobCard';

export default function MyJobsScreen() {


        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const user = useSelector((state) => state.getDetails.user);
        const [Pro, setPro] = useState(null)

        useEffect(() => {
                axios.get(`/api/professionals/user/${userInfo._id}`).then(res=>setPro(res.data) )
            }, [])

        return (
                <div>
                <Container style={{marginTop:'30px' , border:' 1px solid rgba(0,0,0,.125)'}}>
                
                {Pro && Pro.jobsAt.map(x => <MyJobCard jobid={x}/>  )}

                </Container>        
                </div>
        )
}
