import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { registerSeller , signin , signout } from '../actions/userActions' ;
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container , Row , Col } from 'react-bootstrap';
import "./styles/froms.css"





class SellerRegister extends Component {

        constructor(){
                super();
                this.state = {
                        email : "" , 
                        password : "" ,
                        confirmPassword : "" ,

                        latitude : null , 
                        longitude : null , 

                        name :"",
                        age  : 0 ,
                        favouriteNotes : [],
                        familyDescription : "" ,

                        country : "",
                        city : "" , 
                        address : "" ,

                        passwordNotMatched : false
                }





                this.getLocation = this.getLocation.bind(this)
                this.getCoordinates = this.getCoordinates.bind(this)



        }




        

        componentDidMount(){
                

                this.getLocation()


        }





        getLocation(){
                if(navigator.geolocation){
                        navigator.geolocation.getCurrentPosition(this.getCoordinates , this.showError)
                }
                else {
                        alert('Geolocation is not supported by the browser')
                }
        }

        getCoordinates(position){
                this.setState({
                        latitude : position.coords.latitude , 
                        longitude : position.coords.longitude
                })
        }
        showError(error) {
                switch(error.code) {
                  case error.PERMISSION_DENIED:
                    alert("User denied the request for Geolocation.")
                    break;
                  case error.POSITION_UNAVAILABLE:
                        alert("Location information is unavailable.")
                    break;
                  case error.TIMEOUT:
                        alert("The request to get user location timed out.")
                    break;
                  default:
                        alert("An unknown error occurred.")
                    
                }
        }





         submitHandler  = async (e)  => {
                e.preventDefault()



                if( this.state.password !== this.state.confirmPassword ){
                        this.setState({ passwordNotMatched : true })
                        return
                }

                if(this.state.longitude === null){
                        alert('you need to provide your current location to register an account')
                        return
                }

                

                else {
                        this.setState({ passwordNotMatched : false })

                        const user = {
                                email : this.state.email,
                                password : this.state.password,
                                name : this.state.name,
                                age : this.state.age,
                                country : this.state.country,
                                city : this.state.city,
                                address : this.state.address ,

                                


                                


                                location : {
                                        latitude : this.state.latitude , 
                                        longitude : this.state.longitude
                                        
                                } ,


                        }
                
                console.log(user);
                this.props.registerSeller( user )

                }


        }

render() {

        const redirect = this.props.location.search
        ? this.props.location.search.split('=')[1]
        : '/';
        if (this.props.userInfo) {
                
                this.props.history.push(redirect);
        }


        return (
        <div>


                <form className="form upgap" onSubmit={this.submitHandler}>

                


                <div className='text-center'>
                        <h1>Register a New User</h1>
                        
                </div>
                
                <div>
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" placeholder="Enter email" required onChange={(e) => this.setState({ email : e.target.value})}></input>
                </div>
                <div>
                {this.props.registerError && (<> {this.props.registerError } </>)}
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter password" required onChange={(e) => this.setState({ password : e.target.value})}></input>
                </div>
                <div>
                <label htmlFor="confirmPassword">confirm Password</label>
                <input type="password" id="confirmPassword" placeholder="Confirm password" required onChange={(e) => this.setState({ confirmPassword : e.target.value})}></input>
                { this.state.passwordNotMatched && ( <div style={{color:'red'}} >password did not match</div> )

                }
                </div>
                
                <div style={{height:"100px"}}/>

                <Container>
                <Row>

                

                

                <Col className="text-center lineright" sm={6} >
                
                
                
                <div >
                <p >Full Name</p>
                <input type="text" id="full name" placeholder="Enter full name" required onChange={(e) => this.setState({ name : e.target.value})}></input>
                </div>
                <div>
                <p>Age</p>
                <input type="number" placeholder="Enter Age"  onChange={(e) => this.setState({ age : e.target.value})}></input>
                </div>
                <div>
                <p>Country</p>
                <input type="text" placeholder="Enter Country"  onChange={(e) => this.setState({ country : e.target.value})}></input>
                </div>
                <div>
                <p>City</p>
                <input type="text" placeholder="Enter City"  onChange={(e) => this.setState({ city : e.target.value})}></input>
                </div>
                <div>
                <p>Address</p>
                <input type="text" placeholder="Enter City"  onChange={(e) => this.setState({ address : e.target.value})}></input>
                </div>


                </Col>


               

                </Row>
                </Container>

                <div style={{height:"100px"}}/>

                


               <div style={{height:"80px"}}/>


               
                <div className="text-center">
                <h1>Bio</h1>
                <div>
              <textarea id="description" rows="5" cols="70" type="text"
                placeholder="Enter family description" onChange={(e) => this.setState({ bio : e.target.value})}
              ></textarea>
            </div>
                </div>








                

                <label />
                
                <div  className='text-center'>
                        <button type="submit"> Sign Up </button>

                </div>
                        
                
                

                <div>
                        <label />
                        <div>Already have an account ?{' '}
                                <Link to={`/signin`}>
                                Sign In
                                </Link>     
                        </div>
                </div>
                        </form>


                


    </div>
                )
        }
}




export default connect(
        
        (state) => ({ 


                userInfo : state.userSignin.userInfo ,
                registerError : state.userRegister.error ,
                registerLoading : state.userRegister.loading ,
                registerSuccess : state.userRegister.success ,


        
        
        }),
        {
                signin , signout , registerSeller
        }

)(SellerRegister);

