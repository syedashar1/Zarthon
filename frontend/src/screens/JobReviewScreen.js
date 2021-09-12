import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Col, Container, Image, Row , Tabs , Tab } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import ChatApp from '../chat/components/ChatApp';

export default function JobReviewScreen(props) {


        const [Job, setJob] = useState(null)
        const [User, setUser] = useState(null)
        const history = useHistory()
        const dispatch = useDispatch()
        const [Pro, setPro] = useState(null)
        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const user = useSelector((state) => state.getDetails.user);
        const [Rating, setRating] = useState(1)
        const [Review, setReview] = useState('')


        useEffect(() => {


                if(props.match.params.type=='teacher'){
                axios.get(`/api/jobsteacher/${props.match.params.job}`).then(res=>{
                        setJob(res.data)
                        console.log(res.data);
                        axios.get(`/api/teachers/user/${props.match.params.person}`).then(res=>setPro(res.data) )
                        axios.get(`/api/users/single/${props.match.params.person}`).then(res=>setUser(res.data))
                        }) 
                return ;      
                }

                axios.get(`/api/jobs/${props.match.params.job}`).then(res=>{
                    setJob(res.data)
                    console.log(res.data.responses);
                    axios.get(`/api/professionals/user/${props.match.params.person}`).then(res=>setPro(res.data) )
                    axios.get(`/api/users/single/${props.match.params.person}`).then(res=>setUser(res.data))
                })

                


        
            }, [])

        const submitHandle = () => {
                const x = {
                        review : Review ,
                        rating : Rating ,
                        pic :  user.profilePic ,
                        }
                const notificationObject = {
                        type : 'Job ended and Reviewed' ,
                        byName : userInfo.userName ,
                        text : `Your job (${Job.title}) ended and you got a new review !`,
                        link : `/${props.match.params.type=='teacher'?'teacher':'proworker'}/${Pro._id}` ,
                        }

                if(props.match.params.type=='teacher'){
                axios.put(`/api/jobsteacher/job-review/${Job._id}/${Pro._id}`, x , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                .then(res => {if(res.data){ 
                        axios.put(`/api/users/notification/${Pro.by}`, notificationObject , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                        history.push(`/job/${res.data}`) } } )
                return
                }
                
                axios.put(`/api/jobs/job-review/${Job._id}/${Pro._id}`, x , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                .then(res => {if(res.data){ 
                        axios.put(`/api/users/notification/${Pro.by}`, notificationObject , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                        history.push(`/job/${res.data}`)
                } } )
        }
        

        return (
                <div>
        {User && Job && Pro && <Container style={{marginTop:'30px' , border:' 1px solid rgba(0,0,0,.125)'}}>

        <Row>
        
        <Col>
        <div className=' text-center '  >
        <h1>For Professional</h1>
        <Image src={User.profilePic} style={{width:'120px' , height:'120px' , borderRadius:'50%', cursor :'pointer',margin : '0px' }} alt='a pic' 
        onClick={()=>history.push(`/proworker/${Pro._id}`)}/>
        <div>
        <p style={{marginBottom:'-5px',fontSize:'30px'}} >{User.name}</p>
        <p style={{marginBottom:'-5px',color:'green',fontSize:'30px'}} >{Pro.title}</p>
        </div>
        </div>
        </Col>
        
        <Col>
        <div className=' text-center '  >
        <h1>For Job</h1>
        <h1 style={{fontSize:'50px' , fontFamily:'Encode Sans SC'}} >{Job.title}</h1>
        </div>
        </Col>

        </Row>
        
        <br/>

        <div className='form p-5 text-center' style={{maxWidth:'100%'} } id='review'  >
        <h1 style={{fontSize:'50px' , fontFamily:'Encode Sans SC'}} >Add a Review</h1>
        
        
        <IconButton onClick={()=>setRating(1)} ><SentimentVeryDissatisfiedIcon className='smile' style={{color: Rating>=1? '#edc67e':'' }} /></IconButton>
        <IconButton onClick={()=>setRating(2)}><SentimentDissatisfiedIcon className='smile' style={{color: Rating>=2? '#edc67e':'' }} /></IconButton>
        <IconButton onClick={()=>setRating(3)}><SentimentSatisfiedIcon className='smile' style={{color: Rating>=3? '#edc67e':'' }}/></IconButton>
        <IconButton onClick={()=>setRating(4)}><SentimentSatisfiedAltIcon className='smile' style={{color: Rating>=4? '#edc67e':'' }}/></IconButton>
        <IconButton onClick={()=>setRating(5)}><SentimentVerySatisfiedIcon className='smile' style={{color: Rating>=5? '#edc67e':'' }}/></IconButton>
        <h5 style={{color:'grey'}} >({Rating}/5)</h5>
        <textarea rows='6' cols='50' value={Review} placeholder='Add a review' onChange={(e)=>setReview(e.target.value)} />
        <br/>
        <button onClick={submitHandle} >Submit</button>
        </div>
        </Container>}                
                </div>
        )
}
