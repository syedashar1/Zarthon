import React, { Component, useState } from 'react'
import { Col, Row , Container } from 'react-bootstrap'
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import ChatApp from '../chat/components/ChatApp';
import Typical from 'react-typical'
import { useHistory } from 'react-router'
import axios from 'axios';
import GigsSuggestions from '../components/GigsSuggestions'
import DashboardScreen from './DashboardScreen';
import a from './pro.mp4'
import b from './gig.mp4'
import c from './teach.mp4'

export default function Home() {


        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const history = useHistory()
        const [Gigs, setGigs] = useState(null)



        return (
                <div>

                {userInfo && userInfo._id && <ChatApp show={true} />}
                {!userInfo ? <Container style={{maxWidth : '1500px'}}  >
                        <Row>
                        <Col md={'5'} >
                        <h1 style={{fontSize:'105px' , color:'green' }} className='tasd' >Join the office of the Global Workforce.</h1>
                        <h1 style={{fontSize:'40px' , color:'grey' , fontWeight:'bold' }}>Perfect place to hire 

                        <Typical style={{color:'black'}} steps={['Gig Workers.', 1000, 'Professionals.', 1000 , 'Online Teachers.' , 1000 ]} loop={Infinity} wrapper="p" />

                        </h1>
                        
                        <Button onClick={()=>history.push('/register')} variant="contained" size='large' style={{backgroundColor:'rgb(156,189,221)' ,color:'white' , margin:'20px'  }} ><h1 style={{fontSize:'30px'}} >Join Now!</h1></Button>
                        <Button onClick={()=>history.push('/signin')} variant="contained" size='large' style={{backgroundColor:'white' , border:'1px solid rgb(156,189,221)' ,color:'rgb(156,189,221)' , margin:'20px' }}  ><h1 style={{fontSize:'30px'}}>Sign In</h1></Button>
                        
                        </Col>
                        <Col md={'7'} >
                        <div style={{height:'620px' , width:'100%' , backgroundSize:'cover' ,backgroundPosition:'center'
                        , backgroundImage:'url(https://image.freepik.com/free-vector/colleagues-working-together-project_74855-6308.jpg)' }} >
                        </div>
                        {/* https://image.freepik.com/free-vector/colleagues-working-together-project_74855-6308.jpg */}
                        {/* https://img.freepik.com/free-vector/modern-business-team-working-open-office-space_74855-5541.jpg?size=626&ext=jpg */}
                        </Col>
                        </Row>

                        
                        <Row >
                        <h2 className='lineword' ><span> Gig Workers </span></h2>
                        <Col md={'6'} className='text-center' >
                        <p style={{fontSize:'40px' , color:'grey' , fontWeight:'bolder' }} > 
                        Hire the best Gig workers there are on our platform for small jobs and outsourcing different task !  </p>
                        
                        <Button onClick={()=>history.push('/explore-gig/title/all/tags/all/min/0/max/0/delivery/0/country/all/language/all/sort/rating/pageNumber/1')} 
                        variant="contained" size='large' style={{backgroundColor:'rgb(156,189,221)' ,color:'white' , margin:'20px' }} ><h1>Explore Gigs</h1></Button>
                        <Button onClick={()=>history.push('/register')} variant="contained" size='large' style={{backgroundColor:'white' , border:'1px solid rgb(156,189,221)' ,color:'rgb(156,189,221)' , margin:'20px' }} ><h1>Create Gigs</h1></Button>
                        
                        

                        
                        </Col>
                        <Col md={'6'} className='text-center' >
                        <video style={{width:'750px'}} playsInline autoPlay muted loop id="bgvid2">
                        <source src={b} type="video/mp4" />
                        </video>
                        {/* <div style={{height:'700px' , width:'100%' , backgroundSize:'cover' ,backgroundPosition:'center'
                        , backgroundImage:'url(https://www.westend61.de/images/0001508699pw/young-man-with-laptop-writing-in-book-while-sitting-on-sofa-at-cafe-EGAF01445.jpg)' }} >
                        </div> */}
                        
                        </Col>

                        <Col md={'12'} >
                        <GigsSuggestions/>
                        </Col>

                        <h2 className='lineword' ><span> Zarthon Professionals </span></h2>
                        <Col md={'6'} >
                        <video style={{width:'750px'}} playsInline autoPlay muted loop id="bgvid2">
                        <source src={a} type="video/mp4" />
                        </video>
                        
                        </Col>
                        <Col md={'6'} className='text-center' >
                        <p style={{fontSize:'40px' , color:'grey' , fontWeight:'bolder' , padding:'10px'  }} > 
                        Hire the best Gig workers there are on our platform for small jobs and outsourcing different task !  </p>
                        <Button onClick={()=>history.push('/explore-pro/title/all/tags/all/min/0/max/0/successRatio/0/earned/0/country/all/language/all/sort/rating/pageNumber/1')} variant="contained" size='large' style={{backgroundColor:'rgb(156,189,221)' ,color:'white' , margin:'20px' }} ><h1>Explore Professionals</h1></Button>
                        <Button onClick={()=>history.push('/joinAsProWorker')} variant="contained" size='large' style={{backgroundColor:'white' , border:'1px solid rgb(156,189,221)' ,color:'rgb(156,189,221)' , margin:'20px' }} ><h1>Join as Professional</h1></Button>
                        </Col>
                        
                        


                        <h2 className='lineword' ><span> Zarthon Teachers </span></h2>
                        <Col md={'6'} className='text-center' >
                        
                        <p style={{fontSize:'40px' , color:'grey' , fontWeight:'bolder' }} > 
                        Hire the best Gig workers there are on our platform for small jobs and outsourcing different task !  </p>
                        <Button onClick={()=>history.push('/explore-teacher/title/all/tags/all/min/0/max/0/successRatio/0/earned/0/country/all/language/all/sort/rating/pageNumber/1')} variant="contained" size='large' style={{backgroundColor:'rgb(156,189,221)' ,color:'white' , margin:'20px' }} ><h1>Explore Teachers</h1></Button>
                        <Button onClick={()=>history.push('/joinAsTeacher')} variant="contained" size='large' style={{backgroundColor:'white' , border:'1px solid rgb(156,189,221)' ,color:'rgb(156,189,221)' , margin:'20px' }} ><h1>Join as Teacher</h1></Button>
                        </Col>
                        <Col md={'6'} >
                        <video style={{width:'750px'}} playsInline autoPlay muted loop id="bgvid2">
                        <source src={c} type="video/mp4" />
                        </video>
                        
                        </Col>



                        </Row>



                        </Container> : 
                        
                        <DashboardScreen/>

                        }

                        
                </div>
        )
}

