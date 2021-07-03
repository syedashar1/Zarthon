import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { projectFirestore, projectStorage, timestamp } from '../firebase/config';
import useFirestore from '../hooks/useFirestore';

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
        <div><button onClick={()=>console.log(Pics)} >click</button>
        <form onSubmit={updateHandler} >
        
        <h1>Gig Name</h1>
        <input value={Title} onChange={(e)=>setTitle(e.target.value)} />

        <h1>Gig Description</h1>
        
        <textarea value={Description} onChange={(e)=>setDescription(e.target.value)} rows='8' cols='40' />

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

        <p>{Pics.map(x=><span style={{textAlign:'center'}}>
                <img src={x} style={{width:'400px',height:'300px'}} />
                <button type='disabled' onClick={()=>setPics(Pics.filter(e=>e !== x))}>X</button>
                </span>)}</p>

        <h1>Upload Pics</h1>
        <input type='file' onChange={handleChange} ></input>
        {Perc}%



        <div className='basic' >
        <h1>Give a sub title for Basic</h1>
        <input value={Bname} onChange={(e)=>setBname(e.target.value)} />
        <h1>describes</h1>
        <textarea value={Bdesc} onChange={(e)=>setBdesc(e.target.value)} rows='3' cols='40' />

        <h1>set Budget</h1>
        <input value={Bprice} type='number' onChange={(e)=>setBprice(e.target.value)} />
        <h1>set delivery time</h1>
        <input value={Bdelivery}  type='number' onChange={(e)=>setBdelivery(e.target.value)} />
        <h1>set revisions</h1>
        <input value={Brevisions}  type='number' onChange={(e)=>setBrevisions(e.target.value)} />
        
        <h1>Add offers</h1>
        <input onChange={e=>setBoffer(e.target.value)} value={Boffer} />
        <h2 onClick={()=>{setBOFFERS([...BOFFERS , Boffer]);setBoffer('')}} >Add</h2>
        {BOFFERS && BOFFERS.map(x=>
                <span><h3>{x}</h3><span onClick={()=>{setBOFFERS(BOFFERS.filter(e=>e !== x ))}} >remove</span></span>
        )}
        </div>




        <div className='standard' >
        <h1>Give a sub title for Standard</h1>
        <input value={Sname} onChange={(e)=>setSname(e.target.value)} />
        <h1>describes</h1>
        <textarea value={Sdesc} onChange={(e)=>setSdesc(e.target.value)} rows='3' cols='40' />

        <h1>set Budget</h1>
        <input value={Sprice} type='number' onChange={(e)=>setSprice(e.target.value)} />
        <h1>set delivery time</h1>
        <input value={Sdelivery}  type='number' onChange={(e)=>setSdelivery(e.target.value)} />
        <h1>set revisions</h1>
        <input value={Srevisions}  type='number' onChange={(e)=>setSrevisions(e.target.value)} />
        
        <h1>Add offers</h1>
        <input onChange={e=>setSoffer(e.target.value)} value={Soffer} />
        <h2 onClick={()=>{setSOFFERS([...SOFFERS , Soffer]);setSoffer('')}} >Add</h2>
        {SOFFERS && SOFFERS.map(x=>
                <span><h3>{x}</h3><span onClick={()=>{setSOFFERS(SOFFERS.filter(e=>e !== x ))}} >remove</span></span>
        )}
        </div>


        <div className='premium' >
        <h1>Give a sub title for Premium</h1>
        <input value={Pname} onChange={(e)=>setPname(e.target.value)} />
        <h1>describes</h1>
        <textarea value={Pdesc} onChange={(e)=>setPdesc(e.target.value)} rows='3' cols='40' />

        <h1>set Budget</h1>
        <input value={Pprice} type='number' onChange={(e)=>setPprice(e.target.value)} />
        <h1>set delivery time</h1>
        <input value={Pdelivery}  type='number' onChange={(e)=>setPdelivery(e.target.value)} />
        <h1>set revisions</h1>
        <input value={Previsions}  type='number' onChange={(e)=>setPrevisions(e.target.value)} />
        
        <h1>Add offers</h1>
        <input onChange={e=>setPoffer(e.target.value)} value={Poffer} />
        <h2 onClick={()=>{setPOFFERS([...POFFERS , Poffer]);setPoffer('')}} >Add</h2>
        {POFFERS && POFFERS.map(x=>
                <span><h3>{x}</h3><span onClick={()=>{setPOFFERS(POFFERS.filter(e=>e !== x ))}} >remove</span></span>
        )}
        </div>


        <h1><button type='submit'>UPDATE</button></h1>

        </form>
        
            
        </div>
    )
}
