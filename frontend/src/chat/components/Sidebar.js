import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Conversations from './Conversations'
import NewContactModal from './NewContactModal'
import NewConversationModal from './NewConversationModal'
import { useSelector } from 'react-redux'

const CONVERSATIONS_KEY = 'conversations'
const CONTACTS_KEY = 'contacts'

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
  const [modalOpen, setModalOpen] = useState(false)
  const conversationsOpen = activeKey === CONVERSATIONS_KEY
  const userSignin = useSelector((state) => state.userSignin);
  const {  userInfo : userInfo } = userSignin;
  
  function closeModal() {
    setModalOpen(false)
  }

  return (
    <div style={{ width: '14%' }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>

        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>

        </Tab.Content>
        <div className="p-2 border-top border-right small">
          Your Id: <span className="text-muted">{userInfo._id}</span>
        </div>
        {/* <Button onClick={() => setModalOpen(true)} className="rounded-0">
          New Conversation
        </Button> */}
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>

          <NewConversationModal closeModal={closeModal} /> 
          
        
      </Modal>
    </div>
  )
}
