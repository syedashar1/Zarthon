import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';
import { useDispatch, useSelector } from 'react-redux';
import "./chat.css"
import { UnpopChatNotification } from '../../actions/chatActions';
import { userDetails } from '../../actions/userActions';

export default function Conversations() {

  const { conversations, selectConversationIndex } = useConversations()

  const ListForChat = useSelector((state) => state.ListForChat);
  const { users : users } = ListForChat

  const Notification = useSelector((state) => state.Notification);
  const { senders : senders } = Notification

  const getDetails = useSelector((state) => state.getDetails);
  const { user } = getDetails;

  const [Checked, setChecked] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(conversations);
    dispatch( userDetails )
    
  }, [   ])

  return (
    <ListGroup variant="flush" style={{textAlign:'center'}} >
      { conversations.length === 0 ? 
      <div style={{textAlign : 'center' , marginTop : '20px' , fontSize :'30px'}} >You dont any contacts yet :/ </div> :
      conversations.map((conversation, index) => (
        <>{conversation && conversation.recipients[0] && 
        
        <ListGroup.Item
          key={index}
          action
          onClick={() => {
            selectConversationIndex(index) ; 
            setChecked([...Checked, conversation.recipients[0].id])  ;
            dispatch( UnpopChatNotification(conversation.recipients[0].id) ) ;
                  }}
          active={conversation.selected}
        >
          <div style={{height:'50px',width:'50px',borderRadius:'50%',overflow:'hidden',textAlign:'center',display:'inline-block'}} >
            <img src={conversation.recipients[0].profilePic}></img>
          </div>
          <p> {conversation.recipients.map(r => r.name).join(', ')} 

            {senders && senders.indexOf(conversation.recipients[0].id) != -1 &&
            Checked.indexOf(conversation.recipients[0].id) == -1 ? <h3><span className='badge badge-warning' >new</span></h3> :
            
            user && user.newMessages && user.newMessages.indexOf(conversation.recipients[0].id) != -1 &&
            Checked.indexOf(conversation.recipients[0].id) == -1 ? <h3><span className='badge badge-warning' >new</span></h3> : ''
            
            }

          </p>


          
          </ListGroup.Item>}</>
        
      ))}
    </ListGroup>
  )
}



//there are some that dont anything they appear as blank spaces in convo  , they are the source of error