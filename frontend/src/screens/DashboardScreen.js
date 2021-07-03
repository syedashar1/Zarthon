import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row , Image } from 'react-bootstrap';
import ProfilePic from "../components/ProfilePic"
import { update, userDetails, userSuggest } from '../actions/userActions';
import Modal from "react-modal"
import Zoom from "react-reveal/Zoom"
import axios from 'axios';
import ChatApp from '../chat/components/ChatApp';
import TabPanel from "../components/UserProfileTabs"
import UploadForm from "../components/UploadForm"
import HeadShake from 'react-reveal/HeadShake';
import Suggestions from '../components/Suggestions';
import { SocketProvider } from '../chat/contexts/SocketProvider';
import { useHistory } from "react-router-dom";
import SinglePro from '../components/SinglePro';
import SingleGig from '../components/SingleGig';



export default function DashboardScreen(props) {

        const dispatch = useDispatch()
        const history = useHistory()

        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const user = useSelector((state) => state.getDetails.user);

        const [Gigs, setGigs] = useState(null)
        const [Pro, setPro] = useState(null)
        const [Teach, setTeach] = useState(null)

        useEffect(() => {

            if (!userInfo) {
                    history.push('/signin')
            }
            
            dispatch( userDetails() ) 

            axios.get(`/api/professionals/user` ,  { headers: { Authorization: `Bearer ${userInfo.token}`} }  )
            .then(res => { if(res.data){ setPro(res.data) }})

            axios.get(`/api/teachers/user` ,  { headers: { Authorization: `Bearer ${userInfo.token}`} }  )
            .then(res => { if(res.data){ setTeach(res.data) }})


            axios.get(`/api/gigs/user/${props.match.params.id ? props.match.params.id : userInfo._id}`)
            .then(res => { setGigs(res.data)})

    }, [userInfo])

    //number of gigs
    //total earned through gigs
    //total applied number pro
    //success number pro
    //applied teach 
    //success number teach

    //total rating of  gig
    //total rating of pro
    // total rating of teach

    //total earned pro / teach / gig
    //total earned


    return (
        <div>
        <h1>Dashboard</h1>
        {user && Gigs && <div>
            
        <h1 id='seller' ><Image src={user.profilePic} style={{width:'85px' , height:'85px' , borderRadius:'50%', cursor :'pointer',margin : '0px 25px ' }} alt='a pic' 
        onClick={ () => {history.push(`/user/${user._id}`)} }/><b>{user.name}</b></h1>

        <h1>Total number of Gigs {' : '}{Gigs.length}</h1>
        {Gigs.length > 0 && <h1>Total earned through Gigs {' : '}{0}</h1>}

        {user.proAccount && <div>
        
        <h1>Total Applied Jobs as Pro {" : "}{0} </h1>
        <h1>Total Successful Jobs {" : "}{0} </h1>
        <h1>Total Jobs Done {" : "}{0} </h1>
        <h1>Success Ratio {" : "}{0} </h1>
        <h1>Total Earned As Pro {" : "}{0} </h1>

            
        </div>}

        {user.teachAccount && <div>
        
            <h1>Total Applied Jobs as Teacher {" : "}{0} </h1>
            <h1>Total Successful Jobs {" : "}{0} </h1>
            <h1>Total Jobs Done {" : "}{0} </h1>
            <h1>Success Ratio {" : "}{0} </h1>
            <h1>Total Earned As Teacher {" : "}{0} </h1>
    
                
        </div>}
            
            
            
            </div>}
            
        </div>
    )
}
