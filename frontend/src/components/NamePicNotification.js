import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Fade from 'react-reveal/Fade';
import { Container, Image, Row } from 'react-bootstrap';
import Modal from "react-modal"
import SinglePost from './SinglePost';
import { Media } from 'react-bootstrap';

export default function NamePicNotification({type , by , post , comment , id }) {



        const [state ,setState ] = useState({})
        const [state2 ,setState2 ] = useState({})
        const [loading, setloading] = useState(false)
        const [loading2, setloading2] = useState(false)
        const [showModal, setShowModal] = useState(false)
        const history = useHistory()


        useEffect(() => {
                
                setloading(true)
                axios.get(`/api/users/single/${by}`)
                .then(res => {
                        setState(res.data);
                        setloading(false)
                })


                setloading2(true)
                axios.get(`/api/newsfeed/getpost/${id}/${post}`)
                .then(res => {
                        setState2(res.data);
                        setloading2(false)
                } )

                

        }, [ ]);


        // <br></br><br></br>
        // <img style={{height:'100px',width:'100px',borderRadius:'50%'}} src={state.profilePic} />
        // <p onClick={ () => {history.push(`/user/${by}`)} } >{state.name}</p>

        // {type === 'like' && <p>Liked Your Post</p> }
        

        return (
                <Container>
                        {!loading && state !== {} && state2 && state2.post && 
                        
                        <Row>
                        <Media>
                        <div className="mr-3" style={{width:'65px',height:'65px',borderRadius:'50%', overflow:'hidden' , cursor:'pointer',textAlign:'center'}} >
                        <img src={state.profilePic} onClick={()=>history.push(`/user/${id}`)} style={{width:'100%'}} />
                        </div>
                        <Media.Body>
                          <h1>{state.name}</h1>
                          <p>
                          {type === 'like' && <p>Liked Your Post</p> }
                          {type === 'comment' && <div> <p>Commented on Your Post : <b>{comment && comment}</b> </p> </div>}
                          </p>
                        </Media.Body>
                      </Media>
                        
                        <div style={{width:'300px' ,height:'200px' , overflow : 'hidden',textAlign:'center' }} onClick={()=>setShowModal(true)} >
                        <Image src={state2.post.pic} alt='a pic' ></Image>
                        
                        </div>
                        
                        </Row>
                        
                        }
                        { loading || loading2 && <div className="text-center">
                                <div className="lds-dual-ring"/>
                        </div> }

                        { showModal && 
                                <Modal 
                                style={{
                                        content: {
                                          margin: 'auto',
                                          border: '1px solid #ccc',
                                          borderRadius: '0px',
                                          padding: '0px',
                                          maxWidth:'1140px',
                                        }}}
                                
                                isOpen ={true} onRequestClose = { ()=>setShowModal(false) } >
                                
                                <Container style={{padding:'0px'}}>
                                <SinglePost id={id} postid={post}  inModal={true} />
                                </Container>

                                </Modal>
                        }
                        

                        {!loading && state !== {} && state2 && state2.post && 
                        <hr/>
                        }
                        
                </Container>
        )
}

