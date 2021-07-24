import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { generateToken, isAuth } from '../utils.js'
import Seller from '../models/sellerModel.js';


const chatRouter = express.Router();





chatRouter.get( '/forchat/:id', expressAsyncHandler(async (req, res) => {
  
        // console.log('listssss of chat ');
      
        const user = await User.findById(req.params.id);
        const users = await User.find({  '_id': { $in: user.forChat} } , '_id name profilePic' );
        if (users){
          res.send(users)
        }
        else{
          res.status(401).send({ message: 'no users found' });
        }
      
      })
);





chatRouter.put( '/msgtosend/:id' , expressAsyncHandler(async (req, res) => {
        
        // console.log('see meeeee');
        // console.log(req.body)
        // console.log(req.params.id);


        //user req.params.id
        //other user.conversations[i].recipients[0]


        const user = await User.findById(req.body.recipients[0]);
        const user2 = await User.findById(req.params.id);



        for(var i = 0 ; i < user.conversations.length ; i++ ){
          // console.log(i);
          console.log(user.conversations[i].recipients[0]);
          if (user.conversations[i].recipients[0] === req.params.id ) {
            // console.log('found it !  at' , i );
            break
          }
        }
        if (user) {
           user.conversations[i].messages.push({sender : req.params.id , text : req.body.text })
            await user.save()
            }

           

            for(var i = 0 ; i < user2.conversations.length ; i++ ){
              // console.log(user2.conversations[i].recipients[0]);
              if (user2.conversations[i].recipients[0] === req.body.recipients[0] ) {
                // console.log('found it !  for user 2' , i );
                // console.log(user2.conversations[i].messages);
                break
              }
            }
            if (user) {
               user2.conversations[i].messages.push({sender : req.params.id , text : req.body.text })
                await user2.save()
                }  

      })
); 



chatRouter.get( '/getconversations/:id', expressAsyncHandler(async (req, res) => {
  
  // console.log('getting conversations');

  const user = await User.findById(req.params.id);
  // console.log(user.conversations);
  if (user.conversations){
    res.send(user.conversations)
  }
  else{
    res.status(401).send({ message: 'no users found' });
  }

})
);



chatRouter.get( '/notification/:id', isAuth ,expressAsyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id);

  if (user.newMessages.indexOf(req.params.id) == -1 && req.params.id !== user._id ){
    
    user.newMessages.push(req.params.id) 
    await user.save()
    res.send(user.newMessages)

  }
  else{
    res.send(user.newMessages)
  }

})
);


chatRouter.get( '/removenotification/:id', isAuth ,expressAsyncHandler(async (req, res) => {

  console.log('removing notification');
  const user = await User.findById(req.user._id);
  user.newMessages = user.newMessages.filter(e=>e != req.params.id )
  await user.save()
  res.send(user.newMessages)


})
);



chatRouter.put( '/singletext/:id', expressAsyncHandler(async (req, res) => {
  

  const user = await User.findById(req.body.recipients[0]);
  const user2 = await User.findById(req.params.id);

  var found1 = false
  var found2 = false

  for(var i = 0 ; i < user.conversations.length ; i++ ){
    // console.log(i);
    // console.log(user.conversations[i].recipients[0]);
    if (user.conversations[i].recipients[0] === req.params.id ) {
      // console.log('found it !  at' , i );
      found1 = true
      break
    }
  }
  if (found1) {
     user.conversations[i].messages.push({sender : req.params.id , text : req.body.text })
      await user.save()
      }

     

      for(var i = 0 ; i < user2.conversations.length ; i++ ){
        // console.log(user2.conversations[i].recipients[0]);
        if (user2.conversations[i].recipients[0] === req.body.recipients[0] ) {
          // console.log('found it !  for user 2' , i );
          // console.log(user2.conversations[i].messages);
          found2 = true
          break
        }
      }
      if (found2) {
         user2.conversations[i].messages.push({sender : req.params.id , text : req.body.text })
          await user2.save()
          res.send('done')
          return
          } 




  user.forChat.push(req.params.id)
  user2.forChat.push(req.body.recipients[0])

  user.conversations.push( {recipients : req.params.id  , 
    messages :[{sender : req.params.id , text : req.body.text }] } )


  user2.conversations.push( {recipients : req.body.recipients[0] , 
    messages :[{sender : req.params.id , text : req.body.text }] } ) 


  try {
    await user.save()
    await user2.save()
    // console.log('saved');
  } catch (error) {
    console.log(error.message);
  }

})
);




chatRouter.put( '/online/:id' ,expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  user.active = true ;
  await user.save()
})
);
chatRouter.put( '/offline/:id' ,expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  user.active = false ;
  user.lastSeen = Date.now()
  await user.save()
})
);





export default chatRouter;

