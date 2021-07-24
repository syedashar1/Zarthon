import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TeachWorkScreen(props) {
    const [User, setUser] = useState(null)
    const [pro, setPro] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.userSignin.userInfo);

    useEffect(() => {
        axios.get(`/api/teachers/${props.match.params.id}`).then(res=>{
            setPro(res.data)
            axios.get(`/api/users/single/${res.data.by}`).then(res2=>setUser(res2.data))
        })
        // axios.get(`/api/users/single/${pro.by}`).then(res=>setUser(res.data))

    }, [])


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
        <p>{'Job Success '+ pro.appliedSuccess}%</p>
        <div className='progress-barsub'>
        <motion.div className="progress-bar" initial={{ width: 0 }} animate={{ width: 66 + '%' }}/>
        </div>
        </Col>

        <Col lg={4} md={8} style={{textAlign:'right'}}>
        {pro.by !== userInfo._id ? <button style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
                        border: '1px solid transparent' }} >Contact</button> 
        
        : <button onClick={()=>history.push(`/teacher-update/${pro._id}`)} style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
                        border: '1px solid transparent' }} >Update</button> }{' '}
        
        {pro.portfolio && <button style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
                        border: '1px solid transparent' }} >
                            <a style={{color:'white'}} href={pro.portfolio}  target="_blank">Portfolio</a></button>}
        
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

        <h1 style={{fontSize:'30px' , fontFamily:'Encode Sans SC'}} > Work History </h1>        
        <hr style={{height:'13px'}}/>

        {/* <iframe width="100%" height="400px" src="https://www.youtube.com/embed/0XElmYomloA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
        <hr style={{height:'13px'}}/>
        <h1 style={{fontSize:'30px' , fontFamily:'Encode Sans SC'}} >Reference Videos</h1> 
        {pro.videos.map(x => <div>
                        <h1>{x.title}</h1>
                        <iframe width="100%" height="400px" src={`https://www.youtube.com/embed/${x.video}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <h4>{x.description}</h4>
                </div> )}

        </div>
        </Container>

        }

        <br/><br/><br/>
        
        </div>
    )
}
