import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Col, Container, Image, Row , Carousel } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Charts from '../components/Charts'
import CheckIcon from '@material-ui/icons/Check';


import ReactDOM from "react-dom"

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function GigPayment(props) {

        const [User, setUser] = useState(null)
        const [Gig, setGig] = useState(null)
        const history = useHistory()
        const dispatch = useDispatch()
        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const [Offer, setOffer] = useState(null)
        const [Quantity, setQuantity] = useState(1)
        const [OfferObject, setOfferObject] = useState(null)
        const [Details, setDetails] = useState('Write some details')


        useEffect(() => {
                axios.get(`/api/gigs/${props.match.params.id}`).then(res=>{setGig(res.data)
                        setOffer(props.match.params.offer)
                        if(props.match.params.offer === 'beginner')setOfferObject(res.data.beginner)
                        if(props.match.params.offer === 'standard')setOfferObject(res.data.standard)
                        if(props.match.params.offer === 'premium')setOfferObject(res.data.premium)
                })
            }, [])

        const handlePayment = () => {
                axios.post('/api/orders/orderplace' , {

                                gig : props.match.params.id ,
                                gigOwner : Gig.by,
                                placedBy : userInfo._id,
                                details : Details,

                                title: OfferObject.title ,
                                qty: Quantity ,
                                image: Gig.gigPics[0],
                                price: OfferObject.price ,
                                servicePrice: 10 ,
                                totalPrice: OfferObject.price * Quantity ,
                                isPaid: true ,
                                paidAt: Date.now(),

                        
                    } , { headers: { Authorization: `Bearer ${userInfo.token}`} }   )
                    .then(res => {if(res.data) {
                            
                        const notificationObject = {
                                type : 'New Gig Order' ,
                                byName : userInfo.userName ,
                                text : `A new order of amount $${ 0.8* OfferObject.price * Quantity } !`,
                                link : `/gig-orders` ,
                                }
                        axios.put(`/api/users/notification/${Gig.by}`, notificationObject , { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                        
                        history.push(`/gig-order/${res.data._id}`)
                                              


                    }}  )
        }




        const createOrder = (data, actions) =>{
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: OfferObject.price*Quantity ,
                      },
                    },
                  ],
                });
              };
            

        const onApprove = (data, actions) => {

                handlePayment()

                return actions.order.capture();
        };








        return (
        <div>
        {Gig && OfferObject && <>
        <Row>
        <Col md='8' >
        <div className='form' style={{maxWidth:'1000px'}} >
        <Row>
        
        <img src={Gig.gigPics[0]} style={{width:'200px'}} />
        <h1>{Gig.title}</h1>
        <h1>{Gig.description}</h1> 
        
        
        <span>{OfferObject.price}<input type='number' style={{width:'100px'}} onChange={(e)=>setQuantity(e.target.value)} min='1' max='10' />{' '}${OfferObject.price*Quantity}</span>
        <h2>{OfferObject.title}</h2>
        <h2>{OfferObject.desc}</h2>
        <hr/>
        <textarea onChange={(e)=>setDetails(e.target.value)} value={Details} />
        </Row>

        <div>
        
        </div>

        </div>
        </Col>
        
        <Col md='4' className='form' >
        <img src={Gig.gigPics[0]} style={{width:'200px'}} />
        <h1>{Gig.title}</h1>
        <h1>{Gig.description}</h1>
        <Row>
      <Col >
      
      <h1>{OfferObject.title}</h1>
      </Col>
      <Col>
      <h1><b>${OfferObject.price}</b></h1>
      </Col>
      <br></br>
      <br></br>
      <h4>{OfferObject.desc}</h4>
      
      <Col>
      <br></br>
      <h1>{OfferObject.delivery}{' DaysDelivery'} </h1>
      </Col>
      <Col>
      <br></br>
      <h1>{OfferObject.revisions}{' revisions'}</h1>
      </Col>

      
      

      </Row>

      <br></br>

      {OfferObject.offers.map(x=>

      <h2><CheckIcon style={{color:'green',fontSize:'20px',marginRight:'10px'}}/>{x}</h2>
      
      )}
      <div className='text-center' >

        <PayPalButton createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)} />  
 

      </div>
        </Col>
        </Row>
        </>}
           <br/><br/>             
        </div>
        )
}
