import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import NamePic from './NamePic';
import { useDispatch, useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';
import IconButton from '@material-ui/core/IconButton';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

export default function SingleGig({gig}) {


    const [User, setUser] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`/api/users/single/${gig.by}`).then(res=>{setUser(res.data);console.log(gig);} )
    }, [])


    return (
        <Fade>
        {gig && 
    
        <div className='card' onClick={()=>history.push(`/gigs/${gig._id}`)}>
        <div className='card-img' >
        <img
        className="medium"
        src={gig.gigPics && gig.gigPics[0]}
        alt={gig._id}
        />
        </div>
        <div className='card-body' >
        {User && <Fade><Image src={User.profilePic} style={{width:'45px' , height:'45px' , borderRadius:'50%', cursor :'pointer',margin : '0px 5px ' , display:"flex" }} alt='a pic' 
        onClick={ () => {history.push(`/user/${User._id}`)} }/>{User.name}</Fade>}
        <h1 style={{whiteSpace:'nowrap' , fontSize:'22px' , marginTop:'-10px',overflow:'hidden',textOverflow:'ellipsis'}}>{gig.title}</h1>
        <p>
        {
        gig.finalRating >= 5 ? <SentimentVerySatisfiedIcon style={{fontSize:'30px' }}/> :
        gig.finalRating >= 4 ? <SentimentSatisfiedAltIcon style={{fontSize:'30px' }}/> : 
        gig.finalRating >= 3 ? <SentimentSatisfiedIcon style={{fontSize:'30px' }}/> : 
        gig.finalRating >= 2 ? <SentimentDissatisfiedIcon style={{fontSize:'30px' }} /> :
        <SentimentVeryDissatisfiedIcon style={{fontSize:'30px' }} />
        }
        <span style={{color:'grey',fontSize:'20px'}} > {gig.finalRating}{' rating out of '} {gig.jobDone} {' orders'} </span>
        </p>
        <hr></hr>
        <p style={{textAlign:'right'}}>Starting at <b>${gig.beginner && gig.beginner.price }</b> </p>
        </div>
        </div>
            

        }


            
        </Fade>
    )
}
