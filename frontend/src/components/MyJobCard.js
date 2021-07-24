import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { Col, Container, Image, Row ,ProgressBar} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../chat/contexts/SocketProvider';
import { motion } from 'framer-motion';
import LinesEllipsis from 'react-lines-ellipsis'

export default function MyJobCard({ jobid }) {

        const [Job, setJob] = useState(null)
        const [JobPayRoll, setJobPayRoll] = useState(null)
        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const history = useHistory()
        
    
        useEffect(() => {
                axios.get(`/api/jobs/singlejobinfo/${jobid}`, { headers: { Authorization: `Bearer ${userInfo.token}`} } ).then(res=>{if(res.data){

                        setJob(res.data.job)
                        setJobPayRoll(res.data.myPayRoll)

                }})
            }, [])


        return (
        <div>
        {Job && JobPayRoll &&
        <div className= { 'teach pro-card '} onClick={()=>history.push(`/job/${jobid}`)} >
        <Container>
        
        <Row>
        <Col lg={6} md={2} >
        <h1>{Job.title}</h1>
        </Col>
        <Col lg={5} md={3} >
                <h2>Total Payed : <b>${JobPayRoll.totalPayed}</b> </h2>
        </Col>
        

        </Row>

        <br/>
        {JobPayRoll.paymentHistory.length === 0 && 'You havnt got paid yet.'}
        {JobPayRoll.paymentHistory.map(x=><div>
                <span style={{fontSize:'17px',color:'grey'}} >On {x.paidOn.split('T')[0]} {' amount '}</span> ${x.amount} 
        </div>)}
        
        </Container>
        </div>
        }
                        
        </div>
        )
}

