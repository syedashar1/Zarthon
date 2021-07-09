import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { projectFirestore, projectStorage, timestamp } from '../firebase/config';
import axios from 'axios';
import { useHistory } from "react-router-dom";


export default function ProVideo() {

  const [File, setFile] = useState(null);
  const [error, setError] = useState(null)
  const [Title, setTitle] = useState(null)
  const [Desc, setDesc] = useState(null)
  const [Vid, setVid] = useState(null)
  const [VIDEOS, setVIDEOS] = useState([])
  const history = useHistory()

  const userInfo = useSelector((state) => state.userSignin.userInfo);
  const [Perc, setPerc] = useState(0)


  const submitHandler = () => {
    axios.put(`/api/professionals/editpro` , {videos:VIDEOS} ,  { headers: { Authorization: `Bearer ${userInfo.token}`} }  )
          .then(res => { if(res.data){history.push('/profile')}} )
  }


  const handleChange = (e) => {
    e.preventDefault();

    if(File.type == 'video/mp4' ){

        const storageRef = projectStorage.ref(`VIDEOS/${userInfo._id}/${File.name}`);

        storageRef.put(File).on('state_changed', (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setPerc(percentage);
        }, (err) => {
          setError(err);
        }, async () => {
          const url = await storageRef.getDownloadURL();
          console.log(url);
          setVIDEOS([...VIDEOS , {
              title : Title , 
              video : url ,
              description : Desc
          }])

          setTitle('') ; setDesc('') ; setVid(null) ; setPerc(0)

    } )

        
    }




    // here u post on firebase

    

  };




    return (
        <div>

      


        <form className='text-center' onSubmit={handleChange} >
      <label className=''>
        <input type="file" onChange={(e)=>setFile(e.target.files[0])} required ></input>
        {File && <h6>{File.name }</h6>}
        {File && <h6>{File.type }</h6>}
        <h1>Enter Title</h1>
        <input value={Title} onChange={(e)=>setTitle(e.target.value)} required></input>
        <h1>Enter Description</h1>
        <input value={Desc} onChange={(e)=>setDesc(e.target.value)} ></input>
        <button type='submit'>ADD Video</button>
        <br></br>
      </label>
      <div className="output">
        { error && <div className="error">{ error }</div>}
        { File && <div>{ File.name }</div> }
        <h1>{Perc}%</h1>
        
      </div>

    
    </form>

        <button onClick={submitHandler} >Update</button>

        <button onClick={()=>history.push('/profile')} >Skip</button>
            
        </div>
    )
}
