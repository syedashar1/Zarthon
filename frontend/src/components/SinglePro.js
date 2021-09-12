import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { Col, Container, Image, Row ,ProgressBar} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../chat/contexts/SocketProvider';
import { motion } from 'framer-motion';
import LinesEllipsis from 'react-lines-ellipsis'

export default function SinglePro({pro , type}) {


    const [User, setUser] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()
    

    useEffect(() => {
        console.log(pro);
        axios.get(`/api/users/single/${pro.by}`).then(res=>setUser(res.data))

    }, [])


    return (
        <div>
    
        {User && pro && pro._id &&
        <div className= {type=='proworker' ? 'pro-card' : 'teach pro-card '} onClick={()=>history.push(`/${type}/${pro._id}`)}>
        <Container>
        <br/>
        <Row>
        <Col lg={1} md={2} ><Image src={User.profilePic} style={{width:'75px' , height:'75px' , borderRadius:'50%', cursor :'pointer',margin : '0px' }} alt='a pic' 
        onClick={ () => {history.push(`/user/${User._id}`)} }/></Col>
        <Col lg={2} md={2}>
        <p style={{marginBottom:'-5px',color:'green',fontSize:'20px'}} >{User.name}</p>
        <p style={{marginBottom:'0px',fontWeight:'bold'}}>{pro.title}</p>
        <p style={{marginBottom:'-5px',fontSize:'12px'}}><i>{'Pakistan'}</i></p>
        </Col>
        <Col lg={9} md={8} ></Col>

        </Row>

        <br/>
        <Row style={{textAlign:'center',margin:'-10px 0px'}}>
        <Col sm={3}><b>${pro.budget}</b>/hr {pro.negotiate ? 'negotiable' : 'fixed'} </Col>
        <Col sm={3}><b>${pro.earned || 0}</b>{' earned'}</Col>
        <Col sm={3}>
        
        <p>{'Job Success '+ Number( (pro.appliedSuccess/pro.totalApplied).toFixed(2) * 100 ) }%</p>
        <div className='progress-barsub'>
        <motion.div className="progress-bar" initial={{ width: 0 }} 
        animate={{ width: (pro.appliedSuccess/pro.totalApplied)*100 + '%' }}/>
        </div>
        
        </Col>
        <Col sm={3}>{''}</Col>
        </Row><br/>
        
        <LinesEllipsis text={pro.description} maxLine='3' ellipsis='...' trimRight basedOn='letters' />
        <br/>
        <h1>
        <p style={{overflow:'hidden' , textOverflow:'ellipsis',height:'50px',marginTop:'-30px',marginBottom:'-5px'}}>
        {pro.tags.map(x=><span style={{display:'inline-block', fontSize:'20px' ,background:'#a1c5ff',color:'white', borderRadius:'20px' ,padding:'5px',margin:'10px' }}>
        {x}</span>)}
        </p>
        </h1> 
        </Container>
        </div>
        }
        
            
        </div>
    )
}
