import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Col, Container, Image, Row , Carousel } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { update, userDetails, userSuggest } from '../actions/userActions';
import { Link } from 'react-router-dom';


export default function RefundsScreen() {



        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const user = useSelector((state) => state.getDetails.user);
        const [Refunds, setRefunds] = useState([])
        const dispatch = useDispatch()
        const history = useHistory()
        const [PendingAmount, setPendingAmount] = useState(0)
        const [RefundedReq, setRefundedReq] = useState([])

        useEffect(() => {
                
                dispatch( userDetails() )

               
                axios.get(`/api/orders/all-refunds` , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                .then(res=> setRefunds(res.data) )   
                axios.get(`/api/orders/my-pending-refunds-amount` ,  { headers: { Authorization: `Bearer ${userInfo.token}`} }  )
                .then(res => { if(res.data){ setPendingAmount(res.data.amount) }})


        }, [])


        const PayRefundHandler = (x) => {

                if(user.netIncome - user.withdrawn < x.amount ){alert('You dont have Enough Credit'); return ;}

                if(!window.confirm(`Are you sure you want to refund an amount of ${x.amount} to ${x.buyerName} ?`)) return ;

                axios.put(`/api/orders/pay-refund/${x.orderId}/${x._id}` , {} , { headers: { Authorization: `Bearer ${userInfo.token}`} }  )
                .then(res => { if(res.data){ 
                        alert('Refund Completed')
                        setRefundedReq([...RefundedReq , res.data]) ;

                        const notificationObject = {
                                type : 'Refund Completed' ,
                                byName : userInfo.userName ,
                                text : `The Seller ${userInfo.userName} refunded the amount ${x.amount}  `,
                                link : `/gig-order/${x.gig}` ,
                                }

                        axios.put(`/api/users/notification/${x.buyerId}`, notificationObject , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                        
                }})


        }




        return (
                <div>
                
                <Container>
                
                <Row style={{fontSize:'30px' , color:'grey',marginTop:'80px'}}>
                <Col sm='5' ><p >You have total {Refunds.length} refunds to pay. </p></Col>
                <Col sm='3'></Col>
                <Col sm='4'>Total :  <span style={{fontSize:'50px' ,fontWeight:'bold'}} >${PendingAmount}</span> </Col>
                </Row>
                
                {user && userInfo && Refunds.map(x=>
                
                <div style={{margin:'20px 0px' , padding:'20px' , border:'2px solid lightgrey' }} >
                <p style={{fontSize:'15px',color:'lightgray'}} >Refund ID : {x._id}</p>
                <Row>
                <Col><h1 style={{cursor:'pointer'}} onClick={()=>history.push(`/user/${x.buyerId}`)} >{x.buyerName}</h1></Col>
                <Col>View : <Link to={`/gig-order/${x.orderId}`} > Order</Link> {'  '}{'  '} <Link to={`/gigs/${x.gig}`} > Gig</Link></Col>
                <Col style={{color:'green'}} >Status :  {RefundedReq.includes(x._id) ? 'Refund Completed' : x.status}</Col>
                <Col><span style={{color:'grey' , fontSize:'60px' }} >${x.amount}</span> </Col>
                </Row>
                <hr/>

                <h3 style={{color:'grey',marginTop:'10px'}} >Reason</h3> 
                <div style={{height:'150px', overflowY:'visible',color:'grey'}}>
                <p> {x.reason} </p>
                </div>
                

                <Row>
                <Col sm='3' style={{fontSize:'15px',color:'grey'}} >Requested at : {x.datePlaced.split('T')[0].split('-').reverse().join('-')}</Col>
                <Col sm='7'></Col>
                <Col sm='2'>
                <button style={{height :'55px' ,backgroundColor:'#0095f6' , color:'white',
                border: '1px solid transparent' }} 
                onClick={()=>PayRefundHandler(x)}
                > Refund ${x.amount} </button>
                </Col>
                </Row>

                </div>
                
                ) }

                </Container>

                        
                </div>
        )
}
