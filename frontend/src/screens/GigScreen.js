import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Col, Container, Image, Row , Carousel } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Charts from '../components/Charts'

export default function GigScreen(props) {

    const [User, setUser] = useState(null)
    const [Gig, setGig] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.userSignin.userInfo);


    useEffect(() => {
        axios.get(`/api/gigs/${props.match.params.id}`).then(res=>{setGig(res.data)
            axios.get(`/api/users/single/${res.data.by}`).then(res2=>setUser(res2.data))
        })
    }, [])


    return (
        <div>{Gig && User && User._id && Gig._id && <div>

        <div className='header' >
        {userInfo && Gig && userInfo._id === Gig.by && <button onClick={()=>history.push(`/edit-gig/${props.match.params.id}`)} >Edit Your Gig</button>}
        <h2><a href='#overview'>Overview</a></h2>
        <h2><a href='#seller'>About Seller</a></h2>
        <h2><a href='#chart'>Packages</a></h2>
        <h2><a href='#reviews'>Reviews</a></h2>
        </div>
            
        
        <h1 id='seller' ><Image src={User.profilePic} style={{width:'85px' , height:'85px' , borderRadius:'50%', cursor :'pointer',margin : '0px 25px ' }} alt='a pic' 
        onClick={ () => {history.push(`/user/${User._id}`)} }/><b>{User.name}</b></h1>
        <h2>{Gig.title}</h2>
        <h2>{Gig.description}</h2>
        <p>{Gig.tags.map(x=><button type='disable'>{x}</button>)}</p>

        <Carousel fade style={{maxWidth:'600px'}} id='overview'>
        {Gig.gigPics.map(x=> <Carousel.Item><img style={{height:'450px'}} className="d-block w-100" src={x} /></Carousel.Item>) }
        </Carousel>

        {Gig.negotiable ? <h1>The prices are negotiable</h1> : <h1>The prices are fixed</h1>}

        <Charts  beginner={Gig.beginner} standard={Gig.standard} premium={Gig.premium} />

            
        </div>}


        <div id='reviews'>
        <h1>Reviews</h1>
        </div>
            
        </div>
    )
}
