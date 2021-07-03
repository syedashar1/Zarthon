import React, { useContext, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';
import Axios from 'axios'
import { POP_NOTIFICATION } from '../../types/chatTypes';
import { popChatNotification } from '../../actions/chatActions';
import { newNotification } from '../../actions/likeCommenentActions';



const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({ id, children }) {

  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  // const { contacts } = useContacts()
  const dispatch = useDispatch();

  
  const ListForChat = useSelector((state) => state.ListForChat);
  const { users : users } = ListForChat
  const socket = useSocket()

  function createConversation(recipients) {
    setConversations(prevConversations => {
      return [...prevConversations, { recipients, messages: [] }]
    })
  }

  const addMessageToConversation = useCallback(({ recipients, text, sender }) => {


    if(id != sender) { dispatch( popChatNotification(sender) ) }

    setConversations(prevConversations => {
      let madeChange = false
      const newMessage = { sender, text }
      const newConversations = prevConversations.map(conversation => {
        if (arrayEquality(conversation.recipients, recipients)) {
          madeChange = true
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage]
          }
        }

        return conversation
      })

      if (madeChange) {
        return newConversations
      } else {
        return [
          ...prevConversations,
          { recipients, messages: [newMessage] }
        ]
      }
    })
  }, [setConversations])


  const receiveNotification = () => {
    dispatch(newNotification() )
    console.log('sending...');
  }



  useEffect(() => {
    if (socket == null) return

    socket.on('receive-message', addMessageToConversation)
    socket.on('receive-notification', receiveNotification )

    return () =>{ socket.off('receive-message');socket.off('receive-notification');}
  }, [socket, addMessageToConversation , receiveNotification ])

  async function sendMessage(recipients, text) {
    socket.emit('send-message', { recipients, text })

    addMessageToConversation({ recipients, text, sender: id })
    await Axios.put(`/api/chat/msgtosend/${id}`, { text, recipients , sender : id });


  }

// here we send to each contact what we want
  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = users.find(contact => {
        return contact._id === recipient
        //it sends the contact from the contacts that matches the id
      })
      const name = (contact && contact.name) || recipient
      return { id: recipient, name , profilePic : contact.profilePic }
    })

    const messages = conversation.messages.map(message => {
      const contact = users.find(contact => {
        return contact._id === message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender
      return { ...message, senderName: name, fromMe }
    })
    
    const selected = index === selectedConversationIndex
    return { ...conversation, messages, recipients, selected }
  })

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  return a.every((element, index) => {
    return element === b[index]
  })
}