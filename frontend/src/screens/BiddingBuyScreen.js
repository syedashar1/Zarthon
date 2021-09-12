import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { Col, Container, Image, Row ,ProgressBar} from 'react-bootstrap';
import { useHistory , Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from "react-dom"
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { update, userDetails, userSuggest } from '../actions/userActions';


const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function BiddingBuyScreen(props) {

        const [Qty, setQty] = useState(10) 
        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const [Typee, setTypee] = useState(props.match.params.msg)
        const user = useSelector((state) => state.getDetails.user);

        const dispatch = useDispatch()
        const history = useHistory()



        useEffect(() => {
                 
        }, [])



        const createOrder = (data, actions) =>{
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: { value: Qty * 2 },
                    },
                  ],
                });
              };
            

        const onApprove = (data, actions) => {


                axios.put(`/api/users/buyconnects` ,
                { amount : Qty }, 
                { headers: { Authorization: `Bearer ${userInfo.token}`} } ).then(
                        
                       dispatch( userDetails() ) ,
                       history.push('/dashboard')
                )

                
                return actions.order.capture();
        };



        return (
                <div>
                <br/><br/>
                {Typee == 'notenough' && <div className='text-center' ><h1 style={{ fontSize:'30px' , color :'grey'  }} >Looks like you dont have Enough Connect Points</h1></div> }
                <br/><br/>

                {user && (user.proAccount || user.teachAccount) && <div className="form upgap" style={{width:'600px' , marginBottom:'60px' , minHeight:'260px'}} >
                        <div><div className='backtotopp text-center'>
                        <MonetizationOnIcon style={{color:'white', fontSize:'50px' , marginTop:'14px'}} fontSize="large" className="heart__icon" />
                        </div></div>
                        <div className="card-body" >
                        <h1><span style={{color:'grey'}} >1 Connect Point</span> {" : "}<span style={{fontSize:'40px'}} >{2}$</span></h1>
                        <h3><span style={{color:'grey'}} >You currently have</span> {" : "}{user.connects}{' points'} </h3>
                        <br/><div style={{height:'1px' , background:'grey'}} /><br/>
                        
                        <div className='text-center' >
                                <input min='1' max='9999' style={{width:'130px', fontSize:'30px' , color :'grey'  }} onChange={(e)=>setQty(e.target.value)} value={Qty} type='number'/>
                        <br/>
                        <h1 style={{ fontSize:'30px' , color :'grey'  }} >Total Amount : {' 2 x '}{Qty} {' = '} 
                        <b  style={{ fontSize:'40px' , color :'black'  }} >{Qty*2}$</b> </h1>
                        </div>

                        <br/>
                        
                        <PayPalButton createOrder={(data, actions) => createOrder(data, actions)}
                        onApprove={(data, actions) => onApprove(data, actions)} /> 


                        
                        <div>
                        </div></div>
                </div>}

                
                        
                </div>
        )
}
