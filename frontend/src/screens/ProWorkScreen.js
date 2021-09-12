import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Col, Container, Image, Row , Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Modal from "react-modal"
import Zoom from "react-reveal/Zoom"
import IconButton from '@material-ui/core/IconButton';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';


export default function ProWorkScreen(props) {
    const [User, setUser] = useState(null)
    const [pro, setPro] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()
    const [Fav, setFav] = useState(false)

    const [Message, setMessage] = useState('')
    const [openModal, setopenModal] = useState(false)

    const userInfo = useSelector((state) => state.userSignin.userInfo);
    const user = useSelector((state) => state.getDetails.user);


    useEffect(() => {
        axios.get(`/api/professionals/${props.match.params.id}`).then(res=>{
            setPro(res.data)
            axios.get(`/api/users/single/${res.data.by}`).then(res2=>setUser(res2.data))

        })
        // axios.get(`/api/users/single/${pro.by}`).then(res=>setUser(res.data))

    }, [])

    const submitHandler = (e) => {
        e.preventDefault()
        axios.put(`/api/chat/singletext/${userInfo._id}`, {text : Message , recipients: [pro.by] }  );
        setopenModal(false)
    }

    const favHandler = ( ) => {
        if (user){
            setFav(true)
            axios.put(`/api/professionals/addfav/${pro._id}` , { } , { headers: { Authorization: `Bearer ${userInfo.token}`} }   )

        }

    }


    return (
        <div>
        {User && pro && pro._id && <Container style={{marginTop:'30px' , border:' 1px solid rgba(0,0,0,.125)'}}>


        <Row>
        <Col lg={2} md={2} ><Image src={User.profilePic} style={{width:'175px' , height:'175px' , borderRadius:'50%', cursor :'pointer',margin : '10px' }} alt='a pic' 
        onClick={ () => {history.push(`/user/${User._id}`)} }/></Col>
        <Col lg={3} md={2}>
        <p style={{marginBottom:'5px',color:'green',fontSize:'40px'}} >{User.name}</p>
        <p style={{marginBottom:'5px',fontSize:'12px'}}><i>{'Pakistan'}</i></p>
        </Col>

        <Col lg={3} md={8} >
        <p>{'Job Success '+ Number( (pro.appliedSuccess/pro.totalApplied).toFixed(2) * 100 ) }%</p>
        <div className='progress-barsub'>
        <motion.div className="progress-bar" initial={{ width: 0 }} 
        animate={{ width: (pro.appliedSuccess/pro.totalApplied)*100 + '%' }}/>
        </div>
        </Col>

        <Col lg={4} md={8} style={{textAlign:'center'}}>
        {pro.by !== userInfo._id ?

        <button style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
        border: '1px solid transparent' }} onClick={()=>setopenModal(true)}>Contact</button> 
        
        : <button onClick={()=>history.push(`/proworker-update/${pro._id}`)} style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
                        border: '1px solid transparent' }} >Update</button> }{' '}
        
        {pro.portfolio && <button style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
                        border: '1px solid transparent' }} >
                            <a style={{color:'white'}} href={pro.portfolio}  target="_blank">Portfolio</a></button>}
        <br/>

        <button 
        onClick={favHandler}
        style={{height :'55px' , marginTop:'10px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
                        border: '1px solid transparent' }} >{user && user.proFav.includes(pro._id) || Fav ? 'Added to Favourite' : 'Add to Favourite' }</button> 

        </Col>

        </Row>

        <hr style={{height:'13px'}}/>




        <div className='text-center'>

        
        <h1 style={{fontSize:'50px' , fontFamily:'Encode Sans SC'}}>{pro.title}</h1>        
        <h1 style={{fontSize:'30px' , fontFamily:'Encode Sans SC'}} >${pro.budget}/hr {' ' + pro.negotiate ? '(negotiable)' :'(fixed)' } </h1>        
        <h1>{pro.description}</h1>

        <hr style={{height:'13px'}}/>

        <h1 style={{fontSize:'30px' , fontFamily:'Encode Sans SC'}} > Skill Set </h1>        
        {pro.tags.map(x=><span style={{display:'inline-block' ,background:'#a1c5ff',color:'white', borderRadius:'20px' ,padding:'5px',margin:'10px' }}>
        {x}</span>)}


        <h1>Avaliable Hours Per Week : {' '}{pro.avaliableHours}hrs</h1>  

        <hr style={{height:'13px'}}/>

        <h1>Prefered Languages {' '}{pro.languages.map(x=><span>{x}{' '}</span>)}</h1>   

        <div style={{textAlign:'left'}}>
        
        <h1 style={{fontSize:'30px' , fontFamily:'Encode Sans SC'}} > Work History </h1>        
        <hr style={{height:'13px'}}/>
        <h1> {'Worked for '} {pro.jobsAt.length} {' Jobs on Zarthon'} </h1>
        {pro.reviews.map(x=> <h1>
        
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
        </Container>

        }

{openModal && User && (
                <Modal isOpen ={true} onRequestClose = { ()=>setopenModal(false) }
                style={{content: { margin: 'auto',  border: '1px solid #ccc', borderRadius: '0px', padding: '10px',maxWidth:'860px',maxHeight:'530px',}}}>
                        
                        <Zoom>
                        <hr/>
                        <form className="form upgap text-center" onSubmit={submitHandler} >
                        <textarea id="description" rows="5" cols="50" type="text" required="true"
                        placeholder={`Send a message to ${User.name}`} onChange={(e) => setMessage(e.target.value) }
                        ></textarea>
                        <button>send</button>
                        </form>


                        </Zoom>

                </Modal>
                )}
        <br/><br/>
        
        </div>
    )
}
