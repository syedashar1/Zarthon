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
        <div>{userInfo && userInfo.email == 'admin@gmail.com' && <div>
        
        <form onSubmit={submit}>
        <h1>Enter Update Title</h1>
        <input onChange={(e)=>setTitle(e.target.value)} ></input>

        <h2>Enter Update</h2>
        <input onChange={(e)=>setUpdate(e.target.value)}></input>
        <button type='submit' >Enter</button>
        </form>
        
        </div>

        }
        </div>
    )
}
