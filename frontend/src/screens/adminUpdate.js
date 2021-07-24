import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

export default function AdminUpdate() {

    const userInfo = useSelector((state) => state.userSignin.userInfo);
    const user = useSelector((state) => state.getDetails.user);

    const [Title, setTitle] = useState('')
    const [Update, setUpdate] = useState('')

    const history = useHistory()

    const submit = (e) =>{
        e.preventDefault()
        axios.post('/api/users/adminupdates' , {
            title : Title ,
            desc : Update
        } , { headers: { Authorization: `Bearer ${userInfo.token}`} }   )
        .then(res => history.push('/updates') )
    }

    return (
        <div>{userInfo && userInfo.email == 'admin22@gmail.com' && <div>
        
        <br/><br/>

        <form onSubmit={submit} className='form text-center' >
        <h1>Enter Update Title</h1>
        <input onChange={(e)=>setTitle(e.target.value)} placeholder='Enter the update' ></input>

        <h1>Enter Update</h1>
        <textarea rows='10' cols='50' onChange={(e)=>setUpdate(e.target.value)} placeholder='Enter the update' /><br/>
        <button type='submit' >Enter</button>
        </form>

        <br/><br/>

        
        </div>

        }
        </div>
    )
}
