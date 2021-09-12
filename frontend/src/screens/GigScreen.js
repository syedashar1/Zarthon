import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Col, Container, Image, Row , Carousel , Media} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Charts from '../components/Charts'
import LinesEllipsis from 'react-lines-ellipsis';
import { StickyContainer, Sticky } from 'react-sticky';

import IconButton from '@material-ui/core/IconButton';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

export default function GigScreen(props) {

    const [User, setUser] = useState(null)
    const [Gig, setGig] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.userSignin.userInfo);
    const [InQue, setInQue] = useState(0)
    const [InWorking, setInWorking] = useState(0)

    useEffect(() => {
        axios.get(`/api/gigs/${props.match.params.id}`).then(res=>{setGig(res.data)
            axios.get(`/api/users/single/${res.data.by}`).then(res2=>setUser(res2.data))

            axios.get(`/api/gigs/inque-and-working/${props.match.params.id}`)
            .then(res2=>{setInQue(res2.data.inQue) ; setInWorking(res2.data.inWorking) })
            

        })




    }, [])


    return (
        <div>{Gig && User && User._id && Gig._id && 
        <div>
        <StickyContainer>
        <Sticky>{({ style }) =>
        
        <div className='header' style={{ ...style , position:'sticky', backgroundColor:'aliceblue'}} >
        {userInfo && Gig && userInfo._id === Gig.by && 
        <h2><a href='#' onClick={()=>history.push(`/edit-gig/${props.match.params.id}`)} >Edit Your Gig</a></h2>}
        <h2><a href='#overview'>Overview</a></h2>
        <h2><a href='#seller'>About Seller</a></h2>
        <h2><a href='#chart'>Packages</a></h2>
        <h2><a href='#reviews'>Reviews</a></h2>
        </div>
        
        }</Sticky>
        </StickyContainer>
        
            

    <div className="container-fluid">
      <div className="row top">
        <div className="col-lg-7">
          <div className="content-section">
            <h1 style={{fontSize:'100px' , fontFamily:'Encode Sans SC'}} >{Gig.title}</h1>
          <h3  >by <Image src={User.profilePic} style={{width:'65px' , height:'65px' , borderRadius:'50%', cursor :'pointer',margin : '0px 15px ' }} alt='a pic' 
        onClick={ () => {history.push(`/user/${User._id}`)} }/><b>{User.name}</b></h3>
        
        <br/>
        <span style={{color:'grey',fontSize:'20px'}} > {Gig.finalRating}{' rating out of '} {Gig.jobDone} {' orders.'} </span>
        <span style={{color:'grey',fontSize:'25px'}} > {InQue} {' orders in Queue , '} {InWorking} {' orders in Working.'}  </span>
        <Carousel fade style={{maxWidth:'850px'}} id='overview'>
        {Gig.gigPics.map(x=> <Carousel.Item><img style={{height:'550px'}} className="d-block w-100" src={x} /></Carousel.Item>) }
        </Carousel>
        <br/><br/><br/>
        
        <p style={{fontSize:'50px' , fontFamily:'Encode Sans SC'}}>About the Gig</p>
        <div className='form'>
        <h2 style={{fontSize:'25px' ,color:'grey' , padding:'0px 10px'}} >{Gig.description}</h2>
        <br/><br/>
        <p style={{fontSize:'40px' , fontFamily:'Encode Sans SC'}}>Skills</p>
        <p>{Gig.tags.map(x=>
        <span style={{ display: 'inline-block' , fontSize:'30px' , background:'#a1c5ff',color:'white', borderRadius:'35px' ,padding:' 5px 15px',margin:'5px' }}>{x}</span>)}
        </p>
        </div>
        <br/><br/>
        <span style={{fontSize:'40px' , fontFamily:'Encode Sans SC' , background:'yellow'}}>{Gig.negotiable ? 'The prices are negotiable': 'The prices are fixed'}</span> 
        

        <br/><br/><br/>
        <p style={{fontSize:'50px' , fontFamily:'Encode Sans SC'}}>About the Seller</p>
        
        <div className='form'>
        <h1 id='seller' ><Image src={User.profilePic} style={{width:'150px' , height:'150px' , borderRadius:'50%', cursor :'pointer',margin : '0px 15px ' }} alt='a pic' 
        onClick={ () => {history.push(`/user/${User._id}`)} }/><b>{User.name}</b></h1>
        <Container>
            <Row>
            <Col>
            <p>From</p>
            <p><b>{Gig.country}</b></p>
            </Col>
            <Col>
            <p>Member Since</p>
            <p><b>{'19 July'}</b></p>
            </Col>
            </Row>
            <hr style={{width:'100%', height:'16px'}}/>
            <Row>
            <LinesEllipsis text={User.bio} maxLine='7' ellipsis='...' trimRight basedOn='letters' />
            </Row>
            <br/>
            <div className='row center'>
                <button style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white', border: '1px solid transparent' }}> 
                Contact Me</button>
            </div>
        </Container>


        </div>


        <br/><br/><br/>
        <p style={{fontSize:'50px' , fontFamily:'Encode Sans SC'}}>Packages</p>

        <Charts  beginner={Gig.beginner} standard={Gig.standard} premium={Gig.premium} id={props.match.params.id} />

        <br/><br/><br/>


            <div id='reviews'>
            <p style={{fontSize:'50px' , fontFamily:'Encode Sans SC'}}>Reviews</p>

            {Gig.reviews.map(x=> <h1>
        
        <Media  >
        <div className="mr-3" style={{width:'85px',height:'85px',borderRadius:'50%', overflow:'hidden' , cursor:'pointer',textAlign:'center'}} >
        <img src={x.pic} onClick={()=>history.push(`/user/${x.by}`)} style={{width:'100%'}} />
        </div>
        <Media.Body>
            <p style={{margin:'-10px 0px'}} > <b> {x.jobTitle} </b> </p>
            <h1 style={{color:'grey'}} >by {x.name}</h1>
            
            <p>
            {
            x.rating >= 5 ? <SentimentVerySatisfiedIcon style={{fontSize:'35px' }}/> :
            x.rating >= 4 ? <SentimentSatisfiedAltIcon style={{fontSize:'35px' }}/> : 
            x.rating >= 3 ? <SentimentSatisfiedIcon style={{fontSize:'35px' }}/> : 
            x.rating >= 2 ? <SentimentDissatisfiedIcon style={{fontSize:'35px' }} /> :
            <SentimentVeryDissatisfiedIcon style={{fontSize:'35px' }} />
            }
        


            <span style={{color:'grey',fontSize:'20px'}} > ({x.rating}/5) </span>
            
            </p>
            <p>
            {x.review}
            </p>
            </Media.Body>
            </Media>
            <hr style={{height:'13px'}}/>
            </h1> ) }


            </div>

          </div>




        </div>
        <div className="col-lg-5">
          <div className="sidebar-section">
            <div className="sidebar-item">
              <div className="sidebar-content">
              <Charts  beginner={Gig.beginner} standard={Gig.standard} premium={Gig.premium} mw={'450px'} id={props.match.params.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


        



            
        </div>}



            
        </div>
    )
}
