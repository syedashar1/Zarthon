import React, { useState } from 'react';
import ProgressBarProfilePic from './ProgressBarProfilePic';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import imageCompression from 'browser-image-compression';
import 'globalthis/auto';


const UploadFormProfilePic = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ['image/png', 'image/jpeg'];

  const options = {
    maxSizeMB: 0.04,
    maxWidthOrHeight: 720,
    useWebWorker: true
  }



  const handleChange  = async (e) => {
    var selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      
      
      let output;
      imageCompression(selected, options).then(x => {
      output = x;
      setFile(output);
      setError('');
    });



      
    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)');
    }
  };

  return (
    <form className='imgUpload' style={{position:'absolute' , bottom : '-80px',right:'60px',zIndex:'1000'}} >
      <label className='imgUploadLabel' >
        <input type="file" className="filee" onChange={handleChange} ></input>
        <CameraAltIcon style={{fontSize:'35px'}}></CameraAltIcon>
      </label>
      <div className="output">
        { error && <div className="error">{ error }</div>}
        { file && <div>{ file.name }</div> }
        { file && <ProgressBarProfilePic file={file} setFile={setFile} /> }
      </div>
    </form>
  );
}

export default UploadFormProfilePic;