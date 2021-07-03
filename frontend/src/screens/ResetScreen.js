import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useHistory,useParams} from 'react-router-dom'
import { USER_SIGNIN_SUCCESS } from '../types/userTypes'
import Slide from 'react-reveal/Slide';

export default function ResetScreen() {

        const history = useHistory()
        const {token} = useParams()
        const [Email, setEmail] = useState('')
        const [Password, setPassword] = useState('')
        const dispatch = useDispatch()
        const [Error, setError] = useState(false)
        const userInfo = useSelector((state) => state.userSignin.userInfo);

        useEffect(() => {
                if(userInfo) history.push('/profile')
                console.log(token);
        }, [token , userInfo ])


        const newPasswordHandle = async (e) => {
                e.preventDefault()

                try {
                        const {data} = await axios.post('/api/users/new-password' , {password : Password, token : token} )
                        localStorage.setItem('userInfo', JSON.stringify(data));
                        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
                } catch (error) {
                        setError(true)
                }
                       
        }



        const confirmEmailHandle = async (e) => {
                e.preventDefault()
                await axios.post('/api/users/reset-password' , {email : Email} )
                alert('check your email')
        }



        return (
                <Slide left>
                
                <div style={{margin:'100px 0px'}}>
                {token !== 'null' ? <div className='form text-center'>
                        <p className='logo'>Coolgram</p>
                        <form onSubmit={newPasswordHandle} >
                        <h1>Reset New Password</h1>
                        <div>
                        <input type="password" id="password" placeholder="Enter New Password" required onChange={(e)=>setPassword(e.target.value)}></input>
                        </div>
                        <div  className='text-center'> <br/>
                        <button type="submit"> Reset </button>
                        </div>
                        {Error && <>
                        <br></br>
                        Reset Password Token Expired{' '}
                        <Link to={`/reset/null`}>
                        Try Again
                        </Link> 
                        </> }
                        </form>
                
                </div> : 
                
                <div  className='form text-center'>
                        <p className='logo'>Coolgram</p>
                        <form onSubmit={confirmEmailHandle}>
                        <h1>Write Down Your Email</h1>
                        <div>
                        <input type="email" id="email" placeholder="Enter your Email " required onChange={(e)=>setEmail(e.target.value)}></input>
                        </div>
                        <div  className='text-center'><br/>
                        <button type="submit"> Confirm </button>
                        </div>
                        </form>

                </div>
                       
                }
                        
                </div>
        
                </Slide>
        )
}
