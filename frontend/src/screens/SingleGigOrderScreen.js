import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Col, Container, Image, Row , Carousel } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { update, userDetails, userSuggest } from '../actions/userActions';

export default function SingleGigOrderScreen(props) {

        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const user = useSelector((state) => state.getDetails.user);
        const [Order, setOrder] = useState(null)
        const [PlacedBy, setPlacedBy] = useState(null)
        const [GigOwner, setGigOwner] = useState(null)
        const history = useHistory()
        const [Rating, setRating] = useState(1)
        const [Review, setReview] = useState('')
        const dispatch = useDispatch()
        const [RefundDiv, setRefundDiv] = useState(false)
        const [Reason, setReason] = useState('')


        useEffect(() => {
                
                dispatch( userDetails() )

                console.log(props.match.params.id);
               
                axios.get(`/api/orders/gig-order/${props.match.params.id}` , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                .then(res=> {
                        setOrder(res.data)
                        axios.get(`/api/users/${res.data.gigOwner}`).then(res=>setGigOwner(res.data))
                        axios.get(`/api/users/${res.data.placedBy}`).then(res=>setPlacedBy(res.data))

                        if(res.data.placedBy !== userInfo._id && res.data.gigOwner !== userInfo._id ) history.push('/profile') 
                
                })   

        }, [])


        const finishHandle = () => {
                if (! window.confirm('confirm setting this order as finished ?')) {return} ;

                axios.put(`/api/orders/finished/${props.match.params.id}` , { } ,{ headers: { Authorization: `Bearer ${userInfo.token}`} } )
                .then(res => {if(res.data) {
                            
                        const notificationObject = {
                                type : 'Gig Completed !' ,
                                byName : userInfo.userName ,
                                text : `A Gig that you ordered ( ${Order.title} ) for amount ${Order.totalPrice} has been completed by ! Add a Review. `,
                                link : `/gig-order/${props.match.params.id}` ,
                                }
                        axios.put(`/api/users/notification/${Order.placedBy}`, notificationObject , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                        .then(res => {if(res.data) alert('order finished.')} )
                                        


                }}  )
        }


        const startWorkHandle = () => {
                if (! window.confirm('confirm setting this order as working ?')) {return} ;

                axios.put(`/api/orders/startwork/${props.match.params.id}` , { } ,{ headers: { Authorization: `Bearer ${userInfo.token}`} } )
                .then(res => {if(res.data) {
                            
                        const notificationObject = {
                                type : 'Started Working on Your Gig!' ,
                                byName : userInfo.userName ,
                                text : `A Gig that you ordered ( ${Order.title} ) for amount ${Order.totalPrice} has been is in working phase ! `,
                                link : `/gig-order/${props.match.params.id}` ,
                                }
                        axios.put(`/api/users/notification/${Order.placedBy}`, notificationObject , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                        .then(res => {if(res.data) alert('order working.')} )
                                        


                }}  )
        }






        const submitHandle = () => {
                const x = {
                        review : Review ,
                        rating : Rating ,
                        pic :  user.profilePic ,
                        }
                axios.put(`/api/orders/gig-review/${props.match.params.id}`, x , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                .then(res => {if(res.data) history.push(`/gigs/${res.data}`) } )
        }

        const refundRequestHandler = () => {

                if(!window.confirm(`Are you sure you want to refund of amount ${0.8*Order.totalPrice}`)) return ;

                axios.put(`/api/orders/ask-refund/${props.match.params.id}`, {
                        amount : 0.8*Order.totalPrice ,
                        reason : Reason

                } , { headers: { Authorization: `Bearer ${userInfo.token}`} } ).then(res => {if(res.data){
                        
                        
                        const notificationObject = {
                                type : 'Refund Request' ,
                                byName : userInfo.userName ,
                                text : `A buyer ${userInfo.userName} asked for refund of a gig ( ${Order.title} ) for amount ${res.data.amount}  `,
                                link : `/gig-order/${props.match.params.id}` ,
                                }
                        axios.put(`/api/users/notification/${Order.gigOwner}`, notificationObject , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                        .then(res => {if(res.data) {alert('Refund Request Submitted') ; setRefundDiv(false) ; setReason(null) }} )
                } } )



        }



        return (
                <div>
                {userInfo && Order &&  <div className='header' style={{ position:'sticky', backgroundColor:'aliceblue'}} >
                <h2><a href='#'> </a></h2>
                <h2><a href='#seller'>{ Order.placedBy == userInfo._id ? 'Contact Worker' : 'Contact Client' }</a></h2>
                {Order.placedBy == userInfo._id && Order.status != 'Refund Requested by Buyer' &&  Order.status != 'Refund given by Seller' && <h2 onClick={()=>setRefundDiv(true)} ><a href='#'>Ask for Refund</a></h2>}
                {Order.gigOwner == userInfo._id && Order.status == 'Refund Requested by Buyer' && <h2><a href='#'>Refund Order</a></h2>}
                {Order.gigOwner == userInfo._id && Order.status == 'working' && <h2><a href='#' onClick={finishHandle} >Set as Finished</a></h2>}
                {Order.gigOwner == userInfo._id && Order.status == 'in Queue' && <h2><a href='#' onClick={startWorkHandle} >Set as Working</a></h2>}
                {Order.placedBy == userInfo._id && Order.status == 'finished' && <h2><a href='#review'>Add a Review !</a></h2>}
                <h2><a href='#reviews'> </a></h2>
                </div>}

        {userInfo && Order && RefundDiv && <div className='form p-4' >
        
        <h1>Refund  Form</h1>
        <p>Sad to hear that :/ , make sure to have a conversation with the seller before asking for refund.</p>
        <p>You will be refunded a credit of ${0.8*Order.totalPrice} by the seller.</p>
        <p>Reason for the refund : </p>
        <div className='text-center' >
        <textarea cols='80' rows='4' onChange={(e)=>setReason(e.target.value)}  value={Reason} />
        </div>
        <div className='row center'>
        <button style={{height :'55px' ,backgroundColor:'#0095f6' , color:'white',
        border: '1px solid transparent' }} onClick={refundRequestHandler} > Request Refund </button>
        </div>

        </div> }


        {Order && GigOwner && PlacedBy && <Container style={{marginTop:'30px' , border:' 1px solid rgba(0,0,0,.125)' , padding:'10px 20px' }} >
                

        <img src={Order.image} style={{width:'300px',height:'200px'}} ></img>
        <span style={{fontSize:'100px' , fontFamily:'Encode Sans SC'}} >{Order.title}</span>
        <hr/>

        <Row>
        
        <Col>

        <div className=' text-center form'  >
        <h1>Placed by</h1>
        <Image src={PlacedBy.profilePic} style={{width:'120px' , height:'120px' , borderRadius:'50%', cursor :'pointer',margin : '0px' }} alt='a pic' 
        onClick={()=>history.push(`/user/${PlacedBy._id}`)}/>
        <div>
        <p style={{marginBottom:'-5px',color:'green',fontSize:'30px'}} >{PlacedBy.name}</p>
        </div>
        </div>
        </Col>
        <Col>
        <div className=' text-center form' >
        <h1>To</h1>
        <Image src={GigOwner.profilePic} style={{width:'120px' , height:'120px' , borderRadius:'50%', cursor :'pointer',margin : '0px' }} alt='a pic' 
        onClick={()=>history.push(`/user/${GigOwner._id}`)}/>
        <div>
        <p style={{marginBottom:'-5px',color:'green',fontSize:'30px'}} >{GigOwner.name}</p>
        </div>
        </div>
        </Col>
        <Col>
        <div className=' text-center form'  >
        <h1>For Amount</h1>
        <h1 style={{fontSize:'130px' , fontFamily:'Encode Sans SC'}} >{Order.totalPrice}$</h1>
        {Order.gigOwner == userInfo._id && 
        <h1 style={{fontSize:'20px' , fontFamily:'Encode Sans SC'}} >Your earning { 0.8*Order.totalPrice}$</h1>}
        </div>
        </Col>

        </Row>
        <br/>

        <div className='form p-5' style={{maxWidth:'100%'}} >
        <h1 style={{fontSize:'50px' , fontFamily:'Encode Sans SC'}} >Requirements</h1>
        <h1>{Order.details}</h1>
        </div>
        <br/>
        <div className='form p-5' style={{maxWidth:'100%' ,color:'grey' }} >
        <h1 style={{fontSize:'50px' , fontFamily:'Encode Sans SC'}} >Details</h1>
        <h1 style={{color:'green'}} > {'Order Status : '} {Order.status} </h1>
        <h1>Placed At : {Order.paidAt.split('T')[0].split('-').reverse().join('-') } {' on '} {Order.paidAt.split('T')[1].split('.')[0] } </h1>
        <h1>{'Price for One : '} {Order.price} {' , Quantity : '}{Order.qty}  </h1>
        </div>
        <br/>

        {Order.status === 'finished' && <div className='form p-5 text-center' style={{maxWidth:'100%'} } id='review'  >
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
        </div>}
                </Container>

                }
                <br/><br/><br/>
                </div>
        )
}
