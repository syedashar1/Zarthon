import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import useLocalStorage from '../hooks/useLocalStorage';

const ContactsContext = React.createContext()

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
  
  const ListForChat = useSelector((state) => state.ListForChat);
  const { users : users } = ListForChat


  return (
    <ContactsContext.Provider value={{ contacts : users  }}>
      {children}
    </ContactsContext.Provider>
  )
}
