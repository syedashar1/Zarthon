import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row , Image , Table , Button} from 'react-bootstrap';
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
import { Link } from 'react-router-dom';


export default function WihdrawAmin() {



        const dispatch = useDispatch()
        const history = useHistory()
        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const user = useSelector((state) => state.getDetails.user);
        const [WithDrawReqs, setWithDrawReqs] = useState([])
        const [TotalWithDrawAmount, setTotalWithDrawAmount] = useState(0)
        const [Completed, setCompleted] = useState([])

        useEffect(() => {
                
                if(userInfo.email !== 'greatmind20@gmail.com') history.push('/')
                dispatch( userDetails() )
                axios.get(`/api/withdraw/admin` , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                .then(res=> { if(res.data) {  setWithDrawReqs(res.data) ;  }
                })   
        }, [])

        useEffect(() => {
                
                var a = 0
                for (let i = 0; i < WithDrawReqs.length; i++) {
                        a = a + WithDrawReqs[i].amount
                }
                setTotalWithDrawAmount(a)
        }, [WithDrawReqs])


        const ConfirmPaymentHandler = (x) => {

                if(!window.confirm(`Confirm Payment of amount ${x.amount} ?`)) return ;
        
                axios.put(`/api/withdraw/confirmpayment/${x._id}` , {} , { headers: { Authorization: `Bearer ${userInfo.token}`} }  )
                .then(res => { if(res.data){ 
                        alert('Refund Completed')
                        setCompleted([...Completed , res.data]) ;

                        const notificationObject = {
                                type : 'Transaction Completed' ,
                                byName : 'Zarthon' ,
                                text : `Amount $ ${x.amount} has been transfered to your ${x.typeOfWithdrawal}. It maybe few days before money is ready to use. `,
                                link : `/` ,
                                }

                        axios.put(`/api/users/notification/${x.by}`, notificationObject , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                        
                }})


        }


        return (
                <div>
                
                <Container>
                
                <Row style={{fontSize:'30px' , color:'grey',marginTop:'80px'}}>
                        <Col sm='3'></Col>
                </Row>
                
                {user && userInfo && WithDrawReqs.map(x=>
                
                <div style={{margin:'20px 0px' , padding:'20px' , border:'2px solid lightgrey' }} >
                <p style={{fontSize:'15px',color:'lightgray'}} >Request ID : {x._id}</p>
                <Row>
                <Col sm='4' ><h1 style={{fontSize:'25px',color:'grey'}} >Requested on {x.requestDate.split('T')[0].split('-').reverse().join('-')}</h1>
                </Col>
                <Col>by : <Link to={`/gig-order/${x.orderId}`} > User</Link></Col>
                <Col style={{color:'green'}} >Status :  {Completed.includes(x._id) ? 'Payment Completed' : x.status}</Col>
                <Col><span style={{color:'grey' , fontSize:'60px' }} >${x.amount}</span> </Col>
                </Row>
                <hr/>

                <p> Type : {x.typeOfWithdrawal === 'PayPal' ? <span style={{fontSize:'25px' , color:'#295275' , fontWeight:'bolder'}} >PayPal Account</span> :
                 <span style={{fontSize:'25px' , color:'green' , fontWeight:'bolder' }} >Bank Transfer</span>}  </p>
                
                <p>Name:</p>
                <p style={{fontSize:'35px' , color:'grey' }} >{x.name}</p>

                
                

                <Row>
                <Col sm='10'>
                {x.typeOfWithdrawal === 'PayPal' ? 
                <div>
                <p>PayPal Email Address : </p>
                <p style={{fontSize:'35px' , color:'grey'}}>{x.paypalEmail}</p>
                </div> :  
                <div>
                <p>IBAN : </p>
                <p style={{fontSize:'35px' , color:'grey'}}>{x.iban}</p>
                </div>
                }
                </Col>
                <Col sm='2'>
                <button style={{backgroundColor:'#0095f6' , color:'white',
                border: '1px solid transparent' }} 
                onClick={()=>ConfirmPaymentHandler(x)}
                > Confirm Payment</button>
                </Col>
                </Row>

                </div>
                
                ) }

                </Container>

                </div>
        )
}
