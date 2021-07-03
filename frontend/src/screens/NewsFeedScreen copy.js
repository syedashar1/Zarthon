import React, { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listUsers } from '../actions/userActions' ;
import { Accordion, Card, Carousel, Col, Container, Row , Image } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useHistory } from "react-router-dom";

export default function NewsFeedScreen() {

        const userList = useSelector((state) => state.userList);
        // const { loading, error, users } = userList;

 
        const userSignin = useSelector((state) => state.userSignin);
        const { userInfo } = userSignin;

        const dispatch = useDispatch();
        const history = useHistory()

        const [state ,setState ] = useState([])
        const [page ,setPage ] = useState(1) 
        const [loading, setloading] = useState(false)


        useEffect(() => {
                
                setloading(true)
                axios.get(`/api/users?pageNumber=${page}`)
                .then(res => {
                        console.log(res);
                        setState([...state , ...res.data]);
                        setloading(false)
                } )


                // console.log(users);
                
                // dispatch( listUsers(page)  )
                // if(users){
                // setState([...state , ...users])
                // }
                // if (!this.props.userInfo) { this.props.history.push('/') }
                if(!userInfo){ history.push('/signin') }

                

        }, [ page , userInfo ]);




        const scrollToEnd = () => {
                setPage(page + 1)
                // dispatch( listUsers(page)  )

        }



//        window.onscroll = function () {
//                 console.log('scrolling');
//                 console.log(window.innerHeight + document.documentElement.scrollTop);
//                 console.log(document.documentElement.offsetHeight - 100);
//                 if(
//                         window.innerHeight + document.documentElement.scrollTop
//                         >= document.documentElement.offsetHeight - 100
//                 ){
//                         scrollToEnd()

                        
//                 }
//         } 







        return (
                <div>
                        <button onClick={()=>console.log(state)} >click</button>
                        <InfiniteScroll
                        dataLength={state.length}
                        next={scrollToEnd}
                        hasMore={true}
                        style={{overflow:'visible'}}
                        >
                
                        {state.length > 0 && state.map((x , i) => (
                        
                        <Container>
                                <Row>
                                <Col>
                                <div><h2>{i}</h2></div>
                                <div><h1 onClick={ () => {history.push(`/user/${x._id}`)} } >{x.name}</h1></div>
                                <div><h2>{x.age}</h2></div>
                                <div><h2>{x.country}</h2></div>
                                <div><h2>{x.bio}</h2></div>
                                <div><h2>{x.posts.length}</h2></div>
                                <div className='img-wrap' style = {{borderRadius : '50%'}} ><img src={x.profilePic} ></img></div>
                                
                                </Col>
                                </Row>


                                </Container>
                ) )}

</InfiniteScroll>
                        <h1>{loading ? <p> Loading... </p> : <h1> the end </h1>  }</h1>

                </div>
        )
}
