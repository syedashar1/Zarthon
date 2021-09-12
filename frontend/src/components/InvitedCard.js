import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { Col, Container, Image, Row ,ProgressBar} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../chat/contexts/SocketProvider';
import { motion } from 'framer-motion';
import LinesEllipsis from 'react-lines-ellipsis'

export default function InvitedCard({pro , type , jobid }) {

        const [User, setUser] = useState(null)
        const history = useHistory()
        const dispatch = useDispatch()
        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const [Bbtn, setBbtn] = useState('Invite')
        
    
        useEffect(() => {
                console.log(pro);
                axios.get(`/api/users/single/${pro.by}`).then(res=>setUser(res.data))
            }, [])

        const inviteHandle = () => {
                axios.put(`/api/jobs/invite/${jobid}/${pro._id}` , { }, 
                { headers: { Authorization: `Bearer ${userInfo.token}`} } ).then(res=> {if(res.data) {
                        setBbtn('Invited !')
                        const notificationObject = {
                                type : 'New Job Invitation' ,
                                byName : userInfo.userName ,
                                text : 'You got a new job Invitation',
                                link : `/job/${jobid}` ,
                            }
        
                        axios.put(`/api/users/notification/${pro.by}`, notificationObject , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
            
                
                }} )
        }

        return (
        <div>
        {User && pro &&
        <div className= { 'teach pro-card '} >
        <Container>
        <br/>
        <Row>
        <Col lg={1} md={2} ><Image src={User.profilePic} style={{width:'75px' , height:'75px' , borderRadius:'50%', cursor :'pointer',margin : '0px' }} alt='a pic' 
        onClick={()=>history.push(`/proworker/${pro._id}`)}/></Col>
        <Col lg={3} md={2}>
        <p style={{marginBottom:'-5px',color:'green',fontSize:'20px'}} >{User.name}</p>
        <p style={{marginBottom:'0px',fontWeight:'bold'}}>{pro.title}</p>
        <p style={{marginBottom:'-5px',fontSize:'12px'}}><i>{'Pakistan'}</i></p>
        </Col>
        <Col lg={5} md={3} >
                <h2>Total Earned : <b>${pro.earned}</b> </h2>
        </Col>
        <Col lg={3} md={3} >
        <button className='fl' style={{ borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
            border: '1px solid transparent'  , fontSize:'20px' }} type="submit" onClick={inviteHandle} > {Bbtn} </button>
      </Col>

        </Row>

        <LinesEllipsis text={pro.description} maxLine='3' ellipsis='...' trimRight basedOn='letters' />

        <br/>
        
        <br/><br/>
        
        </Container>
        </div>
        }
                        
        </div>
        )
}
