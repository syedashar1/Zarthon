import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap';
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
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
 


export default function UserProfile(props) {


        const dispatch = useDispatch()
        const history = useHistory()
        const productId = props.match.params.id;

        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const user = useSelector((state) => state.getDetails.user);

        const [Gigs, setGigs] = useState(null)


        const updateSuccess = useSelector((state) => state.userUpdateStatus.success);
        const updateError = useSelector((state) => state.userUpdateStatus.error);


        const suggestedUsers = useSelector((state) => state.userSuggestion.Suggestedusers);
        const suggestionLoading = useSelector((state) => state.userSuggestion.loading);



        const [EditState, setEditState] = useState(false)

        const [Message, setMessage] = useState('')
        const [openModal, setopenModal] = useState(false)


        const [Name, setName] = useState(null)
        const [UserName, setUserName] = useState(null)
        const [Email, setEmail] = useState(null)
        const [Bio, setBio] = useState(null)
        const [NewPassword, setNewPassword] = useState('')
        const [OldPassword, setOldPassword] = useState('')

        const [Pro, setPro] = useState(null)
        const [Teach, setTeach] = useState(null)





        useEffect(() => {

                if (!userInfo) { history.push('/signin'); return; }
                
                if(props.match.params.id){
                        dispatch(userDetails(props.match.params.id))
                        dispatch(userSuggest(props.match.params.id))

                }
                else{
                        dispatch( userDetails() ) 

                }


                
                
                axios.get(`/api/professionals/user/${props.match.params.id ? props.match.params.id : userInfo._id}`   )
                .then(res => {
                        if(res.data){ setPro(res.data) }})

                axios.get(`/api/teachers/user/${props.match.params.id ? props.match.params.id : userInfo._id}`  )
                .then(res => {
                if(res.data){ setTeach(res.data) }})


                axios.get(`/api/gigs/user/${props.match.params.id ? props.match.params.id : userInfo._id}`)
                .then(res => { setGigs(res.data.gigs)})
                

               

        }, [productId , userInfo])



        useEffect(() => {

                console.log(updateError);

                if(updateSuccess){
                        setEditState(false)
                }
                if(updateError){
                        setEditState(true)
                }
        }, [updateError , updateSuccess])




        const submitHandler = (e) => {
                e.preventDefault()
                axios.put(`/api/chat/singletext/${userInfo._id}`, {text : Message , recipients: [user._id] }  );
                setopenModal(false)
        }


        const createGigHandler = () => {
                axios.post(`/api/gigs/create` ,  {} , { headers: { Authorization: `Bearer ${userInfo.token}`} }  )
                .then(res =>{
                        if(res.data){
                                alert('new gig created')
                                history.push(`/edit-gig/${res.data}`)
                        }
                })

        }


        const handleEdit = () => {
                setEditState(true)
                setName(user.name)
                setUserName(user.userName)
                setEmail(user.email)
                setBio(user.bio)
                setNewPassword('')
        }


        const submitEditInfo = () => {
                dispatch( update({
                        name : Name , 
                        userName : UserName , 
                        email : Email ,
                        bio : Bio ,
                        oldPassword : OldPassword , 
                        newPassword : NewPassword
                }) )


                console.log({userName : UserName});
        }



        return (
                <div>

                {userInfo && userInfo._id && <ChatApp show={true} />}
                {user && userInfo && user._id === userInfo._id &&
                <p style={{textAlign:'right'}}>
                <button 
                onClick={handleEdit}
                style={{fontSize:"20px",height:'50px'}} className='btn btn-lg btn-dark'>Edit Profile</button> 
                </p>
                }
                {user && <Container style={{marginTop:'30px' , border:' 1px solid rgba(0,0,0,.125)'}}>
                <div style={{height:'20px'}} />
                        
                        <Row  >
                        <Col style={{marginBottom:'20px'}} sm={4} >
                        
                        <ProfilePic></ProfilePic>

                        </Col >
                        <Col sm={3} >

                        {EditState ? 
                        <input 
                        value = {UserName}
                        onChange = {(e)=>setUserName(e.target.value)}
                        style={{fontSize:'30px',fontWeight:'bold'}} /> :
                        <h1 style={{fontSize:'50px',fontWeight:'bold'}} >{ UserName || user.userName}</h1>}

                        <p style={{color:'red'}}>{updateError && updateError.existingUserName  && <HeadShake> {updateError.existingUserName} </HeadShake>  }</p>



                        {EditState ? 
                        <input
                        value = {Name}
                        onChange = {(e)=>setName(e.target.value)}
                        style={{color:'#666666',marginBottom:'30px'}} /> :
                        <p style={{color:'#666666',marginBottom:'30px'}}>{Name || user.name}</p>
                        }



                        {EditState ? 
                        <input
                        value = {Email}
                        onChange = {(e)=>setEmail(e.target.value)}
                        style={{color:'#666666',marginBottom:'30px'}} /> :
                        <p style={{color:'#666666',marginBottom:'30px'}}>{Email || user.email}</p>}

                        <p style={{color:'red'}}>{updateError && updateError.existingEmail  && <HeadShake> {updateError.existingEmail} </HeadShake>  }</p>

                        </Col>
                        
                        

                        <Col sm={5}>
                        <div className='text-center' >
                        {EditState ? 
                        <div>
                        <textarea
                        value = { Bio}
                        onChange = {(e)=>setBio(e.target.value)} 
                        rows='4' cols='20' />
                         
                        <br></br>

                        <p>Confirm current Password</p>
                        
                        <p style={{color:'red'}}>
                        {updateError && updateError.notMatched && <HeadShake> {updateError.notMatched} </HeadShake> }</p>
                        
                        <input type='password' onChange={e=>setOldPassword(e.target.value)} ></input>
                        <p>Set New Password</p>
                        <input type='password' onChange={e=>setNewPassword(e.target.value)} ></input>

                        <div style={{padding:'20px'}}>
                        <button 
                        style={{fontSize:"20px",height:'50px'}} className='btn btn-lg btn-dark'
                        onClick={submitEditInfo} >Update</button>
                        <button 
                        style={{fontSize:"20px",height:'50px'}} className='btn btn-lg btn-dark'
                        onClick={()=>setEditState(false)} >Cancel</button>
                        </div>

                        </div> :
                        <div>
                        <h2 style={{color:'grey'}}>{ Bio || user.bio}</h2>
                        { userInfo._id !== user._id && !user.active && 
                        <h1 style={{fontSize:'15px',color:'grey'}}> Last seen on {' '}{user.lastSeen.split('T')[0]}{' '}at{' '}{user.lastSeen.split('T')[1].split('.')[0]} </h1>  }
                        </div>


                }
                
                </div>
                        </Col>


                        </Row>
                        

                
                

                

                 <div style={{height:'20px'}} />
                
                <div>
                {user.proAccount && Pro && Pro.by &&  <SinglePro type='proworker' pro ={Pro} /> }
                {user.teachAccount && Teach && Teach.by &&  <SinglePro type='teacher' pro ={Teach} /> }
                </div>
                <div style={{height:'40px'}} />


                <h1 className='text-center'>{props.match.params.id && props.match.params.id !== userInfo._id ?
                <button style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
                border: '1px solid transparent' }} onClick={()=>setopenModal(true)}>Contact</button> : 
                <button style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
                border: '1px solid transparent' }} onClick={createGigHandler}>CREATE GIG</button>
                }</h1>

                <div className="row center">
                {Gigs && Gigs.map(gig => <SingleGig gig={gig} />)}
                </div>

                





                </Container >


                }
                

                




                { suggestedUsers && user && user._id !== userInfo._id && 

                <div>
                {/* <Suggestions users = {suggestedUsers} /> */}
                </div>
                
                } 

                

                {openModal && (
                <Modal isOpen ={true} onRequestClose = { ()=>setopenModal(false) }
                style={{
                        content: {
                          margin: 'auto',
                          border: '1px solid #ccc',
                          borderRadius: '0px',
                          padding: '10px',
                          maxWidth:'660px',
                          maxHeight:'330px',
                        }
                      }}

                >
                        <Zoom>

                        <form className="form upgap text-center" onSubmit={submitHandler} >
                        <textarea id="description" rows="5" cols="50" type="text" required="true"
                        placeholder={`Send a message to ${user.name}`} onChange={(e) => setMessage(e.target.value) }
                        ></textarea>
                        <button>send</button>
                        </form>


                        </Zoom>

                </Modal>
                )}

        
               



                
<div style={{height:'100px'}} />
                
                
                        
        
        </div>
        )
}
