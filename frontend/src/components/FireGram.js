import React, {useState } from 'react'
import ImageGrid from './ImageGrid';
import Modal from './Modal';
import './new.css'


function App() {
        const [selectedImg, setSelectedImg] = useState(null);
        
        return (
          <div>

            {/* {user._id === userInfo._id && <UploadForm />} */}
                
            
            <ImageGrid setSelectedImg={setSelectedImg} />
            { selectedImg && (
              <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
            )}
          </div>
        );
}
      
      export default App;
