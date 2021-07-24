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
import { Col, Container, Row , Form } from 'react-bootstrap';
import CheckIcon from '@material-ui/icons/Check';
import { SocketProvider } from '../chat/contexts/SocketProvider';
import { useHistory } from "react-router-dom";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import countryList from './countries'


export default function PostAJobScreen(props) {

        const dispatch = useDispatch()
        const productId = props.match.params.id;
        const history = useHistory()


        const userInfo = useSelector((state) => state.userSignin.userInfo);
        const user = useSelector((state) => state.getDetails.user);



        const [Tiltle, setTiltle] = useState('')
        const [Description, setDescription] = useState('')
        const [Budget, setBudget] = useState(0)
        const [MinBudget, setMinBudget] = useState(0)
        const [MaxBudget, setMaxBudget] = useState(0)
        const [Tags, setTags] = useState([])
        const [aTag, setATag] = useState('')
        const [Location, setLocation] = useState('any')
        const [Scale, setScale] = useState('small')
        const [Type, setType] = useState('hourly')


        const [Selectt, setSelectt] = useState([
                'Web Developer','App Developer' , 'MERN Stack' , 'Drop Shipper' , 'C++ Developer' , 'High Frequency Trading Software Developer' ,
                'Designer' , 'Illustrator' , 'Grapic Designer' , 'Forex Trader' , 'SQL Developer' , 'WordPress' , 'Ecomerce Developer' , 
                'Data Entry Specialists' , 'Video Editors' , 'Data Analyst' , 'Shopify Developer'
        ])


        useEffect(() => { if (!userInfo) { history.push('/signin?redirect=postAJob') } }, [ user ])


        const submitHandler = (e) => {

                e.preventDefault()
                
                axios.post(`/api/jobs/postjob` , {
                        by : userInfo._id ,
                        title : Tiltle ,
                        budget : Budget , 
                        minBudget : MinBudget , 
                        maxBudget : MaxBudget , 
                        description : Description,
                        tags : Tags ,
                        location : Location ,
                        scale : Scale ,
                        type : Type 
                        
                }, { headers: { Authorization: `Bearer ${userInfo.token}`} } )
                .then(res => {
                        if(res.data){
                                console.log(res.data);                              
                        }

                } )
                



        }



        return (
        <div>

<div  className='form text-center'>
                <p className='logo'>Zarthon Job</p>
                {user && <p>(Posting a Job for {user.userName})</p>}
                </div>

                
                <form onSubmit={submitHandler}>

                <div className='form text-center'>
                <h1 className='fl' >Write A Tilte For Your Job</h1>
                <input onChange={e=>setTiltle(e.target.value)} required ></input>

                <h2 className='fl' >Give a description about your Job</h2>
                <textarea onChange={e=>setDescription(e.target.value)} required rows='8' cols='40' />

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

                <div  className='form text-center'>
                <h1 className='fl' >Select the Scale of your Job</h1>
                <Form >
                {['small', 'medium' ,'large' ].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                <Form.Check type='checkbox' id={`default-${type}`}  label={`${type}-scale job`}
                onChange={()=>setScale(type)}  checked = { type === Scale }/>
                </div>
                ))}
                </Form>
                </div>


                <div  className='form text-center'>
                <h1 className='fl' >Set The Budget</h1>
                <Form >
                {['hourly' , 'lumpsum' ].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                <Form.Check type='checkbox' id={`default-${type}`}  label={`${type}`}
                onChange={()=>setType(type)}  checked = { type === Type }/>
                </div>                
                ))}

                <div>
                Min : <input type='number' onChange={(e)=>setMinBudget(e.target.value)} style={{maxWidth:'100px',margin:'10px'}} /> 
                Max : <input type='number' onChange={(e)=>setMaxBudget(e.target.value)} style={{maxWidth:'100px',margin:'10px'}}/> 
                {Type =='hourly' ? 'per hour' : 'total' }
                </div>

                </Form>
                </div>



                <div  className='form text-center'>
                <h1 className='fl' >Set Country : {' '} {Location} </h1>
                <FormControl>
                <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
                <Select  labelId="demo-mutiple-name-label" id="demo-mutiple-name" value={Location} input={<Input />} onChange={(e)=>setLocation(e.target.value)}>
                {countryList.map((name) => ( <p><MenuItem key={name} onClick={()=>setLocation(name)} value={name} >{name}</MenuItem></p> ))}
                </Select>
                </FormControl>
                </div>




                <div className='row center'>
                <label />
                <button className='fl' style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
                border: '1px solid transparent' }} type="submit"> Next </button>
                
                
                </div>
                </form>
                        
        </div>
        )
}
