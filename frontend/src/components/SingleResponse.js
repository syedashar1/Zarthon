import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { Col, Container, Image, Row ,ProgressBar} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../chat/contexts/SocketProvider';
import { motion } from 'framer-motion';
import LinesEllipsis from 'react-lines-ellipsis'
import Modal from "react-modal"
import Zoom from "react-reveal/Zoom"

export default function SingleResponse({ teachJob , jobId , by , response}) {



        const [User, setUser] = useState(null)
        const [pro, setPro] = useState(null)
        const history = useHistory()
        const dispatch = useDispatch()
        const [Message, setMessage] = useState('')
        const [openModal, setopenModal] = useState(false)

        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const socket = useSocket()
    
        useEffect(() => {
            axios.get(`/api/users/single/${by}`).then(res=>setUser(res.data))

            if(teachJob) { axios.get(`/api/teachers/user/${by}`).then(res => setPro(res.data) ) }
            else {axios.get(`/api/professionals/user/${by}`).then(res => setPro(res.data) )  }
            

        }, [])


        const submitHandler = (e) => {
            e.preventDefault()
            axios.put(`/api/chat/singletext/${userInfo._id}`, {text : Message , recipients: [by] }  );
            setopenModal(false)
        }


        const hireHandle = () => {

            const notificationObject = {
                type : 'Hired' ,
                byName : userInfo.userName ,
                text : 'You got hired for a new Job',
                link : `/job/${jobId}` ,
            }

            if(teachJob){

                axios.put(`/api/jobsteacher/hire/${jobId}/${by}` , { }, { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                .then(res => { if(res.data){ 
                    alert(`${User.name} hired !`) ;
                    
                    axios.put(`/api/users/notification/${by}`, notificationObject , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                            
                    socket.emit('send-notification', notificationObject )
    
                } } )

                return ;

            }


            
            axios.put(`/api/jobs/hire/${jobId}/${by}` , { }, { headers: { Authorization: `Bearer ${userInfo.token}`} } )
            .then(res => { if(res.data){ 
                alert(`${User.name} hired !`) ;
                
                axios.put(`/api/users/notification/${by}`, notificationObject , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                        
                socket.emit('send-notification', notificationObject )

            } } )

        }


        return (
        <div  >
        {User && pro && pro._id &&
        <div className= 'pro-card'>
        <Container style={{margin:'-15px 0px'}} >
        <br/>
        <Row  onClick={()=>history.push(`/proworker/${pro._id}`)} >
        <Col lg={1} md={2} ><Image src={User.profilePic} style={{width:'75px' , height:'75px' , borderRadius:'50%', cursor :'pointer',margin : '0px' }} alt='a pic' /></Col>
        <Col lg={2} md={2}>
        <p style={{marginBottom:'-5px',color:'green',fontSize:'20px'}} >{User.name}</p>
        <p style={{marginBottom:'0px',fontWeight:'bold'}}>{pro.title}</p>
        <p style={{marginBottom:'-5px',fontSize:'12px'}}><i>{'Pakistan'}</i></p>
        </Col>
        <Col lg={9} md={8} ></Col>

        </Row>

        <br/>
        <Row style={{textAlign:'center',margin:'-25px 0px'}}>
        <Col sm={3}><b>${pro.budget}</b>/hr {pro.negotiate ? 'negotiable' : 'fixed'} </Col>
        <Col sm={3}><b>${pro.earned || 0}</b>{' earned'}</Col>
        <Col sm={3}>
        
        <p>{'Job Success '+ pro.appliedSuccess}%</p>
        <div className='progress-barsub'>
        <motion.div className="progress-bar" initial={{ width: 0 }} animate={{ width: 66 + '%' }}/>
        </div>
        
        </Col>
        <Col sm={3}>
        <button className='fl' style={{fontSize:'20px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
            border: '1px solid transparent' }}  
            onClick={()=>setopenModal(true)} type="submit">Contact</button>{' '}
        <button className='fl' style={{fontSize:'20px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
            border: '1px solid transparent' }} type="submit"
            onClick={() => { if (window.confirm(`Hire ${User.name} for this job ? `)) hireHandle()  } }>Hire</button>
        </Col>
        </Row><br/>
        
        <LinesEllipsis text={response} maxLine='7' ellipsis='...' trimRight basedOn='letters' />
        <br/>
        
        </Container>
        </div>
        }


{openModal && User && (
                <Modal isOpen ={true} onRequestClose = { ()=>setopenModal(false) }
                style={{content: { margin: 'auto',  border: '1px solid #ccc', borderRadius: '0px', padding: '10px',maxWidth:'860px',maxHeight:'530px',}}}>
                        
                        <Zoom>
                        <h1><b>Response  : </b> {response} </h1>
                        <hr/>
                        <form className="form upgap text-center" onSubmit={submitHandler} >
                        <textarea id="description" rows="5" cols="50" type="text" required="true"
                        placeholder={`Send a message to ${User.name}`} onChange={(e) => setMessage(e.target.value) }
                        ></textarea>
                        <button>send</button>
                        </form>


                        </Zoom>

                </Modal>
                )}
                        
        </div>
        )
}
