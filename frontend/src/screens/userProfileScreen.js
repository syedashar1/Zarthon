import React, { Component } from 'react'
import { connect } from "react-redux";
import {userDetails } from "../actions/userActions"
import FireGram from "../components/FireGram"
import ProfilePic from "../components/ProfilePic"
import { Col, Container, Row } from 'react-bootstrap';
import Modal from "react-modal"
import Zoom from "react-reveal/Zoom"
import axios from 'axios';
import ChatApp from '../chat/components/ChatApp';
import SavedPosts from '../components/SavedPosts';




class userProfileScreen extends Component {


          constructor(){
                super();
                this.state = { 
                
                        openModal : false ,
                        message : ''

                }
        }


        componentDidMount(){

                if(this.props.match.params.id){
                        this.props.userDetails(this.props.match.params.id)

                }
                else{
                        this.props.userDetails()
                }

                
        }


        componentDidUpdate(){
                console.log('changed');
        }



        submitHandler = (e) => {

                e.preventDefault()
                const {user , userInfo } = this.props
                console.log(this.state.message);
                console.log(userInfo._id);
                console.log(user._id);


                axios.put(`/api/chat/singletext/${userInfo._id}`, {text : this.state.message , recipients: [user._id] }  );
                this.setState({openModal:false})

        }

     
        
        render() {


                const {user , userInfo } = this.props
                const {openModal} = this.state

return (
        <div>
                <h1>Profile Screen</h1>
                {userInfo && userInfo._id && <ChatApp show={true} />}
                {user && <ProfilePic/> }
                
                          
                          <div className="center">
                         <div>

                        {user && 
                        
                        <div>
                        <p style={{textAlign:'center' , fontSize : '50px', marginTop:'80px'}} >{user.name}</p>
                        <p style={{textAlign:'center' , fontSize : '50px', marginTop:'80px'}} >{user.email}</p>
                        <p style={{textAlign:'center' , fontSize : '50px', marginTop:'80px'}} >{user.age}</p>
                        <p style={{textAlign:'center' , fontSize : '50px', marginTop:'80px'}} >{user.country}</p>
                        <p style={{textAlign:'center' , fontSize : '50px', marginTop:'80px'}} >{user.bio}</p>
                        <p style={{textAlign:'center' , fontSize : '50px', marginTop:'80px'}} >{user.posts.length} Posts </p>
                        
                        {user._id !== userInfo._id && <button onClick={()=>this.setState({openModal : true})} >Message</button> }
                        
                        </div>

        
                        
                        }
                        
                        
                                
                       
                        </div> 



                </div>


                { openModal && (
                <Modal isOpen ={true} onRequestClose = { ()=>this.setState({openModal:false}) } >
                                                <Zoom>
                                                <form className="form upgap text-center" onSubmit={this.submitHandler} >
                                                <textarea id="description" rows="5" cols="50" type="text" required="true"
                                                placeholder="Enter family description" onChange={(e) => this.setState({ message : e.target.value})}
                                                ></textarea>
                                                <button>send</button>
                                                </form>
                                                </Zoom>

                                        </Modal>
                                )}








                {/* {user && <MapLocation/> } */}

                <Container>
                {user && <FireGram/> }
                <Row>
                
                <Col>
                {/* {user && <PostsMongo/> } */}
                </Col>
                </Row>


                {user && <SavedPosts/> }



                </Container>
                
                
                        
        
        </div>
                )
        }
}


export default connect(
        
        (state) => ({ 
                userInfo : state.userSignin.userInfo ,
                user : state.getDetails.user
        }),
        {
                userDetails
          
        } 
      
)(userProfileScreen);