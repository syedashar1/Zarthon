import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { Col, Container, Image, Row ,ProgressBar} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../chat/contexts/SocketProvider';
import { motion } from 'framer-motion';
import LinesEllipsis from 'react-lines-ellipsis'


export default function SingleJob({job}) {


        const [User, setUser] = useState(null)
        const history = useHistory()
        const dispatch = useDispatch()
        
    
        useEffect(() => {
            console.log(job);
            axios.get(`/api/users/single/${job.by}`).then(res=>setUser(res.data))
    
        }, [])


        return (
                <div>
    
        {job && job._id &&
        <div className= {job._id=='proworker' ? 'pro-card' : 'teach pro-card '} onClick={()=>history.push(`/job/${job._id}`)}>
        <Container>
        
        <h1 className='fl' style={{fontSize:'35px'}} > {job.title} </h1>
        
        <LinesEllipsis text={job.description} maxLine='10' ellipsis='...' trimRight basedOn='letters' />
        <br/><br/>
        <h3>
        <p style={{overflow:'hidden' , textOverflow:'ellipsis',height:'120px',marginTop:'-30px',marginBottom:'-5px'}}>
        {job.tags.map(x=><span style={{display:'inline-block' ,background:'#a1c5ff',color:'white', borderRadius:'20px' ,padding:'5px',margin:'10px' }}>
        {x}</span>)}
        </p>
        </h3> 
        </Container>
        </div>
        }
        
            
        </div>
        )
}
