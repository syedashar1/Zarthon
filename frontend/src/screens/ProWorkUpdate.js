import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row } from 'react-bootstrap';
import ProfilePic from "../components/ProfilePic"
import { update, userDetails, userSuggest } from '../actions/userActions';
import Modal from "react-modal"
import Zoom from "react-reveal/Zoom"
import axios from 'axios';
import ChatApp from '../chat/components/ChatApp';
import TabPanel from "../components/UserProfileTabs"
import UploadForm from "../components/UploadForm"
import HeadShake from 'react-reveal/HeadShake';
import Suggestions from '../components/Suggestions';
import { SocketProvider } from '../chat/contexts/SocketProvider';
import { useHistory } from "react-router-dom";
import BackspaceIcon from '@material-ui/icons/Backspace';



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

        const [Selectt, setSelectt] = useState([
                'Web Developer','App Developer' , 'MERN Stack' , 'Drop Shipper' , 'C++ Developer' , 'High Frequency Trading Software Developer' ,
                'Designer' , 'Illustrator' , 'Grapic Designer' , 'Forex Trader' , 'SQL Developer' , 'WordPress' , 'Ecomerce Developer' , 
                'Data Entry Specialists' , 'Video Editors' , 'Data Analyst' , 'Shopify Developer'
                ])


        const [Tiltle, setTiltle] = useState('')
        const [Description, setDescription] = useState('')
        const [Budget, setBudget] = useState(0)
        const [Tags, setTags] = useState([])
        const [aTag, setATag] = useState('')
        const [Negotiate, setNegotiate] = useState(false)
        const [Avaliable, setAvaliable] = useState(0)
        const [Country, setCountry] = useState('')

        const [Languages, setLanguages] = useState([])
        const [L1, setL1] = useState('')





        useEffect(() => {


                if (!userInfo) {
                    history.push('/signin?redirect=joinAsProWorker')
                }
                
                console.log(props.match.params.id);
                axios.get(`/api/professionals/${props.match.params.id}`).then(res=>{

                    console.log(res.data);
                    setTiltle(res.data.title)
                    setDescription(res.data.description)
                    setBudget(res.data.budget)
                    setAvaliable(res.data.avaliableHours)
                    setTags(res.data.tags)
                    setLanguages(res.data.languages)
                    setCountry(res.data.country)


                })





        }, [ ])







        const submitHandler = (e) => {

                e.preventDefault()
                console.log(Negotiate);
                axios.put(`/api/professionals/editpro` , {
                        by : userInfo._id ,
                        title : Tiltle ,
                        budget : Budget , 
                        description : Description,
                        tags : Tags ,
                        languages : Languages ,
                        negotiate : Negotiate,
                        avaliableHours : Avaliable,
                        country : Country ,
                        
                }, { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                .then(res => {
                        if(res.data){
                                console.log(res.data);
                                history.push('/profile')
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

                {user && <p>setting up a professional account for {user.userName}</p>}


                <form onSubmit={submitHandler} className='form text-center' >
                <h1>What describes your Work ?</h1>
                <input onChange={e=>setTiltle(e.target.value)} value={Tiltle}  ></input>

                <h2>Give a description about your work</h2>
                <input onChange={e=>setDescription(e.target.value)} value={Description}  ></input>

                <h2>What will you charge for it hourly?</h2>
                <input type='number' onChange={e=>setBudget(e.target.value)} value={Budget}   ></input>
                <h3>Is it negotiable ?</h3>
                <div className='custom-control custom-switch row center'>
                <input type='checkbox' className='custom-control-input' id='x'
                onChange={()=>handleToggle()}readOnly
                />
                <label className='custom-control-label' htmlFor='x'></label>
                </div>

                <h1>Select your skills</h1>
                {Tags && Tags.map(x=>
                        <span style={{ display: 'inline-block' , background:'#a1c5ff',color:'white', borderRadius:'20px' ,padding:'5px',margin:'5px',cursor:'pointer' }}>
                        {x}{' '}<BackspaceIcon onClick={()=>{setTags(Tags.filter(e=>e !== x ))}} /></span>
                )}<br/><br/>
                <input onChange={e=>setATag(e.target.value)} value={aTag} />
                <span onClick={()=>{setTags([...Tags , aTag]);setATag('')}} >Add</span>
                <h1>Or select from these </h1>
                {Selectt.map(x=><span 
                        onClick={()=>setTags([...Tags , x])}
                        style={{ display: 'inline-block' , background:'#a1c5ff',color:'white', borderRadius:'20px' ,padding:'5px',margin:'5px',cursor:'pointer' }}>
                {x}</span>)}
                

                <h1>How many languages can u speak?</h1>
                <input onChange={e=>setL1(e.target.value)} value={L1} />
                <h2 onClick={()=>{setLanguages([...Languages , L1]);setL1('')}} >Add</h2>
                {Languages && Languages.map(x=>
                        <span><h3>{x}</h3><span onClick={()=>{setLanguages(Languages.filter(e=>e !== x ))}} >remove</span></span>
                )}

                <h2>How many hours are you Avaliable per week ?</h2>
                <input type='number' onChange={e=>setAvaliable(e.target.value)}  ></input>

                <button type='submit'>Next</button>

                </form>


                </div>
        )
}
