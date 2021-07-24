import React, { Component } from 'react'
import {Link } from 'react-router-dom';
import { connect } from "react-redux";
import { signin , signout } from '../actions/userActions' ;
import Slide from 'react-reveal/Slide';

class SignIn extends Component {

        constructor(){
                super();
                this.state = {
                        email : "" , 
                        password : "" ,
                }
        }





         submitHandler  = async (e)  => {
                e.preventDefault()
                console.log(this.state);
                
                this.props.signin(this.state.email , this.state.password)

        }

render() {

        const redirect = this.props.location.search
        ? this.props.location.search.split('=')[1]
        : '/';
        if (this.props.userInfo) {
                
                this.props.history.push(redirect);
        }


        return (
        <Slide right>

                <form className="form text-center" style={{maxWidth:'460px' , marginTop:100}} onSubmit={this.submitHandler}>
                
                <div >
                <p className='logo'>Zarthon</p>
                </div>
                <div>
                <input type="text" id="email" placeholder="Enter userName" required onChange={(e) => this.setState({ email : e.target.value})}></input>
                </div>
                <div>
                <input type="password" id="password" placeholder="Enter password"  onChange={(e) => this.setState({ password : e.target.value})}></input>
                { this.props.signinLoading &&  <p>Siging in...</p> }
                { this.props.signinError &&  this.props.signinError }
                </div>
                <div className='row center'>
                <label />
                        <button style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
                        border: '1px solid transparent' }} type="submit"> Sign In </button>
                        
                </div>

                </form>
                
                <div className='form' style={{maxWidth:'460px' , marginTop:20 , padding:'0px',textAlign:'center'}}>
                <div>
                        <label />
                        <div>Don't have an account?{' '}
                                <Link to={`/register?redirect=${redirect}`}  style={{color:'#0095f6'}}>
                                Sign up
                                </Link>     
                        </div>

                        <br></br>
                        <div>
                                <Link to={`/reset/null`}  style={{color:'#0095f6'}}>
                                Forgot Password ? 
                                </Link>     
                        </div>
                        <br></br>

                </div>
                </div>


                


    </Slide>
                )
        }
}



export default connect(
        
        (state) => ({ 

                userInfo : state.userSignin.userInfo ,
                signinError : state.userSignin.error ,
                signinLoading : state.userSignin.loading ,
        
        
        }),
        {
                signin , signout
        }

)(SignIn);

