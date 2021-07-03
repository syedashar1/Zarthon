import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { projectFirestore, projectStorage, timestamp } from '../firebase/config';
import axios from 'axios';
import { useHistory } from "react-router-dom";


export default function ProPDFScreen() {

  const [File, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ['application/pdf'];
  const history = useHistory()

  const userInfo = useSelector((state) => state.userSignin.userInfo);
  const [Perc, setPerc] = useState(0)


  const handleChange = (e) => {
    e.preventDefault();

    if(e.target.files[0].type == 'application/pdf' ){
        console.log(e.target.files[0])
        setFile(e.target.files[0])

        const storageRef = projectStorage.ref(`PORTFOLIO/${userInfo._id}/${e.target.files[0].name}`);

        storageRef.put(e.target.files[0]).on('state_changed', (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setPerc(percentage);
        }, (err) => {
          setError(err);
        }, async () => {
          const url = await storageRef.getDownloadURL();
          console.log(url);
          axios.put(`/api/professionals/editpro` , {portfolio:url} ,  { headers: { Authorization: `Bearer ${userInfo.token}`} }  )
          .then(res => {
            if(res.data){
                    history.push('/profile')
            }



    } )

        })
    }




    // here u post on firebase

    

  };




    return (
        <div>

      


        <form className='text-center' >
      <label className=''>
        <input type="file" onChange={handleChange} ></input>
        {File && <h6>{File.name }</h6>}
        {File && <h6>{File.type }</h6>}
        <br></br>
      </label>
      <div className="output">
        { error && <div className="error">{ error }</div>}
        { File && <div>{ File.name }</div> }
        <h1>{Perc}%</h1>
        
      </div>

    
    </form>


        <button>Skip</button>
            
        </div>
    )
}