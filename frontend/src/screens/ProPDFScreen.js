import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { projectFirestore, projectStorage, timestamp } from '../firebase/config';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { motion } from 'framer-motion';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

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
        <div className='portfolio '>


      
      <div className='row center'>
                <label />
                <button style={{height :'55px' , borderRadius:'0px' ,backgroundColor:'#0095f6' , color:'white',
                border: '1px solid transparent' }} type="submit" onClick={()=>history.push('/profile')}> Skip </button>
      </div>


        <form className='text-center' >
        <p style={{fontSize:'35px',color:'grey'}} > Upload Portfolio <PictureAsPdfIcon style={{fontSize:'65px',color:'grey'}}/></p>
      <label className=''>
        <input type="file" onChange={handleChange} ></input>
        {File && <h6>{File.name }</h6>}
        {File && <h6>{File.type }</h6>}
        <br></br>
      </label>
      <div className="output">
        { error && <div className="error">{ error }</div>}
        { File && <div>{ File.name }</div> }
        <div className='progress-barsub'>
        <motion.div className="progress-bar" initial={{ width: 0 }} animate={{ width: Perc + '%' }}/>
        </div>
        
      </div>
      
    </form>



            
        </div>
    )
}
