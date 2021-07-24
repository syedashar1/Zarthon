import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfilePic from "../components/ProfilePic"
import { update, userDetails, userSuggest } from '../actions/userActions';
import Modal from "react-modal"
import Zoom from "react-reveal/Zoom"
import axios from 'axios';
import ChatApp from '../chat/components/ChatApp';
import Slide from 'react-reveal/Slide';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { motion } from 'framer-motion';
import { Col, Container, Row } from 'react-bootstrap';
import CheckIcon from '@material-ui/icons/Check';
import { SocketProvider } from '../chat/contexts/SocketProvider';
import { useHistory } from "react-router-dom";
import countryList from './countries'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';




export default function UserProfile(props) {


        const dispatch = useDispatch()
        const productId = props.match.params.id;
        const history = useHistory()

        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const user = useSelector((state) => state.getDetails.user);


        const updateSuccess = useSelector((state) => state.userUpdateStatus.success);
        const updateError = useSelector((state) => state.userUpdateStatus.error);


        const suggestedUsers = useSelector((state) => state.userSuggestion.Suggestedusers);
        const suggestionLoading = useSelector((state) => state.userSuggestion.loading);



        const [EditState, setEditState] = useState(false)

        const [Message, setMessage] = useState('')
        const [openModal, setopenModal] = useState(false)


        const [Tiltle, setTiltle] = useState('')
        const [Description, setDescription] = useState('')
        const [Budget, setBudget] = useState(0)
        const [Tags, setTags] = useState([])
        const [aTag, setATag] = useState('')
        const [Negotiate, setNegotiate] = useState(false)
        const [Avaliable, setAvaliable] = useState(0)
        const [Videos, setVideos] = useState([])
        const [VidTitle, setVidTitle] = useState('')
        const [Vid, setVid] = useState('')
        const [VidDesc, setVidDesc] = useState('')
        const [Languages, setLanguages] = useState([])
        const [L1, setL1] = useState('')

        const [Selectt, setSelectt] = useState([
                'Web Developer','App Developer' , 'MERN Stack' , 'Drop Shipper' , 'C++ Developer' , 'High Frequency Trading Software Developer' ,
                'Designer' , 'Illustrator' , 'Grapic Designer' , 'Forex Trader' , 'SQL Developer' , 'WordPress' , 'Ecomerce Developer' , 
                'Data Entry Specialists' , 'Video Editors' , 'Data Analyst' , 'Shopify Developer'
        ])


        
        // videos : [{
        //         title : {type : String },
        //         video : {type : String},
        //         description : {type : String},
        // }]





        useEffect(() => {


                if (!userInfo) {
                    history.push('/signin?redirect=joinAsTeacher')
                }
                if ( user && user.teachAccount) {
                        history.push('/profile')
                }

        }, [ user])







        const submitHandler = (e) => {

                e.preventDefault()
                alert('something')
                axios.post(`/api/teachers/postpro` , {
                        by : userInfo._id ,
                        title : Tiltle ,
                        budget : Budget , 
                        description : Description,
                        tags : Tags ,
                        languages : Languages ,
                        negotiate : Negotiate,
                        avaliableHours : Avaliable,
                        videos : Videos
                        
                }, { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                .then(res => {
                        if(res.data){
                                axios.put(`/api/users/setteachtrue` , {} ,  { headers: { Authorization: `Bearer ${userInfo.token}`} }  )
                                console.log(res.data);
                                history.push('/joinAsTeacher-portfolio')
                        }



                } )
                



        }



        const submitEditInfo = () => {
                dispatch( update({
                    
                }) )

        }

        const handleToggle = () => {

            if(Negotiate){
                    setNegotiate(false)
            }
            else{
                    setNegotiate(true)
            }

    }



        return (
                <div>

                
                <div  className='form text-center'>
                <p className='logo'>Zarthon Teacher</p>
                {user && <p>(Setting up a Teacher account for {user.userName})</p>}
                </div>

                
                <form onSubmit={submitHandler}>
                <div className='form text-center'>
                <h1 className='fl' >What describes your Work ?</h1>
                <input onChange={e=>setTiltle(e.target.value)} required ></input>

                <h2 className='fl' >Give a description about your work</h2>
                <textarea onChange={e=>setDescription(e.target.value)} required rows='8' cols='40' />


                <h2 className='fl' >What will you charge for it hourly?</h2>
                <input type='number' onChange={e=>setBudget(e.target.value)} required ></input> <br/> <br/>
                <h3 className='fl'>Is it negotiable ?</h3>
                <div className='custom-control custom-switch row center' >
                <input type='checkbox' className='custom-control-input' id='x'
                onChange={()=>handleToggle()}readOnly
                />
                <label className='custom-control-label' htmlFor='x'></label>
                </div>
                </div>

                <div className='form text-center'>
                
                {Tags && Tags.map(x=>
                        <span style={{ display: 'inline-block' , background:'#a1c5ff',color:'white', borderRadius:'20px' ,padding:'5px',margin:'5px',cursor:'pointer' }}>
                        {x}{' '}<BackspaceIcon onClick={()=>{setTags(Tags.filter(e=>e !== x ))}} /></span>
                )}<br/><br/>
                <input onChange={e=>setATag(e.target.value)} value={aTag} placeholder='Select your skills'/>
                <span onClick={()=>{setTags([...Tags , aTag]);setATag('')}} ><AddCircleIcon style={{fontSize:'30px',color:'grey'}}/></span>
                <p className='remember'>  Important : Make your first 5 skills the most appropriate to your offer that you provide </p>
                
                <h1 className='fl'>Or select from these </h1>
                {Selectt.map(x=><span 
                        onClick={()=>setTags([...Tags , x])}
                        style={{ display: 'inline-block' , background:'#a1c5ff',color:'white', borderRadius:'20px' ,padding:'5px',margin:'5px',cursor:'pointer' }}>
                {x}</span>)}
                </div>

                <div className='form text-center' >
                <h1 className='fl'>How many languages can u speak?</h1>
                <input onChange={e=>setL1(e.target.value)} value={L1} />
                <span onClick={()=>{setLanguages([...Languages , L1]);setL1('')}} ><AddCircleIcon style={{fontSize:'30px',color:'grey'}}/></span>
                {Languages.map(x=>
                <span style={{ display: 'inline-block' , background:'#a1c5ff',color:'white', borderRadius:'20px' ,padding:'5px',margin:'5px',cursor:'pointer' }}>
                {x}{' '}<BackspaceIcon onClick={()=>{setLanguages(Languages.filter(e=>e !== x ))}} /></span>
                )}

                <h2 class='fl'>How many hours are you Avaliable per week ?</h2>
                <input type='number' onChange={e=>setAvaliable(e.target.value)} required ></input>

                <hr style={{height:'13px'}}/>
                <h1 class='fl'>Put Videos</h1>

                {Videos.map(x => <div>
                        <h1>{x.title}</h1>
                        <iframe width="100%" height="400px" src={`https://www.youtube.com/embed/${x.video}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <h4>{x.description}</h4>
                </div> )}

                

                <input value={Vid} onChange={e=>setVid(e.target.value)} placeholder='Youtube Link' /><br/>
                <input value={VidTitle} onChange={e=>setVidTitle(e.target.value)} placeholder='Video Title' /><br/>
                <textarea value={VidDesc} onChange={e=>setVidDesc(e.target.value)} placeholder='Video Decription' />
                <br/>
                <span 
                onClick={()=>{ setVideos([...Videos , {title : VidTitle , video : Vid , description : VidDesc  } ]) ; setVid('') ; setVidTitle('') ; setVidDesc('') }} >
                <AddCircleIcon style={{fontSize:'40px',color:'grey'}}/></span>        
                

                </div>


                <div className='row center'>
                <label />
                <button className='fl' style={{ margin:'40px 0px'  , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
                border: '1px solid transparent' }} type="submit"> Next </button>
                </div>

                </form>

                </div>

        )
}
