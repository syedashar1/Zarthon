import React, { useEffect , useState } from 'react';
import axios from 'axios';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import NamePic from './NamePic';
import { useDispatch, useSelector } from 'react-redux';
import { getLikes, like , comment, editCaption, deletePost } from '../actions/likeCommenentActions';
import Modal from "react-modal"
import { useSocket } from '../chat/contexts/SocketProvider';
import { motion } from 'framer-motion';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Bounce from 'react-reveal/Bounce';
import Jump from 'react-reveal/Jump';

export default function SinglePro({pro , type}) {


    const [User, setUser] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()
    

    useEffect(() => {
        console.log(pro);
        axios.get(`/api/users/single/${pro.by}`).then(res=>setUser(res.data))

    }, [])


    return (
        <div>
    
        {User && pro && pro._id &&
        <div className='pro-card' style={{border:'5px solid black'}} onClick={()=>history.push(`/${type}/${pro._id}`)}>
        {type == 'teacher' && "A teacher"  }
        {type == 'proworker' && "A Professional"  }
        <h1><Image src={User.profilePic} style={{width:'85px' , height:'85px' , borderRadius:'50%', cursor :'pointer',margin : '0px 25px ' }} alt='a pic' 
        onClick={ () => {history.push(`/user/${User._id}`)} }/><b>{User.name}</b></h1>
        <h1>{pro.title}</h1>        
        <h1>{pro.description}</h1>        
        <h1>{pro.budget}</h1>        
        <h1>{pro.avaliableHours}</h1>  
        <h1>{pro.tags.map(x=><span>{x}{' '}</span>)}</h1>  

        </div>
        }
        
            
        </div>
    )
}
