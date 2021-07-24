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


export default function JobScreen(props) {

        const [User, setUser] = useState(null)
        const [pro, setPro] = useState(null)
        const history = useHistory()
        const dispatch = useDispatch()
        const [Apply, setApply] = useState(false)
        const [Proposal, setProposal] = useState('')

        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const user = useSelector((state) => state.getDetails.user);

        const [TAB, setTAB] = useState('Job')
        const socket = useSocket()


        useEffect(() => {
            axios.get(`/api/jobs/${props.match.params.id}`).then(res=>{
                setPro(res.data)
                console.log(res.data.responses);
                axios.get(`/api/users/single/${res.data.by}`).then(res2=>setUser(res2.data))
            })
    
        }, [])


        const proposalSubmit = (e)=>{
            e.preventDefault()

            axios.put(`/api/jobs/submitproposal/${props.match.params.id}` , {
                response : Proposal
            }, { headers: { Authorization: `Bearer ${userInfo.token}`} } )
            .then(res => {
                if(res.data){
                        alert('job posted')
                        axios.get(`/api/jobs/${props.match.params.id}`).then(res=>setPro(res.data))
                        setApply(false)
                        setProposal(false)
                        
                        

                        //now we send notification
                        const notificationObject = {
                            type : 'New Proposal' ,
                            byName : userInfo.userName ,
                            text : 'You got a new job proposal',
                            link : `/job/${props.match.params.id}` ,
                        }

                        axios.put(`/api/users/notification/${pro.by}`, notificationObject , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                        
                        // socket.emit('send-notification', notificationObject )
                        // u need to wrap a component inside socketprovider




                }

        } )

        }


        return (
        <div> {userInfo && <ChatApp show={true} /> }
        {User && pro && pro._id && <Container style={{marginTop:'30px' , border:' 1px solid rgba(0,0,0,.125)'}}>
        
        {userInfo && userInfo._id === pro.by &&  
        <Tabs defaultActiveKey="Job" id="uncontrolled-tab-example" className="mb-3" onSelect={(k)=>setTAB(k)} >
        <Tab eventKey="Job" title="Job" />
        <Tab eventKey="Proposals" title="Proposals" />
        <Tab eventKey="Hired" title="Hired" />
        <Tab eventKey="Pay Roll" title="Pay Roll" />
        <Tab eventKey="Edit" title="Edit" />
        </Tabs>}


        <hr style={{height:'13px'}}/>

        {TAB === 'Job' && <>
        <div className='text-center'>

        
        <h1 style={{fontSize:'50px' , fontFamily:'Encode Sans SC'}}>{pro.title}</h1>        
        <h1 style={{fontSize:'30px' , fontFamily:'Encode Sans SC'}} >${pro.minBudget} {' - '} {pro.maxBudget} {' '}{pro.type==='hourly' ? 'per hour' : 'total' } 
        {' '} <span style={{fontSize:'20px',color:'green'}} >Status : {pro.status}</span>
        </h1>        
        <h1>{pro.description}</h1>

        <hr style={{height:'13px'}}/>

        <h1 style={{fontSize:'30px' , fontFamily:'Encode Sans SC'}} > Skill Set </h1>        
        {pro.tags.map(x=><span style={{display:'inline-block' ,background:'#a1c5ff',color:'white', borderRadius:'20px' ,padding:'5px',margin:'10px' }}>
        {x}</span>)}


        <hr style={{height:'13px'}}/>
        
        <h1>Total number of responses : {pro.responses.length}</h1>
        <h1>Total hired : {pro.hired.length}</h1>
        
        


        </div>

        <div className='text-center p-5' >
        <hr style={{height:'13px'}}/>
        <button className='fl' style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
            border: '1px solid transparent' }} type="submit"> Contact the person </button>{' '}
        <button className='fl' style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
            border: '1px solid transparent' }} onClick={()=>setApply(true)} type="submit"> Apply for this job </button>
        </div>

        {Apply && userInfo && user && user.proAccount && <div className='text-center p-5' >
        <form onSubmit={proposalSubmit} >
        <h2 className='fl' >Write A Proposal for this Job</h2>
        <textarea onChange={e=>setProposal(e.target.value)} required rows='8' cols='40' />
        <br/>
        <button className='fl' style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
        border: '1px solid transparent' }} type="submit"> Submit </button>
        </form>
        </div>}




        </>}

        
        {TAB === 'Proposals' && 
        <SocketProvider id={userInfo._id }>
        { pro.responses.map( x => <SingleResponse jobId={props.match.params.id} by={x.by} response={x.response}/> )}
        </SocketProvider>
        }



        {TAB === 'Hired' && <>
        <div  >
        <h1>There are {pro.hired.length} people hired for this job </h1>
        {pro.hired.map(x=> <NamePic id={x} /> )}
        </div> 
        </>}

        
        {TAB === 'Pay Roll' && <div>
        <h1>There are {pro.payRoll.length} people in your Pay Roll for this Job </h1>
        {pro.payRoll.map(x=> <SinglePaymentCard by={x.user} totalPayed={x.totalPayed} paymentHistory={x.paymentHistory} jobid={props.match.params.id} /> )}
        </div> }

        {TAB === 'Edit' && <>
        Edit your job post 
        </>}


        
        </Container>

        }
        <br/><br/><br/><br/>




        
               
        </div>
        )
}
