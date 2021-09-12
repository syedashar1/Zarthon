import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { projectFirestore, projectStorage, timestamp } from '../firebase/config';
import useFirestore from '../hooks/useFirestore';
import Slide from 'react-reveal/Slide';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { motion } from 'framer-motion';
import { Col, Container, Row } from 'react-bootstrap';
import CheckIcon from '@material-ui/icons/Check';
import countryList from './countries'

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

export default function GigUpdateScreen(props) {


    const dispatch = useDispatch()
    const history = useHistory()
    const productId = props.match.params.id;

    const userInfo = useSelector((state) => state.userSignin.userInfo);
    const user = useSelector((state) => state.getDetails.user);


    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [Pics, setPics] = useState([])
    const [Nego, setNego] = useState(false)
    const [Tags, setTags] = useState([])
    const [aTag, setATag] = useState('')
    const [Country, setCountry] = useState('')

    const [Bname, setBname] = useState('')
    const [Bprice, setBprice] = useState(0)
    const [Bdesc, setBdesc] = useState('')
    const [Brevisions, setBrevisions] = useState(0)
    const [Bdelivery, setBdelivery] = useState(0)
    const [BOFFERS, setBOFFERS] = useState([])
    const [Boffer, setBoffer] = useState('')

    
    const [Sname, setSname] = useState('')
    const [Sprice, setSprice] = useState(0)
    const [Sdesc, setSdesc] = useState('')
    const [Srevisions, setSrevisions] = useState(0)
    const [Sdelivery, setSdelivery] = useState(0)
    const [SOFFERS, setSOFFERS] = useState([])
    const [Soffer, setSoffer] = useState('')



    const [Pname, setPname] = useState('')
    const [Pprice, setPprice] = useState(0)
    const [Pdesc, setPdesc] = useState('')
    const [Previsions, setPrevisions] = useState(0)
    const [Pdelivery, setPdelivery] = useState(0)
    const [POFFERS, setPOFFERS] = useState([])
    const [Poffer, setPoffer] = useState('')

    const [File, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [Perc, setPerc] = useState(0)



    useEffect(() => {
        axios.get(`/api/gigs/${props.match.params.id}`).then(res => {
            if(res.data){

                if(res.data.by !== userInfo._id) history.push('/')

                setTitle(res.data.title)
                setDescription(res.data.description)
                setPics(res.data.gigPics)
                setNego(res.data.negotiable)
                setTags(res.data.tags)
                setCountry(res.data.country)

                setBname(res.data.beginner.title)
                setBdesc(res.data.beginner.desc)
                setBdelivery(res.data.beginner.delivery)
                setBOFFERS(res.data.beginner.offers)
                setBprice(res.data.beginner.price)
                setBrevisions(res.data.beginner.revisions)

                setSname(res.data.standard.title)
                setSdesc(res.data.standard.desc)
                setSdelivery(res.data.standard.delivery)
                setSOFFERS(res.data.standard.offers)
                setSprice(res.data.standard.price)
                setSrevisions(res.data.standard.revisions)

                setPname(res.data.standard.title)
                setPdesc(res.data.standard.desc)
                setPdelivery(res.data.standard.delivery)
                setPOFFERS(res.data.standard.offers)
                setPprice(res.data.standard.price)
                setPrevisions(res.data.standard.revisions)

            }
        }

        )
    }, [])



    const handleChange = (e) => {
        e.preventDefault();
    
        if(e.target.files[0].type == 'image/png' || e.target.files[0].type  == 'image/jpeg' ){
            console.log(e.target.files[0])
            setFile(e.target.files[0])
    
            const storageRef = projectStorage.ref(`Gigs/${userInfo._id}/${e.target.files[0].name}`);
        
            storageRef.put(e.target.files[0]).on('state_changed', (snap) => {
              let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
              setPerc(percentage);
            }, (err) => {
              setError(err);
            }, async () => {
              const url = await storageRef.getDownloadURL();
              setPerc(0);
              console.log(url);
              setPics([...Pics , url])
              
    
            })
        }
    
      };











    const updateHandler = (e) => {
        e.preventDefault()

        

        const updatedGig = {

        title : Title,
        description : Description , 
        gigPics : Pics ,
        negotiable : Nego,
        tags : Tags ,
        country : Country , 

        beginner : {
                title : Bname ,
                desc : Bdesc , 
                delivery : Bdelivery ,
                revisions : Brevisions ,
                offers : BOFFERS ,
                price : Bprice,
        } , 


        standard : {
                title : Sname ,
                desc : Sdesc , 
                delivery : Sdelivery ,
                revisions : Srevisions ,
                offers : SOFFERS,
                price : Sprice,
        } , 


        premium : {
                title : Pname ,
                desc : Pdesc , 
                delivery : Pdelivery ,
                revisions : Previsions ,
                offers : POFFERS,
                price : Pprice,
        } , 

        }


        axios.put(`/api/gigs/update-gig/${props.match.params.id}` , updatedGig ,  { headers: { Authorization: `Bearer ${userInfo.token}`} } )
        .then(res => {
            if(res.data) history.push(`/gigs/${props.match.params.id}`)
        })

        console.log(updatedGig);


    }
    
    const handleToggle = () => {
        if(Nego){
                setNego(false)
        }
        else{
                setNego(true)
            }}



    
    return (
        <div>
        <br/>
        <form onSubmit={updateHandler} >

        <Slide right>
        <div className='form text-center' >
        <p className='logo'>Zarthon Gig</p>
        <input style={{fontSize:'25px'}} value={Title} onChange={(e)=>setTitle(e.target.value)} placeholder='Gig Title' />
        <br/> <br/>
        <textarea value={Description} onChange={(e)=>setDescription(e.target.value)} rows='7' cols='45' placeholder='Describe your Gig in detail' />

        <div className='row center' >
        <div className='custom-control custom-switch text-center'>
        
        <input  type='checkbox' className='custom-control-input' id='x' onChange={()=>handleToggle()}readOnly/>
        <label className='custom-control-label' htmlFor='x' >Is it negotiable ?</label>
        
        </div>
        </div>

        <h1>Select your skills</h1>
                {Tags && Tags.map(x=>
                        <span style={{ display: 'inline-block' , background:'#a1c5ff',color:'white', borderRadius:'20px' ,padding:'5px',margin:'5px',cursor:'pointer' }}>
                        {x}{' '}<BackspaceIcon onClick={()=>{setTags(Tags.filter(e=>e !== x ))}} /></span>
                )}<br/><br/>
                <input onChange={e=>setATag(e.target.value)} value={aTag} />
                <span onClick={()=>{setTags([...Tags , aTag]);setATag('')}} ><AddCircleIcon style={{fontSize:'30px',color:'grey'}}/></span>
        </div>
        </Slide>
        
        <br/>

        <Slide right>
        <div className='form text-center' style={{maxWidth:'1000px'}}>
        <p>{Pics.map(x=><span style={{textAlign:'center'}}>
                <img src={x} style={{width:'300px',height:'200px'}} />
                <button type='disabled' onClick={()=>setPics(Pics.filter(e=>e !== x))}>X</button>
                </span>)}</p>
        <hr/>                
        <h1>Upload Pics</h1>
        <input type='file' onChange={handleChange} ></input>
        <div className='progress-barsub'>
        <motion.div className="progress-bar" initial={{ width: 0 }} animate={{ width: Perc + '%' }}/>
        </div>
        </div>
        </Slide>
        
        <br/>
        <div  className='form text-center'>
                <h1 className='fl' >Set Country : {' '} {Country} </h1>
                <FormControl>
                <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
                <Select  labelId="demo-mutiple-name-label" id="demo-mutiple-name" value={Country} input={<Input />} onChange={(e)=>setCountry(e.target.value)}>
                {countryList.map((name) => ( <p><MenuItem key={name} onClick={()=>setCountry(name)} value={name} >{name}</MenuItem></p> ))}
                </Select>
                </FormControl>
        </div>
        

        <br/>
        <div className='row center top'>
        
        <Slide left>
        <div className='basic form text-center' style={{width:'100%'}} >
        <h1>Basic Offer</h1>
        <input value={Bname} onChange={(e)=>setBname(e.target.value)} placeholder='title' />
        <br/><br/>
        <textarea value={Bdesc} onChange={(e)=>setBdesc(e.target.value)} rows='3' cols='30' placeholder='Description'/>
        <br/>
        <h1>set Budget</h1>
        <input value={Bprice} type='number' onChange={(e)=>setBprice(e.target.value)} />
        
        <h1>delivery</h1>
        <input value={Bdelivery}  type='number' onChange={(e)=>setBdelivery(e.target.value)} style={{width:'70px'}} />
        
        <h1>revisions</h1>
        <input value={Brevisions}  type='number' onChange={(e)=>setBrevisions(e.target.value)} style={{width:'70px'}}/>
        
        
        <h1>Add offers</h1>
        <input onChange={e=>setBoffer(e.target.value)} value={Boffer} />
        <span onClick={()=>{setBOFFERS([...BOFFERS , Boffer]);setBoffer('')}} ><AddCircleIcon style={{fontSize:'20px',color:'grey'}}/></span>
        <hr/>
        <p style={{textAlign:'left', margin:'15px' }}>
        {BOFFERS && BOFFERS.map(x=>
                <span><h3><CheckIcon/>{x}</h3><span onClick={()=>{setBOFFERS(BOFFERS.filter(e=>e !== x ))}} ></span></span>
        )}
        </p>
        </div>
        </Slide>


        <Slide bottom>
        <div className='standard form text-center' style={{width:'100%'}} >
        <h1>Standard Offer</h1>
        <input value={Sname} onChange={(e)=>setSname(e.target.value)} placeholder='title' />
        <br/><br/>
        <textarea value={Sdesc} onChange={(e)=>setSdesc(e.target.value)} rows='3' cols='30' placeholder='Description'/>
        <br/>
        <h1>set Budget</h1>
        <input value={Sprice} type='number' onChange={(e)=>setSprice(e.target.value)} />
        <h1>set delivery time</h1>
        <input value={Sdelivery}  type='number' onChange={(e)=>setSdelivery(e.target.value)} />
        <h1>set revisions</h1>
        <input value={Srevisions}  type='number' onChange={(e)=>setSrevisions(e.target.value)} />
        
        <h1>Add offers</h1>
        <input onChange={e=>setSoffer(e.target.value)} value={Soffer} />
        <span onClick={()=>{setSOFFERS([...SOFFERS , Soffer]);setSoffer('')}} ><AddCircleIcon style={{fontSize:'20px',color:'grey'}}/></span>
        <hr/>
        <p  style={{textAlign:'left', margin:'15px' }}>
        {SOFFERS && SOFFERS.map(x=>
                <span><h3><CheckIcon/>{x}</h3><span onClick={()=>{setSOFFERS(SOFFERS.filter(e=>e !== x ))}} >remove</span></span>
        )}
        </p>
        </div>
        </Slide>


        <Slide right>
        <div className='premium form text-center' style={{width:'100%'}} >
        <h1>Premium Offer</h1>
        
        <input value={Pname} onChange={(e)=>setPname(e.target.value)} placeholder='title' />
        <br/><br/>
        <textarea value={Pdesc} onChange={(e)=>setPdesc(e.target.value)} rows='3' cols='30' placeholder='Description'  />
        <br/>
        <h1>set Budget</h1>
        <input value={Pprice} type='number' onChange={(e)=>setPprice(e.target.value)} />
        <h1>set delivery time</h1>
        <input value={Pdelivery}  type='number' onChange={(e)=>setPdelivery(e.target.value)} />
        <h1>set revisions</h1>
        <input value={Previsions}  type='number' onChange={(e)=>setPrevisions(e.target.value)} />
        
        <h1>Add offers</h1>
        <input onChange={e=>setPoffer(e.target.value)} value={Poffer} />
        <span onClick={()=>{setPOFFERS([...POFFERS , Poffer]);setPoffer('')}} ><AddCircleIcon style={{fontSize:'20px',color:'grey'}}/></span>
        <hr/>
        <p style={{textAlign:'left' , margin:'15px' }}>
        {POFFERS && POFFERS.map(x=>
                <span><h3><CheckIcon/>{x}</h3><span onClick={()=>{setPOFFERS(POFFERS.filter(e=>e !== x ))}} >remove</span></span>
        )}
        </p>
        </div>

        </Slide>
        

        </div>
        <br/>
        <div className='row center'>
                <label />
                <button style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
                border: '1px solid transparent' }} type="submit"> Update </button>
         </div>
         <br/><br/>
        </form>
        
            
        </div>
    )
}
