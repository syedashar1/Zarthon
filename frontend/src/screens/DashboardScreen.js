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

import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { motion } from 'framer-motion';

export default function DashboardScreen() {

        const dispatch = useDispatch()
        const history = useHistory()

        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const user = useSelector((state) => state.getDetails.user);

        const [Gigs, setGigs] = useState(null)
        const [Pro, setPro] = useState(null)
        const [Teach, setTeach] = useState(null)
        const [GigsEarned, setGigsEarned] = useState(0)
        const [PayPalDiv, setPayPalDiv] = useState(false)
        const [BankDiv, setBankDiv] = useState(false)
        const [WithdrawAmount, setWithdrawAmount] = useState(50)
        const [Email, setEmail] = useState(null)
        const [Name, setName] = useState(null)

        const [IBAN1, setIBAN1] = useState(null)
        const [IBAN2, setIBAN2] = useState(null)
        const [IBAN3, setIBAN3] = useState(null)
        const [IBAN4, setIBAN4] = useState(null)
        const [IBAN, setIBAN] = useState(null)
        const [Invalid, setInvalid] = useState(false)
        const [NewlyWithdrawn, setNewlyWithdrawn] = useState(0)
        const [openModal, setopenModal] = useState(false)
        const [PendingRefund, setPendingRefund] = useState(0)


        useEffect(() => {

            if (!userInfo) {
                    history.push('/signin')
            }
            
            dispatch( userDetails() ) 

            axios.get(`/api/professionals/user/${userInfo._id}` ,  { headers: { Authorization: `Bearer ${userInfo.token}`} }  )
            .then(res => { if(res.data){ setPro(res.data) }})

            axios.get(`/api/teachers/user/${userInfo._id}` ,  { headers: { Authorization: `Bearer ${userInfo.token}`} }  )
            .then(res => { if(res.data){ setTeach(res.data) }})


            axios.get(`/api/gigs/user/${userInfo._id}`)
            .then(res => { setGigs(res.data.gigs) ; setGigsEarned(res.data.totalEarned)})

            setEmail(userInfo.email)

            axios.get(`/api/orders/my-pending-refunds-amount` ,  { headers: { Authorization: `Bearer ${userInfo.token}`} }  )
            .then(res => { if(res.data){ setPendingRefund(res.data) }})


    }, [userInfo])

    useEffect(() => {
        
        setInvalid(false)
        for (let i = 0; IBAN1 && i < IBAN1.length; i++) {
                if (/^[a-zA-Z]+$/.test(IBAN1[i])) setInvalid(true)
        }
        for (let i = 0; IBAN2 && i < IBAN2.length; i++) {
                if (/^[a-zA-Z]+$/.test(IBAN2[i])) setInvalid(true)
        }
        for (let i = 0; IBAN3 && i < IBAN3.length; i++) {
                if (/^[a-zA-Z]+$/.test(IBAN3[i])) setInvalid(true)
        }
        for (let i = 0; IBAN4 && i < IBAN4.length; i++) {
                if (/^[a-zA-Z]+$/.test(IBAN4[i])) setInvalid(true)
        }

        setIBAN(IBAN1 + '-' + IBAN2 + '-' + IBAN3 + '-' + IBAN4) 

        
        
    }, [IBAN1 , IBAN2 , IBAN3 , IBAN4])

    const withdrawHandlerPaypal = () => {
        
        if(PendingRefund !== 0 ) { alert('You can not withdraw unless you pay your pending clearances') ; return }
        if(user && user.netIncome - user.withdrawn - NewlyWithdrawn < 50 ){ alert('with above 50$ only') ; return ;}
        
        if( !Name || WithdrawAmount < 50 || !Email || !window.confirm(`Are your sure you want to withdraw $ ${WithdrawAmount} to your PayPal account with Email : ${Email} ?` )) return ;
        axios.post(`/api/withdraw` , {
                amount : WithdrawAmount ,
                type :'PayPal' ,
                email : Email ,
                name : Name,
        } , { headers: { Authorization: `Bearer ${userInfo.token}`} } ).then(res=>{if(res.data){
                console.log(res.data);
                setNewlyWithdrawn(res.data.amount)
                setopenModal(true)
                
        }})


    }



    const withdrawHandlerBank = () => {

        if(user && user.netIncome - user.withdrawn - NewlyWithdrawn < 50 ){ alert('with above 50$ only') ; return ;}
        
        if(Invalid) {alert('You have invalid IBAN number') ; return }
        if(!Name || WithdrawAmount < 50 || !IBAN || !window.confirm(`Are your sure you want to withdraw $ ${WithdrawAmount} to your Bank account with IBAN : ${IBAN} and NAME : ${Name} ?` )) return ;
        axios.post(`/api/withdraw` , {
                amount : WithdrawAmount ,
                type :'Bank Transfer' ,
                iban : IBAN ,
                name : Name,
        } , { headers: { Authorization: `Bearer ${userInfo.token}`} } ).then(res=>{if(res.data){
                console.log(res.data);
                setNewlyWithdrawn(res.data.amount)
                setopenModal(true)
        }})


    }






    return (
        <Container >
        <h1 style={{fontSize:'50px',color:'gray'}} >Earnings</h1>

        {user && <Row className='text-center' style={{marginBottom:'60px',border:'1px solid lightgrey'}} >
        <Col style={{border:'1px solid lightgrey' , paddingTop:'20px'}} ><p style={{color:'grey',fontSize:'20px'}} > Net Income </p><h1 style={{fontSize:'50px'}} > ${(user.netIncome).toFixed(2)} </h1></Col>
        <Col style={{border:'1px solid lightgrey', paddingTop:'20px'}} ><p style={{color:'grey',fontSize:'20px'}} > Withdrawn </p><h1 style={{fontSize:'50px'}} > ${user.withdrawn + NewlyWithdrawn } </h1></Col>
        <Col style={{border:'1px solid lightgrey', paddingTop:'20px'}} ><p style={{color:'grey',fontSize:'20px'}} > Payment Made </p><h1 style={{fontSize:'50px'}} > ${user.usedForPurchases} </h1></Col>
        <Col style={{border:'1px solid lightgrey', paddingTop:'20px'}} ><p style={{color:'grey',fontSize:'20px'}} > Pending Clearances </p><h1 style={{fontSize:'50px'}} > ${user.pendingClearance + PendingRefund.amount } </h1></Col>
        <Col style={{border:'1px solid lightgrey', paddingTop:'20px'}} ><p style={{color:'grey',fontSize:'20px'}} > Avaliable </p><h1 style={{fontSize:'50px'}} > ${(user.avaliableForWithdrawal - NewlyWithdrawn - user.pendingClearance - PendingRefund.amount).toFixed(2) } </h1></Col>
        </Row>}


        <div>

        {PendingRefund && PendingRefund.amount !== 0 && <div className='my-5' > <Link to={'/payrefunds'} >Pay Refunds</Link></div>}

        <span style={{fontSize:'30px',color:'gray'}} >Withdraw</span> 
        <button onClick={()=>{setPayPalDiv(true) ; setBankDiv(false)}} className='mx-5 button'> <img style={{height:'40px',width:'40px'}} src='https://www.pngall.com/wp-content/uploads/5/PayPal-Logo-Transparent.png' ></img> PayPal Account</button>
        <button onClick={()=>{setBankDiv(true) ; setPayPalDiv(false)} } ><img style={{height:'40px',width:'140px'}} src='https://costaricalaw.com/wp-content/uploads/2015/11/iban-logo1.png'></img>{' '}Bank Transfer</button>
        </div>

        {PayPalDiv && user && <div style={{backgroundColor:'#f5fbff', padding:'20px'}}>
        <span style={{fontSize:'30px',color:'gray' , textAlign:'center'}} >Withdraw to PayPal Account</span> 
        <div> set the amount you want to withdraw  </div>
        <p><input type='number' min='50' style={{fontSize:'30px' , width:'130px'}} max={user.avaliableForWithdrawal} onChange={(e)=>setWithdrawAmount(e.target.value)} value={WithdrawAmount} /></p>        
        
        <p>Enter your PayPal Full Name </p>
        <p> <input type='text' value={Name} style={{fontSize:'30px' , color:'gray' , width:'400px'}} onChange={(e)=>setName(e.target.value)} /> </p>
        <p>Confirm Your PayPal Email ID</p>
        <p> <input type='email' style={{fontSize:'30px' , color:'gray' , width:'400px'}} value={Email} onChange={(e)=>setEmail(e.target.value)} /> </p>
        <Button onClick={withdrawHandlerPaypal} variant="contained" size='large' style={{backgroundColor:'green' ,color:'white'}} ><h3>Withdraw {' '} {WithdrawAmount}$</h3></Button>
        </div>}


        {BankDiv && user && <div style={{backgroundColor:'#f5fbff' , padding:'20px' }}>
        <p style={{fontSize:'30px',color:'gray' , textAlign:'center'}} >Withdraw to Bank Account</p><br/>
        <div> set the amount you want to withdraw  </div>
        <p><input type='number' style={{fontSize:'30px' , width:'130px'}} min='50' max={user.avaliableForWithdrawal} onChange={(e)=>setWithdrawAmount(e.target.value)} value={WithdrawAmount} /></p>        
        <p>Enter your Full Name (as Bank Account) </p>
        <p> <input type='text' value={Name} style={{fontSize:'30px' , color:'gray' , width:'400px'}} onChange={(e)=>setName(e.target.value)} /> </p>
        <p>Enter your IBAN number </p>
        <p> 

                <input type='text' maxLength='4' style={{fontSize:'30px' , color:'gray' , width:'100px'}} value={IBAN1} onChange={(e)=>setIBAN1(e.target.value)}  /> {' '}
                <input type='text' maxLength='4' style={{fontSize:'30px' , color:'gray' , width:'100px'}} value={IBAN2} onChange={(e)=>setIBAN2(e.target.value)}  />{' '}
                <input type='text' maxLength='4' style={{fontSize:'30px' , color:'gray' , width:'100px'}} value={IBAN3} onChange={(e)=>setIBAN3(e.target.value)}  /> {' '}
                <input type='text' maxLength='4' style={{fontSize:'30px' , color:'gray' , width:'100px'}} value={IBAN4} onChange={(e)=>setIBAN4(e.target.value)}  /> 
        </p>
        {Invalid && <p style={{color:'red'}} >Invalid IBAN</p>}
        <Button onClick={withdrawHandlerBank} variant="contained" size='large' style={{backgroundColor:'green' ,color:'white'}} ><h3>Withdraw {' '} {WithdrawAmount}$</h3></Button>
        </div>}

        
        <div style={{maxHeight:'600px' , overflow:'visible' , marginTop:'20px' }} >
        <Table striped bordered hover size="sm">
        <thead>
        <tr>
        <th>Date</th>
        <th>Type</th>
        <th>Detail of transaction </th>
        <th>Amount</th>
        </tr>
        </thead>
        <tbody>
        {user && user.transactions.map(x => 
        
        <tr>
        <td>{x.date.split('T')[0].split('-').reverse().join('-')}</td>
        <td style={{backgroundColor:'aliceblue'}}>{x.type}</td>
        <td>{x.detail}</td>
        <td style={{color:'green',fontWeight:'bold'}} >${x.amount}</td>
        </tr>


        )  }
        </tbody>
        </Table>
        </div>


        {user &&  <div className="row center top">
            



        {(user.proAccount || user.teachAccount) && <div className="form upgap" style={{width:'600px' , marginBottom:'60px' , minHeight:'260px'}} >
                        <div><div className='backtotopp text-center'>
                        <MonetizationOnIcon style={{color:'white', fontSize:'50px' , marginTop:'14px'}} fontSize="large" className="heart__icon" />
                        </div></div>
                        <div className="card-body" >
                        <h1><span style={{color:'grey'}} >Bidding Credit</span> {" : "}<span style={{fontSize:'40px'}} >{user.connects}$</span></h1>
                        <div style={{height:'1px' , background:'grey'}} /><br/>
                        <Link to={'/buy-connects/0'} >Buy Bidding Credit</Link>

                        
                        <div>
                        </div></div>
        </div>}


        {Gigs && <div className="form upgap" style={{width:'400px', marginBottom:'60px'}} >
                <div><div className='backtotopp text-center sdfsdf'>
                <LaptopChromebookIcon style={{color:'white', fontSize:'50px' , marginTop:'14px'}} fontSize="large" className="heart__icon" />
                </div></div>
                <div className="card-body" >
                <h1><span style={{color:'grey'}} >Total No of Gigs</span> {" : "}<span style={{fontSize:'40px'}} >{Gigs.length}</span></h1>
                <h1><span style={{color:'grey'}} >Gigs Earnings</span> {" : "}<span style={{fontSize:'40px'}} >{GigsEarned}$</span></h1>
                <div>
                </div></div>
        </div>}



        
        {Pro && <div className="form upgap" style={{width:'300px' , marginBottom:'60px'}} >
                <div><div className='backtotopp text-center'>
                <WorkIcon style={{color:'white', fontSize:'50px' , marginTop:'14px'}} fontSize="large" className="heart__icon" />
                </div></div>
                <div className="card-body" >
                <h1><span style={{color:'grey'}} >Jobs Applied</span> {" : "}{Pro.totalApplied} </h1>
                <h1><span style={{color:'grey'}} >Jobs Success</span> {" : "}{Pro.appliedSuccess} </h1>
                <h1><span style={{color:'grey'}} >Success </span>{' : '+ Number( (Pro.appliedSuccess/Pro.totalApplied).toFixed(2) * 100 ) }%</h1>
                <div className='progress-barsub'>
                <motion.div className="progress-bar" initial={{ width: 0 }} 
                animate={{ width: (Pro.appliedSuccess/Pro.totalApplied)*100 + '%' }}/>
                </div>
                <div>
                </div></div>
        </div>}


        {Pro && <div className="form upgap" style={{width:'300px', marginBottom:'60px'}} >
                <div><div className='backtotopp text-center'>
                <WorkIcon style={{color:'white', fontSize:'50px' , marginTop:'14px'}} fontSize="large" className="heart__icon" />
                </div></div>
                <div className="card-body" >
                <h1><span style={{color:'grey'}} >Current Jobs</span> {" : "}{Pro.jobsAt.length} </h1>
                <div style={{height:'1px' , background:'grey'}} /><br/>
                <Link to={'/my-jobs'} >See jobs</Link>
                <div>
                </div></div>
        </div>}


        {Pro && <div className="form upgap" style={{width:'300px', marginBottom:'60px'}} >
                <div><div className='backtotopp text-center'>
                <WorkIcon style={{color:'white', fontSize:'50px' , marginTop:'14px'}} fontSize="large" className="heart__icon" />
                </div></div>
                <div className="card-body" >
                <h1><span style={{color:'grey'}} >Total Earned</span> {" : "}<span style={{fontSize:'40px'}} >{Pro.earned}$</span></h1>
                {Pro.lastPay && <h1><span style={{color:'grey'}} >Last Paid At : </span> {" : "}{Pro.lastPay.split('T')[0].split('-').reverse().join('-')} </h1>}
                <div>
                </div></div>
        </div>}


        {Teach && <div className="form upgap" style={{width:'300px' , marginBottom:'60px'}} >
                <div><div className='backtotopp text-center tbtp'>
                <SchoolIcon style={{color:'white', fontSize:'50px' , marginTop:'14px'}} fontSize="large" className="heart__icon" />
                </div></div>
                <div className="card-body" >
                <h1><span style={{color:'grey'}} >Jobs Applied</span> {" : "}{Teach.totalApplied} </h1>
                <h1><span style={{color:'grey'}} >Jobs Success</span> {" : "}{Teach.appliedSuccess} </h1>
                <h1><span style={{color:'grey'}} >Success </span>{' : '+ Number( (Teach.appliedSuccess/Teach.totalApplied).toFixed(2) * 100 ) }%</h1>
                <div className='progress-barsub'>
                <motion.div className="progress-bar" initial={{ width: 0 }} 
                animate={{ width: (Teach.appliedSuccess/Teach.totalApplied)*100 + '%' }}/>
                </div>
                <div>
                </div></div>
        </div>}


        {Teach && <div className="form upgap" style={{width:'300px', marginBottom:'60px'}} >
                <div><div className='backtotopp text-center tbtp'>
                <SchoolIcon style={{color:'white', fontSize:'50px' , marginTop:'14px'}} fontSize="large" className="heart__icon" />
                </div></div>
                <div className="card-body" >
                <h1><span style={{color:'grey'}} >Current Jobs</span> {" : "}{Teach.jobsAt.length} </h1>
                <div style={{height:'1px' , background:'grey'}} /><br/>
                <Link to={'/my-jobs-teacher'} >See jobs</Link>
                <div>
                </div></div>
        </div>}


        {Teach && <div className="form upgap" style={{width:'300px', marginBottom:'60px'}} >
                <div><div className='backtotopp text-center tbtp'>
                <SchoolIcon style={{color:'white', fontSize:'50px' , marginTop:'14px'}} fontSize="large" className="heart__icon" />
                </div></div>
                <div className="card-body" >
                <h1><span style={{color:'grey'}} >Total Earned</span> {" : "}<span style={{fontSize:'40px'}} >{Teach.earned}$</span></h1>
                {Teach.lastPay && <h1><span style={{color:'grey'}} >Last Paid At : </span> {" : "}{Teach.lastPay.split('T')[0].split('-').reverse().join('-')} </h1>}
                <div>
                </div></div>
        </div>}


        
        
            
            
            
            </div>}


            {openModal && user && (
                <Modal isOpen ={true} onRequestClose = { ()=>setopenModal(false) }
                style={{content: { margin: 'auto',  border: '4px solid #ccc', borderRadius: '10px', padding: '10px',maxWidth:'860px',maxHeight:'530px',textAlign:'center'}}}>
                        
                        <Zoom>
                        
                        <h1 style={{color:'green',fontSize:'50px',marginTop:'130px'}}>${NewlyWithdrawn} are on their way! </h1>
                        <h1 style={{color:'grey',fontSize:'20px'}}>Funds should land in your account within 10 business days. </h1>

                        <Button onClick={()=>setopenModal(false)} variant="contained" size='large' style={{backgroundColor:'green' ,color:'white',marginTop:'60px'}} ><h3>Cool !</h3></Button>
                        
                        </Zoom>

                </Modal>
                )}
            
        </Container>
    )
}
