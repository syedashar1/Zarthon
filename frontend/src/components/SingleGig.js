import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import NamePic from './NamePic';
import { useDispatch, useSelector } from 'react-redux';


export default function SingleGig({gig}) {


    const [User, setUser] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`/api/users/single/${gig.by}`).then(res=>setUser(res.data))
    }, [])


    return (
        <div>
        {User && gig && User._id && 
        
        <div className='card' onClick={()=>history.push(`/gigs/${gig._id}`)}>
        <div className='card-img' >
        <img
        className="medium"
        src={gig.gigPics[0]}
        alt={gig._id}
        />
        </div>
        <div className='card-body' >
        <h1><Image src={User.profilePic} style={{width:'85px' , height:'85px' , borderRadius:'50%', cursor :'pointer',margin : '0px 25px ' }} alt='a pic' 
        onClick={ () => {history.push(`/user/${User._id}`)} }/><b>{User.name}</b></h1>
        <h1>{gig.title}</h1>
        <p>{gig.description}</p>
        <p>Starting at {gig.beginner.price }</p>
        </div>
        </div>
            

        }


            
        </div>
    )
}
