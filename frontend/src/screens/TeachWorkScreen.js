import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function TeachWorkScreen(props) {
    const [User, setUser] = useState(null)
    const [pro, setPro] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`/api/teachers/${props.match.params.id}`).then(res=>{
            setPro(res.data)
            axios.get(`/api/users/single/${res.data.by}`).then(res2=>setUser(res2.data))
        })
        // axios.get(`/api/users/single/${pro.by}`).then(res=>setUser(res.data))

    }, [])


    return (
        <div>teacher
        {User && pro && pro._id &&
        <div className='pro-card' style={{border:'5px solid black'}}>

        <h1><Image src={User.profilePic} style={{width:'85px' , height:'85px' , borderRadius:'50%', cursor :'pointer',margin : '0px 25px ' }} alt='a pic' 
        onClick={ () => {history.push(`/user/${User._id}`)} }/><b>{User.name}</b></h1>
        <h1>{pro.title}</h1>        
        <h1>{pro.description}</h1>        
        <h1>{pro.budget}</h1>        
        <h1>{pro.avaliableHours}</h1>  
        <h1>{pro.tags.map(x=><span>{x}{' '}</span>)}</h1>  
        <h1>{pro.languages.map(x=><span>{x}{' '}</span>)}</h1>   
        <h1>{pro.portfolio && <button><a href={pro.portfolio} target="_blank">Download portfolio</a></button>}</h1>  
        <h1>{pro.by === User._id && <button><Link to={`/teacher-update/${pro._id}`}>Update</Link></button>}</h1> 
        <h1>{pro.by === User._id && <button><Link to={`/teacher-update/${pro._id}`}>Delete</Link></button>}</h1> 

        </div>
        }
        
            
        </div>
    )
}
