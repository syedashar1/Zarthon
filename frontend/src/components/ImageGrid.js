import React, { useEffect } from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch, useSelector } from 'react-redux';

const ImageGrid = ({ setSelectedImg }) => {



  const getDetails = useSelector((state) => state.getDetails);
  const { user } = getDetails;

        const dispatch = useDispatch();

        //here we take from firebase 
        const { docs } = useFirestore(`${user._id}`);
        




        useEffect(() => {
                // if( docs.length >= 6 ){
                //         dispatch({ type: MAX_LIMIT_REACHED });
                // }
                // if( docs.length < 6 ){
                //         dispatch({ type: MAX_LIMIT_NOT_REACHED });
                // }
                // if ( docs && docs.length !== 0){
                //         Axios.put(`/api/users/addimages/${userInfo._id}`, {docs} );
                //         console.log(docs);
                // }
              }, [dispatch , docs ]);

      
        

  return (
    <div className="img-grid">
      {user && user.posts.map(x => (
        <motion.div className="img-wrap container-ofouter-image" key={x._id} 
          layout
          whileHover={{ opacity: 1 }}s
          onClick={() => setSelectedImg(x._id)}
        >
          <img src={x.pic} alt="uploaded pic" className='image-to-hover'
          />
          <div className="middle-text">
          <h1> {x.likes.length} <FavoriteIcon/></h1>
          </div>  
        </motion.div>
      ))}
    </div>
  )
}

export default ImageGrid;