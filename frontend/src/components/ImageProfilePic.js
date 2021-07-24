import React, { useEffect } from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import UploadFormProfilePic from './UploadFormProfilePic';

const ImageGrid = ({ setSelectedImg }) => {



        const getDetails = useSelector((state) => state.getDetails);
        const { user } = getDetails;

        const userSignin = useSelector((state) => state.userSignin);
        const { userInfo } = userSignin;

        const dispatch = useDispatch();

        //here we take from firebase 
        const { docs } = useFirestore(`${user._id}'s profile-pic`);
        




        useEffect(() => {
                // if( docs.length >= 6 ){
                //         dispatch({ type: MAX_LIMIT_REACHED });
                // }
                // if( docs.length < 6 ){
                //         dispatch({ type: MAX_LIMIT_NOT_REACHED });
                // }

                // if(docs && docs[0]){
                //   Axios.put(`/api/users/profilepic`, { profilePic: docs[0].url } , {
                //     headers: {
                //       Authorization: `Bearer ${userInfo.token}`,
                      
                //     } } )
                //   console.log(docs[0].url);
                //   }
                
                
              }, [dispatch , docs ]);

      
        

  return (
    <div className="text-center" style={{maxWidth:'300px',minWidth:'130px' }}  >

    {user._id === userInfo._id ? <UploadFormProfilePic /> : 
    user && user.active ? 
    <div className='imgUpload' style={{position:'absolute' , bottom : '-30px',right:'90px',zIndex:'1000'}} >
    <label className='imgUploadLabel' style={{background:'lightgreen' , border:'0px'}} />
    </div> : 
    <div className='imgUpload' style={{position:'absolute' , bottom : '-30px',right:'90px',zIndex:'1000'}} >
    <label className='imgUploadLabel' style={{background:'lightgrey' , border:'0px'}} />
    </div>

    }
<motion.div className="img-wrap" 
          layout
          whileHover={{ opacity : 1 }}s
        //   onClick={() => setSelectedImg(docs[0].url)}
          style = {{ zIndex: 1 , overflow :'hidden' , borderRadius:'50%',textAlign:'center'}}
        >

<div>
            <motion.img 
          src={ docs && docs[0] ? docs[0].url : 'https://i.pinimg.com/236x/a0/4d/84/a04d849cf591c2f980548b982f461401.jpg'
        
        } 
          alt="uploaded pic"
          style={{zIndex:-100 , textAlign:'center'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            
          />
</div>
          
</motion.div>
        


    </div>
  )
}

export default ImageGrid;