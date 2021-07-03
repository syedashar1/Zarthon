import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [selected, setselected] = useState(null)
  const [caption, setcaption] = useState('')

  const types = ['image/png', 'image/jpeg'];

  const handleChange = (e) => {
    e.preventDefault();

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
      setselected(null)
      console.log(caption);

    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)');
    }
  };


  const handleChange1 = (e) => {
    e.preventDefault();
    setselected( e.target.files[0])
    console.log(selected);
  };



  return (
    <form className='text-center' onSubmit={handleChange} >
      <label className=''>
        <input type="file" style={{display:'none'}} onChange={handleChange1} ></input>
        {selected &&<input type='text' placeholder='write something about' onChange={(e) => setcaption(e.target.value)} ></input>}
        {selected && <h6>{selected.name }</h6>}
        {selected && <button style={{marginBottom:'50px'}} type="submit" >upload</button> }
        <br></br>
        <CameraAltIcon style={{fontSize:'90px',cursor:'pointer'}}></CameraAltIcon>
        <h5>Create</h5>
      </label>
      <div className="output">
        { error && <div className="error">{ error }</div>}
        { file && <div>{ file.name }</div> }
        { file && <ProgressBar file={file} setFile={setFile} caption={caption} setcaption={setcaption} /> }
        
      </div>

    
    </form>
  );
}

export default UploadForm;