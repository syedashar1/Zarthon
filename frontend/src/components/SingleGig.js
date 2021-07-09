import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import NamePic from './NamePic';
import { useDispatch, useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';


export default function SingleGig({gig}) {


    const [User, setUser] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`/api/users/single/${gig.by}`).then(res=>setUser(res.data))
    }, [])


    return (
        <Fade>
        {gig && 
    
        <div className='card' onClick={()=>history.push(`/gigs/${gig._id}`)}>
        <div className='card-img' >
        <img
        className="medium"
        src={gig.gigPics[0]}
        alt={gig._id}
        />
        </div>
        <div className='card-body' >
        {User && <Fade><Image src={User.profilePic} style={{width:'45px' , height:'45px' , borderRadius:'50%', cursor :'pointer',margin : '0px 5px ' }} alt='a pic' 
        onClick={ () => {history.push(`/user/${User._id}`)} }/>{User.name}</Fade>}
        <h1 style={{whiteSpace:'nowrap' ,height:'45px',overflow:'hidden',textOverflow:'ellipsis',marginTop:'10px'}}>{gig.title}</h1>
        <hr></hr>
        <p style={{textAlign:'right'}}>Starting at <b>${gig.beginner.price }</b> </p>
        </div>
        </div>
            

        }


            
        </Fade>
    )
}
