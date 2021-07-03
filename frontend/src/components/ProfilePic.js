import React, { Component, useState } from 'react'
import { useSelector } from 'react-redux';
import ImageProfilePic from './ImageProfilePic';
import Modal from './Modal';
import './ImageUpload.css'


function App() {
        const [selectedImg, setSelectedImg] = useState(null);


        
        return (
          <div className="AppFireGram">

                
            
            <ImageProfilePic setSelectedImg={setSelectedImg}  />
            { selectedImg && (
              <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
            )}
          </div>
        );
}
      
export default App;
