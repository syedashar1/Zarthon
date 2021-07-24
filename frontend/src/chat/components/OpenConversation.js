import React, { useState, useCallback, useEffect } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { motion } from 'framer-motion';
import { projectStorage } from '../../firebase/config';
import { useSelector } from 'react-redux';

export default function OpenConversation() {
  const [text, setText] = useState('')
  const [Perc, setPerc] = useState(0)
  const userInfo = useSelector((state) => state.userSignin.userInfo);
  const [Pic, setPic] = useState(null)



  const handleChange = (e) => {
    e.preventDefault();
    if(e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpeg' ){

        const storageRef = projectStorage.ref(`MSG-PICS-ZARTHON/${userInfo._id}/${e.target.files[0].name}`);

        storageRef.put(e.target.files[0]).on('state_changed', (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setPerc(percentage);
        }, (err) => {
        }, async () => {
          const url = await storageRef.getDownloadURL();
          console.log(url);
          setPic(url)
          setPerc(0)
          
    })
    }
  };

  useEffect(() => {
    
    if(Pic && Pic !== ''){
      sendMessage( selectedConversation.recipients.map(r => r.id) , Pic )
    }

    setPic(null)

  }, [ Pic ])



  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])
  const { sendMessage, selectedConversation } = useConversations()

  function handleSubmit(e) {
    e.preventDefault()

    sendMessage(
      selectedConversation.recipients.map(r => r.id),
      text
    )
    setText('')
  }

  return (
    <div className="d-flex flex-column flex-grow-1" >
      <div className="flex-grow-1 overflow-auto" >
        <div className="d-flex flex-column align-items-start justify-content-end px-3" >
          {selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index} style={{overflowX:'hidden'}}
                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
              >
                <div
                  className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border msgofother'}`}  style={{fontSize:'30px'}} >
                  { message.text.includes('.com/') && message.text.includes('.png') || 
                    message.text.includes('.jpg') || message.text.includes('.jpeg') ?
                  
                    <img src={message.text} style={{maxHeight:'400px',minHeight:'300px',minWidth:'300px'}} />
                  
                   : message.text
                  
                  }
                  
                </div>
                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                  {message.fromMe ? 'You' : message.senderName }
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={e => setText(e.target.value)}
              style={{ height: '75px', resize: 'none',fontSize:'25px' }}
            />
            <InputGroup.Append>
              <Button style={{backgroundColor:'#287094', paddingLeft:'10px' , paddingRight : '10px',fontSize:'15px'  }} 
              type="submit">Send</Button>
              
              <label>
              <input type="file" className="" style={{display:'none'}} onChange={handleChange} />
              <CameraAltIcon style={{fontSize:'55px',color:'#287094'}}></CameraAltIcon>
              </label>

              
            </InputGroup.Append>
            
          </InputGroup>
          <div className='progress-barsub'>
            {Perc > 0 && <motion.div className="progress-bar" initial={{ width: 0 }} animate={{ width: Perc + '%' }}/>}
          </div>
        </Form.Group>
      </Form>
    </div>
  )
}
