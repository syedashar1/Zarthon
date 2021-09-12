import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { Col, Container, Image, Row ,ProgressBar} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../chat/contexts/SocketProvider';
import { motion } from 'framer-motion';
import LinesEllipsis from 'react-lines-ellipsis'

export default function SinglePaymentCard({by , type , totalPayed , paymentHistory , jobid }) {

        const [User, setUser] = useState(null)
        const history = useHistory()
        const dispatch = useDispatch()
        const [Pro, setPro] = useState(null)
        const userInfo = useSelector((state) => state.userSignin.userInfo);
        
    
        useEffect(() => {

                if(type) { axios.get(`/api/teachers/user/${by}`).then(res => setPro(res.data) ) }
                else {axios.get(`/api/professionals/user/${by}`).then(res => setPro(res.data) )  }
                axios.get(`/api/users/single/${by}`).then(res=>setUser(res.data))
                paymentHistory = paymentHistory.reverse()
            }, [])

        const endHandler = () => {
                if( window.confirm(`Are you sure you want to end contract with ${User.name} ?`) ){


                        if(by){
                        axios.put(`/api/jobsteacher/end-payroll/${jobid}/${by}` , { }, { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                        .then(res=> {if(res.data) history.push(`/job-review/${jobid}/${by}/teacher`) } )

                        return;
                        }
                
                        axios.put(`/api/jobs/end-payroll/${jobid}/${by}` , { }, { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                        .then(res=> {if(res.data) history.push(`/job-review/${jobid}/${by}/pro`) } )


                }
        }

        return (
        <div>
        {User && Pro &&
        <div className= { 'teach pro-card '} >
        <Container>
        <br/>
        <Row>
        <Col lg={1} md={2} ><Image src={User.profilePic} style={{width:'75px' , height:'75px' , borderRadius:'50%', cursor :'pointer',margin : '0px' }} alt='a pic' 
        onClick={()=>history.push(`/proworker/${Pro._id}`)}/></Col>
        <Col lg={3} md={2}>
        <p style={{marginBottom:'-5px',color:'green',fontSize:'20px'}} >{User.name}</p>
        <p style={{marginBottom:'0px',fontWeight:'bold'}}>{Pro.title}</p>
        <p style={{marginBottom:'-5px',fontSize:'12px'}}><i>{'Pakistan'}</i></p>
        </Col>
        <Col lg={5} md={3} >
                <h2>Total Payed : <b>${totalPayed}</b> </h2>
        </Col>
        <Col lg={3} md={3} >
        <button className='fl' style={{ borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
            border: '1px solid transparent'  , fontSize:'20px' }} type="submit" onClick={endHandler} > End </button>{' '}
        <button className='fl' style={{ borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
            border: '1px solid transparent' , fontSize:'20px' }}  type="submit" onClick={()=>history.push(`/payment/${jobid}/${by}/${type ? 'teacher' : 'proworker'}`)} > Pay </button>       
        </Col>

        </Row>

        <br/>
        {paymentHistory.length === 0 && 'havnt payed this person.'}
        {paymentHistory.map(x=><div>
                <span style={{fontSize:'17px',color:'grey'}} >On {x.paidOn.split('T')[0]} {' amount '}</span> ${x.amount} 
        </div>)}
        <br/><br/>
        
        </Container>
        </div>
        }
                        
        </div>
        )
}
