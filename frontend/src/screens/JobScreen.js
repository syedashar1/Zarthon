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
import InvitedCard from '../components/InvitedCard';
import { SocketProvider, useSocket } from '../chat/contexts/SocketProvider';
import ChatApp from '../chat/components/ChatApp';


export default function JobScreen(props) {

        const [User, setUser] = useState(null)
        const [pro, setPro] = useState(null)
        const history = useHistory()
        const dispatch = useDispatch()
        const [Apply, setApply] = useState(false)
        const [Proposal, setProposal] = useState('')
        const [TeachJob, setTeachJob] = useState(false)

        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const user = useSelector((state) => state.getDetails.user);

        const [TAB, setTAB] = useState('Job')
        const socket = useSocket()
        const [RefferedPros, setRefferedPros] = useState(null)
        const [Invited, setInvited] = useState(false)
        const [Reffered, setReffered] = useState(false)
        const [MyPro, setMyPro] = useState(null)
        const [FavPros, setFavPros] = useState(null)
        const [RefferSomeone, setRefferSomeone] = useState(false)
        const [nf, setNf] = useState('')
        const [RefferPerson, setRefferPerson] = useState(null)
        const [RefferComplete, setRefferComplete] = useState(false)


        useEffect(() => {

            axios.get(`/api/professionals/user/${userInfo._id}` ,  { headers: { Authorization: `Bearer ${userInfo.token}`} }  )
            .then(res => { if(res.data){ setMyPro(res.data) }})


            axios.get(`/api/jobs/${props.match.params.id}`).then(res=>{ 
                if(res.data){ 
                setPro(res.data)
                console.log(res.data.responses);
                axios.get(`/api/users/single/${res.data.by}`).then(res2=>{setUser(res2.data)  })
                }
            })
            axios.get(`/api/professionals`).then(res2=>setRefferedPros(res2.data.pros))
            axios.get(`/api/professionals/getmyfav` ,  { headers: { Authorization: `Bearer ${userInfo.token}`} }  )
            .then(res2=>setFavPros(res2.data))
            if(pro == null){
                axios.get(`/api/jobsteacher/${props.match.params.id}`).then(res=>{
                    if(res.data)
                    {setPro(res.data)
                    setTeachJob(true)
                    axios.get(`/api/users/single/${res.data.by}`).then(res2=>{ setUser(res2.data) })}

                })

            }
    
        }, [ RefferComplete ])


        useEffect(() => {
            
            if(MyPro && pro && pro.invitations && pro.referals )
            {
            for (let i = 0; i < pro.invitations.length; i++) {
                if(pro.invitations[i].to == MyPro._id && pro.invitations[i].status == 'Sent' ) setInvited(true)    
            }

            for (let i = 0; i < pro.referals.length; i++) {
                if(pro.referals[i].to == MyPro._id  ) setReffered(true)    
            }
            }


        }, [MyPro , pro ])

        useEffect(() => {
                
                axios.get(`/api/professionals/username/${nf}`).then( res => {setRefferPerson(res.data) ; console.log(res.data);} )
                
        }, [nf])


        const refferHandler = () => {

            if(!window.confirm(`Do you want to refer ${RefferPerson.name} instead ?` )){return}
            axios.put(`/api/jobs/reffersomeelse/${props.match.params.id}/${RefferPerson._id}` , {} , { headers: { Authorization: `Bearer ${userInfo.token}`} }  )
            .then( res => {setInvited(false) ; 
            
            const notificationObject = {
                type : 'Got a new Referal !' ,
                byName : userInfo.userName ,
                text : `You got a new job referal by ${userInfo.userName} for the job : ${pro.title} !`,
                link : `/job/${props.match.params.id}` ,
                }
            
            } )

            
        }




        const proposalSubmit = (e)=>{
            e.preventDefault()


        if(TeachJob){

            axios.put(`/api/jobsteacher/submitproposal/${props.match.params.id}` , {
                response : Proposal
            }, { headers: { Authorization: `Bearer ${userInfo.token}`} } )
            .then(res => {
                if(res.data){

                    if(res.data=='not enough' ){ history.push('/buy-connects/notenough') ; return}

                    alert('job posted')
                    axios.get(`/api/jobsteacher/${props.match.params.id}`).then(res=>setPro(res.data))
                    setApply(false)
                    setProposal(false)
                    
                    const notificationObject = {
                        type : 'New Teacher Proposal' ,
                        byName : userInfo.userName ,
                        text : 'You got a new job proposal for a teaching Job',
                        link : `/job/${props.match.params.id}` ,
                    }

                    axios.put(`/api/users/notification/${pro.by}`, notificationObject , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
    
                }

    
            } )

            return ;
            }






            axios.put(`/api/jobs/submitproposal/${props.match.params.id}` , {
                response : Proposal
            }, { headers: { Authorization: `Bearer ${userInfo.token}`} } )
            .then(res => {
                if(res.data){

                    if(res.data=='not enough' ){ history.push('/buy-connects/notenough') ; return}

                    alert('job posted')
                    axios.get(`/api/jobs/${props.match.params.id}`).then(res=>setPro(res.data))
                    setApply(false)
                    setProposal(false)
                    
                    const notificationObject = {
                        type : 'New Proposal' ,
                        byName : userInfo.userName ,
                        text : 'You got a new job proposal',
                        link : `/job/${props.match.params.id}` ,
                    }

                    axios.put(`/api/users/notification/${pro.by}`, notificationObject , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
    
                }

        } )

        }


        return (
        <div> <br/>{userInfo && <ChatApp show={true} /> }

        {Invited &&  <div className='form text-center' >
        <h1>You Are invited for this Job directly !</h1>
        <button style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
            border: '1px solid transparent' }} >Reject</button>     
        {' '}
        <button style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
            border: '1px solid transparent' }} onClick={()=>setRefferSomeone(true)} >Reffer Someone</button>     
        </div>}


        {RefferSomeone && <div className='form text-center'>
        
        <input onChange={e=>setNf(e.target.value)} />

        <p> {RefferPerson && RefferPerson._id && 
        
        <Container >
        <div className="row center m-5">
        <div ><Image src={RefferPerson.profilePic} style={{width:'175px' , height:'175px' , borderRadius:'50%', cursor :'pointer',margin : '20px' }} alt='a pic' 
        onClick={ () => {history.push(`/proworker/${RefferPerson._id}`)} }/>
        <p style={{marginBottom:'-5px',color:'green',fontSize:'20px'}} >{RefferPerson.name}</p>
        <p style={{marginBottom:'0px',fontWeight:'bold'}}>{RefferPerson.title}</p>
        </div>
        <div >
        <button style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
            border: '1px solid transparent' }} onClick={refferHandler}
        > Reffer {' '}{RefferPerson.name} 
        </button>
        </div>
        </div>
        </Container>
         
        } </p>

        </div>}


        {Reffered &&  <div className='form text-center' >
        <h1>You Are reffered for this Job !</h1>      
        </div>}


        {User && pro && pro._id && <Container style={{marginTop:'30px' , border:' 1px solid rgba(0,0,0,.125)'}}>
        
        {userInfo && userInfo._id === pro.by &&  
        <Tabs defaultActiveKey="Job" id="uncontrolled-tab-example" className="mb-3" onSelect={(k)=>setTAB(k)} >
        <Tab eventKey="Job" title="Job" />
        <Tab eventKey="Proposals" title="Proposals" />
        <Tab eventKey="Hired" title="Hired" />
        <Tab eventKey="Pay Roll" title="Pay Roll" />
        <Tab eventKey="Invitations" title="Invitations" />
        <Tab eventKey="Invitations from Favourites" title="Invitations from Favourites" />
        <Tab eventKey="Edit" title="Edit" />
        </Tabs>}


        <hr style={{height:'13px'}}/>

        {TAB === 'Job' && <>
        <div className='text-center'>

        
        <h1 style={{fontSize:'50px' , fontFamily:'Encode Sans SC'}}>{pro.title}</h1>        
        <h1 style={{fontSize:'30px' , fontFamily:'Encode Sans SC'}} >${pro.minBudget} {' - '} {pro.maxBudget} {' '}{pro.type==='hourly' ? 'per hour' : 'total' } 
        {' '} <span style={{fontSize:'20px',color:'green'}} >Status : {pro.status}</span>
        </h1>        
        <h1 style={{color:'grey'}} >{pro.description}</h1>

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

        {Apply && userInfo && user && ( (!TeachJob && user.proAccount) || (TeachJob && user.teachAccount) )  
        && <div className='text-center p-5' >
        <form onSubmit={proposalSubmit} >
        <h2 className='fl' >Write A Proposal for this Job</h2>
        <textarea onChange={e=>setProposal(e.target.value)} required rows='8' cols='40' />
        <br/>
        <p className='remember' >Posting a Proposal on Zarthon takes 5 connect points.</p>
        <button className='fl' style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
        border: '1px solid transparent' }} type="submit"> Submit </button>
        </form>
        </div>}




        </>}

        
        {TAB === 'Proposals' && 
        <SocketProvider id={userInfo._id }>
        { pro.responses.map( x => <SingleResponse teachJob={TeachJob} jobId={props.match.params.id} by={x.by} response={x.response}/> )}
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
        {pro.payRoll.map(x=> <SinglePaymentCard type={TeachJob} by={x.user} totalPayed={x.totalPayed} paymentHistory={x.paymentHistory} jobid={props.match.params.id} /> )}
        </div> }



        {TAB === 'Invitations' && <div>
        <h1>Invite Professionals to your Job. </h1>
        {RefferedPros && RefferedPros.length > 0 && RefferedPros.map(x=> <InvitedCard type={TeachJob} pro={x} jobid={props.match.params.id} /> )}
        </div> }


        {TAB === 'Invitations from Favourites' && <div>
        <h1>Invite your Favourite Professionals to your Job. </h1>
        {FavPros && FavPros.length > 0 && FavPros.map(x=> <InvitedCard type={TeachJob} pro={x} jobid={props.match.params.id} /> )}
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
