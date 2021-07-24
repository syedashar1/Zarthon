const { default: axios } = require('axios');

const io = require('socket.io')(5002)

io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)
  console.log('socket connected');
  console.log(id);
  axios.put(`http://127.0.0.1:5001/api/chat/online/${id}`)

  socket.on('send-message', ({ recipients, text }) => {

    console.log('a message was sent');
    recipients.forEach(recipient => {

      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id)
      console.log(recipient);
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      })
    })
  })



  socket.on('send-notification',  ({ type , by , post , comment , to }) => {

      console.log(to)
      socket.broadcast.to(to).emit('receive-notification' , {
        type , by , post , comment
    })}
      
  )


  socket.on("disconnecting", (reason) => {
    console.log('socket disconnected');
    console.log(id);
    axios.put(`http://127.0.0.1:5001/api/chat/offline/${id}`)
  });



})
