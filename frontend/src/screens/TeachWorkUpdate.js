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



export default function TeachWorkUpdate(props) {


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

        const [Languages, setLanguages] = useState([])
        const [L1, setL1] = useState('')





        useEffect(() => {


                if (!userInfo) {
                    history.push('/signin?redirect=joinAsTeacher')
                }
                
                console.log(props.match.params.id);
                axios.get(`/api/teachers/${props.match.params.id}`).then(res=>{

                    console.log(res.data);
                    setTiltle(res.data.title)
                    setDescription(res.data.description)
                    setBudget(res.data.budget)
                    setAvaliable(res.data.avaliableHours)
                    setTags(res.data.tags)
                    setLanguages(res.data.languages)
 
                })







        }, [ ])







        const submitHandler = (e) => {

                e.preventDefault()
                alert('something')
                axios.put(`/api/teachers/editpro` , {
                        by : userInfo._id ,
                        title : Tiltle ,
                        budget : Budget , 
                        description : Description,
                        tags : Tags ,
                        languages : Languages ,
                        negotiate : Negotiate,
                        avaliableHours : Avaliable,
                        
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

                {user && <p>setting up a teacher account for {user.userName}</p>}


                <form onSubmit={submitHandler}>
                <h1>What describes your Work ?</h1>
                <input onChange={e=>setTiltle(e.target.value)} value={Tiltle}  ></input>

                <h2>Give a description about your work</h2>
                <input onChange={e=>setDescription(e.target.value)} value={Description}  ></input>

                <h2>What will you charge for it hourly?</h2>
                <input type='number' onChange={e=>setBudget(e.target.value)} value={Budget}   ></input>
                <h3>Is it negotiable ?</h3>
                <div className='custom-control custom-switch'>
                <input type='checkbox' className='custom-control-input' id='x'
                onChange={()=>handleToggle()}readOnly
                />
                <label className='custom-control-label' htmlFor='x'>Is it negotiable ?</label>
                </div>

                <h1>Select your skills</h1>
                <input onChange={e=>setATag(e.target.value)} value={aTag} />
                <h2 onClick={()=>{setTags([...Tags , aTag]);setATag('')}} >Add</h2>
                {Tags && Tags.map(x=>
                        <span><h3>{x}</h3><span onClick={()=>{setTags(Tags.filter(e=>e !== x ))}} >remove</span></span>
                )}

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
