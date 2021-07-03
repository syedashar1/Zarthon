import React, { useEffect } from 'react'
import Sidebar from './Sidebar';
import OpenConversation from './OpenConversation';
import { useConversations } from '../contexts/ConversationsProvider';

export default function Dashboard({ id }) {
  
  const { selectedConversation } = useConversations()


  return (
    <div className="d-flex" style={{ height: '90vh' }}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  )
}
