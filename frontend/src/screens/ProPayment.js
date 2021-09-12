import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { Col, Container, Image, Row ,ProgressBar} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from "react-dom"

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function ProPayment(props) {


        const history = useHistory()
        const dispatch = useDispatch()
        const [Pro, setPro] = useState(null)
        const [Job, setJob] = useState(null)
        const [User, setUser] = useState(null)
        const [Typee, setTypee] = useState(props.match.params.type)
        const [Teach, setTeach] = useState(null)
        const [Amount, setAmount] = useState(5)
        const [Sending, setSending] = useState(false)
        const userInfo = useSelector((state) => state.userSignin.userInfo);


        useEffect(() => {
                axios.get(`/api/${Typee ==='teacher'?'jobsteacher':'jobs'}/${props.match.params.job}`).then(res=>setJob(res.data))
                axios.get(`/api/users/single/${props.match.params.user}`).then(res=>setUser(res.data))
                if(Typee=='proworker'){
                        axios.get(`/api/professionals/user/${props.match.params.user}`).then(res=>setPro(res.data) )
                }
                if(Typee=='teacher'){
                        axios.get(`/api/teachers/user/${props.match.params.user}`).then(res=>setPro(res.data) )
                }
            }, [])

        
        const paymentHandle = () => {
                setSending(true)
                
                axios.put(`/api/${ Typee ==='teacher' ?'jobsteacher':'jobs'}/payment-gateway/${props.match.params.job}/${props.match.params.user}` ,
                { amount : Amount }, 
                { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                .then(res => {
                        if(res.data){
                                console.log(res.data);
                                setSending(false)
                                history.push(`/job/${props.match.params.job}`)

                                const notificationObject = {
                                        type : 'Paid' ,
                                        byName : userInfo.userName ,
                                        text : `You got paid $${Amount} !`,
                                        link : `/job/${props.match.params.job}` ,
                                    }
                                axios.put(`/api/users/notification/${User._id}`, notificationObject , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                                            




                        }

                } )

                
        }




        const createOrder = (data, actions) =>{
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: Amount ,
                      },
                    },
                  ],
                });
              };
            

        const onApprove = (data, actions) => {

                paymentHandle()

                return actions.order.capture();
        };








        return (
        <div>
        {Job && User && (Pro || Teach) && 
        <Container style={{marginTop:'30px' , border:' 1px solid rgba(0,0,0,.125)' , padding:'10px 20px' }}>
        <Row className='form' style={{maxWidth:'100%'}}>
        <Col>
        <div className=' text-center' >
        <Image src={User.profilePic} style={{width:'120px' , height:'120px' , borderRadius:'50%', cursor :'pointer',margin : '0px' }} alt='a pic' 
        onClick={()=>history.push(`/proworker/${Pro._id}`)}/>
        <div>
        <p style={{marginBottom:'-5px',color:'green',fontSize:'40px'}} >{User.name}</p>
        <p style={{marginBottom:'0px',fontWeight:'bold'}}>{Pro.title}</p>
        <p style={{marginBottom:'-5px',fontSize:'20px'}}><i>{'Pakistan'}</i></p>
        </div>
        </div>
        </Col>

        <Col>
        <div className='text-center' >
        <h1>For Job</h1>
        <h1 style={{fontSize:'40px' , fontFamily:'Encode Sans SC'}} >{Job.title}</h1>
        <h1 style={{fontSize:'20px' , fontFamily:'Encode Sans SC'}} > ${Job.minBudget} {' - '} ${Job.maxBudget}</h1>
        </div>
        </Col>

        </Row>
        <br/><br/>
        <div className='form text-center'>
        <h1>Send Amount</h1>
        <input onChange={(e)=>setAmount(e.target.value)} min='5' type='number' style={{maxWidth:'150px',fontSize:'25px'}} placeholder='in $' /><br/><br/>
        
        <PayPalButton createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)} /> 

        </div>
        
        

        </Container>
        }
        </div>
        )
}
