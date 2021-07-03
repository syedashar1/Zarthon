import React, { useEffect } from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const ImageGridExplore = ({ setSelectedImg , state}) => {



  const getDetails = useSelector((state) => state.getDetails);
  const { user } = getDetails;
        
      
        

  return (
    <div className="img-grid">
      {state.map(x => (
        <motion.div className="img-wrap container-ofouter-image" key={x._id} 
          layout
          whileHover={{ opacity: 1 }}s
          onClick={() => setSelectedImg(x._id)}
        >
          <img src={x.pic} alt="uploaded pic" className='image-to-hover'
          />
          <div className="middle-text">
          <p>{x.totalLikes}</p>
          </div>  
        </motion.div>
      ))}
    </div>
  )
}

export default ImageGrid;