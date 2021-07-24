import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Col, Container, Image, Row , Carousel } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Pdf from "react-to-pdf";
import { userDetails } from '../actions/userActions';


export default function CertificateScreen() {

        const ref = React.createRef();
        const dispatch = useDispatch()
        const history = useHistory()

        const userInfo = useSelector((state) => state.userSignin.userInfo);

        const [Gigs, setGigs] = useState(null)
        const [Pro, setPro] = useState(null)
        const [Teach, setTeach] = useState(null)
        const [Certificates, setCertificates] = useState([])
        const options = {
                orientation: 'landscape',
                unit: 'in',
                format: [10.4,7]
        };


        useEffect(() => {

                if (!userInfo) {
                        history.push('/signin')
                }
                
                dispatch( userDetails() ) 
    
                axios.get(`/api/professionals/user/${userInfo._id}` ,  { headers: { Authorization: `Bearer ${userInfo.token}`} }  )
                .then(res => { if(res.data){ setPro(res.data) }})
    
                axios.get(`/api/teachers/user` ,  { headers: { Authorization: `Bearer ${userInfo.token}`} }  )
                .then(res => { if(res.data){ setTeach(res.data) }})
    
    
                axios.get(`/api/gigs/user/${userInfo._id}`).then(res => { setGigs(res.data)})
                axios.get(`/api/jobs/my-certificate/${userInfo._id}`).then(res => { setCertificates(res.data)})

    
        }, [userInfo])



        return (
                <div>
                <Container  >
                
                {Certificates.map(c=> <div ref={ref} style={{width:'100%'}}  >
                <Container style={{marginTop:'30px' , border:' 4px solid rgba(0,0,0,.125)' , textAlign:'center'}} >
                <br/><br/>
                <br/><br/>
                <h1 className='logo' style={{fontSize:'100px'}} > Zarthon Cerificate </h1>
                <br/>
                <h1 style={{fontSize:'50px'}} > presented to <b>{c.name}</b> </h1>
                <h1>On Date : {c.onDate.split('T')[0].split('-').reverse().join('-')}</h1>
                <i style={{fontSize:'40px',color : 'grey'}} > {c.text} </i> 
                <br/><br/>
                <br/><br/>
                <h5 style={{textAlign:'right'}} > id : {c._id} </h5>
                </Container>
                </div> )}

                <Pdf targetRef={ref} filename="post.pdf" options={options} x={.5} y={.5} scale={0.8} >
                {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
                </Pdf>

                </Container>
                        
                </div>
        )
}
