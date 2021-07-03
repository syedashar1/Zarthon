import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import NamePic from './NamePic';
import { useDispatch, useSelector } from 'react-redux';
import { getLikes, like , comment, editCaption, deletePost } from '../actions/likeCommenentActions';
import Modal from "react-modal"
import { useSocket } from '../chat/contexts/SocketProvider';
import { window } from 'globalthis/implementation';
import { motion } from 'framer-motion';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Bounce from 'react-reveal/Bounce';
import Jump from 'react-reveal/Jump';

export default function SinglePost({ id , postid , inModal }) {



        const [state ,setState ] = useState({})
        const [likedPosts, setlikedPosts] = useState([])
        const [loading, setloading] = useState(false)
        const [likeModal, setlikeModal] = useState(false)
        const [commentedPosts, setcommentedPosts] = useState([])
        const [ShowEditField, setShowEditField] = useState(false)
        const [Caption, setCaption] = useState(null)
        const [CommentsLength, setCommentsLength] = useState(0)
        const [ShowComments, setShowComments] = useState(0)
        const [Deleted, setDeleted] = useState(false)
        const [ShowCommentsToggle, setShowCommentsToggle] = useState(false)
        const [CurrentDate, setCurrentDate] = useState(new Date().toDateString())

        const [Saved, setSaved] = useState(false)
        const [SavedinDB, setSavedinDB] = useState(false)

        const [cc, setcc] = useState('')

        const history = useHistory()
        const dispatch = useDispatch();


        const userSignin = useSelector((state) => state.userSignin);
        const { userInfo } = userSignin;

        const likers = useSelector((state) => state.getLikes.users);
        const loadingLikers = useSelector((state) => state.getLikes.loading);

        const socket = useSocket()


        useEffect( async () => {
                
                console.log(inModal);

                setloading(true)
                axios.get(`/api/newsfeed/getpost/${id}/${postid}`)
                .then(res => {

                        if(res.data){
                        
                        setState(res.data);
                        setloading(false);
                        setCaption(res.data.post.caption);
                        setCommentsLength(res.data.post.comments.length)
                        setShowCommentsToggle(res.data.post.showComments)
                        if(res.data.post.comments.length>2) 
                                setShowComments(res.data.post.comments.length - 2)



                        }



                } )

                const x = await axios.get(`/api/users/onlysaved/${userInfo._id}`)
                for(var i = 0 ; i < x.data.savedPosts.length ; i++ ){
                        if (x.data.savedPosts[i].postId == postid ) {
                          setSavedinDB(true)
                          break
                        }
                }

                

        }, [ ]);





        const likeHandle = (_id) => {
                console.log(_id);
                console.log(likedPosts);
                console.log(state.post.likes.indexOf(userInfo._id));


                // state.post.likes.indexOf(userInfo._id) != -1 && likedPosts.indexOf(state._id) == -1 ? <>Liked</> : 

                if(likedPosts.indexOf(_id) != -1){

                        var newlp = likedPosts.filter(e=> e !== _id) ;
                        setlikedPosts( newlp )
                        console.log('it was present');


                }
                else{

                        setlikedPosts( [...likedPosts , _id ] )
                        console.log('it was not present');

                        socket.emit('send-notification', { type : 'like' , by : userInfo._id , post : postid , comment : null , to : id })


                }
                
                dispatch( like({ id , postid }) )
 
        }


        const handleGetLikes = (_id) => {

                dispatch( getLikes({ id  , postid  }) )
                
                setlikeModal(true)

        }




        const handleComments = ( e) => {

                e.preventDefault();
                const commentedText = cc
                if(commentedText === '') return;

                dispatch( comment({id  , postid  , comment : commentedText }) )

                setCommentsLength(CommentsLength+1)
                setcc('')

                var x = commentedPosts.push({
                        post : postid ,
                        comments : [{ id : userInfo._id , comment : commentedText  }]
                })

                socket.emit('send-notification', { type : 'comment' , by : userInfo._id , post : postid , comment : commentedText , to : id })


                setcommentedPosts( [...commentedPosts , x] )
                console.log(commentedPosts)

                return
        }



        const handleSavePosts = () => {

                if(Saved) {setSaved(false)}
                else setSaved(true)

                axios.put(`/api/likecomment/savepost/${id}/${postid}`, { } , {
                        headers: { Authorization: `Bearer ${userInfo.token}`} } )  
               
        }


        const handleEditSubmit = () => {

                setShowEditField(false)
                console.log(Caption);

                dispatch( editCaption({ id , postid , caption : Caption }) )
        }


        const handleDelete = () => {

                if (window.confirm("Delete this post ?")) {
                        dispatch(  deletePost({ id  , postid  })  )
                        setDeleted(true)
                } 
                else { return }

        }


        const handleShowMoreComments = () => {

                console.log(ShowComments);

                if( (ShowComments-6) > 2){
                        setShowComments(ShowComments-6)
                }
                else{
                        setShowComments(0)
                }

        }


        const handleToggle = () => {

                console.log(postid);

                if(ShowCommentsToggle){
                        setShowCommentsToggle(false)
                        axios.put(`/api/likecomment/showcomments/${postid}`, { } , {
                        headers: { Authorization: `Bearer ${userInfo.token}`} } )
                        return  
                }
                else{
                        setShowCommentsToggle(true)
                        axios.put(`/api/likecomment/showcomments/${postid}`, { } , {
                        headers: { Authorization: `Bearer ${userInfo.token}`} } )  
                }

        }



        const showDate = (x) => {
                
                const month = x.split('T')[0].split('-')[1]
                var setMonth = ''
                
                if(month == '01') setMonth = 'Jan'
                if(month == '02') setMonth = 'Feb'
                if(month == '03') setMonth = 'Mar'
                if(month == '04') setMonth = 'Apr'
                if(month == '05') setMonth = 'May'
                if(month == '06') setMonth = 'Jun'
                if(month == '07') setMonth = 'July'
                if(month == '08') setMonth = 'Aug'
                if(month == '09') setMonth = 'Sep'
                if(month == '10') setMonth = 'Oct'
                if(month == '11') setMonth = 'Nov'
                if(month == '12') setMonth = 'Dec'

                console.log(setMonth)
                console.log(CurrentDate.split(' ')[1])

                if(CurrentDate.split(' ')[1] == setMonth && CurrentDate.split(' ')[2]== x.split('T')[0].split('-')[2] )
                        { return 'Today' }
                else if( CurrentDate.split(' ')[1] == setMonth && CurrentDate.split(' ')[2]-1 == x.split('T')[0].split('-')[2]  )
                        { return 'Yesterday'}
        // "Mon May 31 2021"

                return x.split('T')[0].split('-')[2] + ' ' + setMonth  + ' ' + x.split('T')[0].split('-')[0]
        }






        return (
                <div > 
                        {!loading && state && state._id && !Deleted  && 
                        

                        <motion.div 
                        initial={{ y: inModal ? "-100vh" : '0' }} 
                        animate={{ y: 0 }} >

                        <Container style={{
                                maxWidth: inModal ? '100%' : '650px',background:'white',padding:'10px 0px',overflowX:'hidden' , 
                                boxShadow: 'rgba(60, 64,67, 0.3) 0 1px 2px 0 , rgba(60, 64,67, 0.15) 0 1px 3px 1px'  }}>
                                <Row style={{margin:'0px',padding:'0px'}}>

                                


                                <Col md={inModal ? 7 : 12} style={{padding:'0px'}} >
                                <div className='row' >
                                        <h1><Image src={state.profilePic} style={{width:'85px' , height:'85px' , borderRadius:'50%', cursor :'pointer',margin : '0px 25px ' }} alt='a pic' 
                                        onClick={ () => {history.push(`/user/${state._id}`)} }/><b>{state.name}</b></h1>
                                        {userInfo._id === id && <div className="dropdown">
                                        <MoreVertIcon style={{fontSize:'40px',marginRight:'25px'}} />
                                                <ul className="dropdown-content-for-post" >
                                                        <li onClick={()=>setShowEditField(true)} >Edit</li>
                                                        <li onClick={()=> handleDelete() }>Delete</li>
                                                        <li>
                                                        <div className='custom-control custom-switch'>
                                                                <input type='checkbox' className='custom-control-input' id={postid}
                                                                checked={ ShowCommentsToggle }
                                                                onChange={()=>handleToggle()}readOnly
                                                                />
                                                                <label className='custom-control-label' htmlFor={postid}>Comments</label>
                                                        </div>
                                                        </li>

                                                </ul>
                                        </div>}
                                </div>
                                <div style={{minHeight:'300px'}} ><img style={{width:'100%'}} src={state.post.pic } ></img></div>



                                <div className='row' style={{margin:'5px 10px'}} >
                                <p onClick={()=> likeHandle(state.post._id) } style={{cursor:'pointer'}} >
                                {
                                state.post.likes.indexOf(userInfo._id) != -1 && likedPosts.indexOf(state.post._id) == -1 ? <Bounce ><FavoriteIcon  style={{fontSize:'70px', color:'red'}}/></Bounce > : 
                                state.post.likes.indexOf(userInfo._id) == -1 && likedPosts.indexOf(state.post._id) != -1 ? <Bounce ><FavoriteIcon  style={{fontSize:'70px', color:'red'}}/></Bounce > :
                                state.post.likes.indexOf(userInfo._id) != -1 && likedPosts.indexOf(state.post._id) != -1 ? <FavoriteBorderIcon  style={{fontSize:'70px', color:'grey'}}/> :  
                                <FavoriteBorderIcon  style={{fontSize:'70px', color:'grey'}}/>
                                }        
                                </p>

                                <h1><b style={{cursor:'pointer'}} onClick={ () => handleGetLikes(state.post._id)} >{ 
                                
                                state.post.likes.indexOf(userInfo._id) != -1 && likedPosts.indexOf(state.post._id) == -1 ? <>{state.post.likes.length }</> : 
                                state.post.likes.indexOf(userInfo._id) == -1 && likedPosts.indexOf(state.post._id) != -1 ? <>{state.post.likes.length + 1}</> :  
                                state.post.likes.indexOf(userInfo._id) != -1 && likedPosts.indexOf(state.post._id) != -1 ? <>{state.post.likes.length + -1}</> :  
                                state.post.likes.indexOf(userInfo._id) == -1 && likedPosts.indexOf(state.post._id) == -1 ? <>{state.post.likes.length + 0}</> :  
                                <>{state.post.likes.length}</>
                                
                                }<FavoriteIcon style={{fontSize:'45px'}}/></b> </h1>


                                <p onClick={()=>handleSavePosts()} style={{cursor:'pointer'}} >
                                {
                                !SavedinDB && Saved ? <Jump><BookmarkIcon style={{fontSize:'70',color :'black'}} /></Jump> :
                                SavedinDB && !Saved ? <Jump><BookmarkIcon style={{fontSize:'70',color :'black'}} /></Jump> :
                                SavedinDB && Saved ? <BookmarkBorderIcon  style={{fontSize:'70',color :'grey'}}/> : 
                                <BookmarkBorderIcon  style={{fontSize:'70',color :'grey'}}/> 
                                }
                                </p>
                                </div>



                                </Col>





                                <Col md={inModal ? 5 : 12} >
                                <div style={{height:'100%'}} >




                                {ShowEditField ?
                                <div>
                                <form style={{textAlign:'center'}} onSubmit={handleEditSubmit}>
                                <textarea  
                                rows="3" cols="25" type="text" 
                                value={Caption} onChange={(e)=>setCaption(e.target.value)}>
                                </textarea><br/>
                                <button type='submit'>Done</button>
                                </form>
                                </div>

                                :

                                <div><h1 style={{textAlign:'center'}}>{Caption}</h1>
                                
                                
                                <h5 style={{textAlign:'right',color:'gray'}} >{ showDate(state.post.createdAt)} </h5>
                                {/* <h5 style={{textAlign:'right',color:'gray'}} >{state.post.createdAt} </h5> */}
                                
                                </div>
                                

                                }


                                
                                <div> 
                                

                                
                                
                                {ShowCommentsToggle && <>
                                
                                {ShowCommentsToggle && ShowComments > 0 && ShowComments + ' more comments'}

                                {ShowCommentsToggle && ShowComments > 0 &&
                                <span onClick={handleShowMoreComments} style={{cursor:'pointer'}} ><b>Show More</b></span>
                                }

                                {state.post.showComments  && <hr/>}
                                
                                <div style={{maxHeight: inModal ? "650px" : '400px' ,overflowY:'auto',maxWidth:'650px',background:'rgba(256, 256, 256,.6)'}} >

                                

                                { state.post.comments && 
                                        state.post.comments
                                                .slice( ShowComments , state.post.comments.length)
                                                .map((c) =>
                                                        <div>
                                                        <p><NamePic bystate={false} id={c.id} comment={c.comment}/></p>
                                                        </div>) 
                                }
                                
                                {commentedPosts.map((y)=> <div> {y.post === postid && y.comments.map((z) => <div><p><NamePic bystate={true} id={z.id} comment={z.comment}/></p></div>)  } </div> )}
                                </div>
                                
                                {ShowCommentsToggle && <form onSubmit={handleComments}>

                                {commentedPosts.length + state.post.comments.length > 0 && <hr/>}


                                <input value={ cc } onChange={(e) => setcc(e.target.value)} style={{width:'80%'}} />
                                <button onClick={handleComments} style={{width:'20%'}} >Send</button>
                                </form>}
                                
                                </> }


                                </div>


                                </div>
                                </Col>

                                
                                
                                </Row>

                                { likeModal && (
                                <Modal isOpen ={true} onRequestClose = { ()=> setlikeModal(false) } 
                                style={{
                                        content: {
                                          margin: 'auto',
                                          border: '1px solid #ccc',
                                          borderRadius: '0px',
                                          padding: '0px',
                                          maxWidth:'350px',
                                          textAlign:'center',
                                          overflowY : 'hidden'
                                        }
                                      }}
                                >
                                
                                <div>
                                {likers && !loadingLikers && <div>
                                
                                <h1>Liked by {likers.length} people </h1> <br></br>
                                {likers.map( (x,i)=>(
                                        
                                        <div>
                                                <Bounce left >
                                                <img src={x.profilePic} style={{width:'100px' , height:'100px' , borderRadius:'50%', cursor :'pointer' }} alt='a pic' 
                                                onClick={ () => {history.push(`/user/${x._id}`)} }></img>
                                                </Bounce>
                                                <h1 >{x.name}</h1>
                                        </div>
                                        
                                ) )}
                                
                                </div> }
                                {loadingLikers && <div>loading</div> }


                                </div>

                                </Modal>
                )}


                                </Container>
                        </motion.div>


                        }
                        {loading && <Container style={{ 
                                minHeight:'600px' , maxWidth: inModal ? '100%' : '650px',textAlign:'center',
                                background:'white', boxShadow: 'rgba(60, 64,67, 0.3) 0 1px 2px 0 , rgba(60, 64,67, 0.15) 0 1px 3px 1px'  }}>

                        <div class="lds-dual-ring"></div>

                        </Container>}
                        
                        
                        
                </div>
        )
}

