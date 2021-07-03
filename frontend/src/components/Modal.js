import React from 'react';
import { motion } from 'framer-motion';
import SinglePost from './SinglePost';
import { useSelector } from 'react-redux';
import { Container, Image, Row } from 'react-bootstrap';
import ModaL from "react-modal"

const Modal = ({ setSelectedImg, selectedImg , postBy }) => {

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  }
  const user = useSelector((state) => state.getDetails.user);

  return (
    <motion.div className="backdrop" onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* <motion.img src={selectedImg} alt="enlarged pic" 
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      /> */}

      { selectedImg && 
              <ModaL 
              style={{
                content: {
                  margin: 'auto',
                  border: '1px solid #ccc',
                  borderRadius: '0px',
                  padding: '0px',
                  maxWidth:'1250px',
                }
              }}
              

               isOpen ={true} onRequestClose = { ()=>setSelectedImg(null) } >
              
              <Container style={{padding:'0px'}}>
              <SinglePost id={postBy || user._id} postid={selectedImg} inModal={true} />
              </Container>

              </ModaL>
      }      

      

    </motion.div>
  )
}

export default Modal;