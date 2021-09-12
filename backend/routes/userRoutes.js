import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { generateToken, isAuth } from '../utils.js'
import Seller from '../models/sellerModel.js';
import nodemailer from 'nodemailer'
import sendgridTransport from 'nodemailer-sendgrid-transport'
import crypto from 'crypto'
import Update from '../models/updateModel.js';

const userRouter = express.Router();

// const transporter = nodemailer.createTransport(sendgridTransport({
//   auth:{
//       api_key:'asdasdasdasdasddfgfgdgfgdf'
//   }
// }))


let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL || 'davecorperations@gmail.com', // TODO: your gmail account
      pass: process.env.PASSWORD || 'xavimessiashar1' // TODO: your gmail password
  }
});


userRouter.get( '/showupdates' ,expressAsyncHandler(async (req, res) => {
  const updates = await Update.find({})
  res.send(updates)
})
);

userRouter.get("/search", async (req, res) => {
  
  const email = req.query.email || '';
  const titleFilter = email ? { email: { $regex: email=== "all" ? '' : email , $options: 'i' } } : {};
  console.log(titleFilter);
  const users = await User.find({ ...titleFilter } ,'email profilePic name')
  res.send(users);

}); 


userRouter.put( '/buyconnects' , isAuth ,expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  user.connects = user.connects + Number(req.body.amount)
  await user.save()
  console.log(user.connects);
  res.send('done')
})
);



// the idea is to suggest 10 users from user that he has in chat or people that like his posts and send in shuffle manner

userRouter.get( '/userssuggestions/:id' , expressAsyncHandler(async (req, res) => {
  
  console.log(req.params.id);
  
  const user = await User.findById(req.params.id);

  var suggestedUsersID = []

  for (let i = 0; (i < user.forChat.length && suggestedUsersID.length < 20) ; i++) {
    
    suggestedUsersID.push( user.forChat[i] )

  }
  


  for (let i = 0; i < user.posts.length && suggestedUsersID.length < 20 ; i++) {
  
      for (let k = 0; k < user.posts[i].likes.length && suggestedUsersID.length < 20 ; k++) {
    
        if(suggestedUsersID.indexOf(user.posts[i].likes[k]) == -1) suggestedUsersID.push( user.posts[i].likes[k] )
        
      }
  }


  if( suggestedUsersID.length < 15 ){
    const moreUsers = await User.find({} , '_id' ).limit(6)
    
    for (let i = 0; i < moreUsers.length; i++) {
      
      if(suggestedUsersID.indexOf(moreUsers[i]._id) == -1) suggestedUsersID.push(moreUsers[i]._id )
      
    }

  }



  const suggestedUsers = await User.find({  '_id': { $in: suggestedUsersID} } , '_id name profilePic email' );
  res.send(suggestedUsers.reverse())



})
);




userRouter.post( '/signin', expressAsyncHandler(async (req, res) => {
          
        console.log(req.body);

        const user = await User.findOne({ userName: req.body.userName });
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
              _id: user._id,
              email: user.email,
              userName: user.userName,
              newMessages : user.newMessages ,
              token: generateToken(user),
              isSeller : user.seller || false ,
            });
            return;
          }
        }
        res.status(401).send({ message: 'Invalid email or password' });
      })
);



userRouter.put( '/notification/:id' , isAuth ,expressAsyncHandler(async (req, res) => {
  
  const user = await User.findById(req.params.id);
  user.notification.push({
    type : req.body.type ,
    byName : req.body.byName ,
    text : req.body.text ,
    link : req.body.link
  })

  user.newNotifications = user.newNotifications + 1 
  await user.save()
  res.send('notified')
  console.log(user.notification);

})
);



userRouter.get( '/:id' , expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        user.notification.reverse()
        user.transactions.reverse()
        user.avaliableForWithdrawal = user.netIncome - user.withdrawn - user.pendingClearance
        res.send(user);
      })
);

userRouter.get( '/onlysaved/:id' , expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id , 'savedPosts' );
  res.send(user);
})
);


userRouter.get( '/single/:id' , expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id );
        res.send(user);
      })
);



userRouter.post('/register' , expressAsyncHandler( async (req , res) => {
        console.log('regiter');

        const newUser = new User(req.body);
      
        const alreadyEmail = await User.findOne({ email: req.body.email });
        
        if( alreadyEmail ) {
          res.status(401).send({ message: 'email already used' });
        }
      
        if( !newUser.password ) {
          res.send("enter password")
        }
      
        
        newUser.password = bcrypt.hashSync( newUser.password , 8 )
        newUser.connects = 50 
      
        const createdUser = await newUser.save();
        console.log(createdUser);
        res.send({
          _id: createdUser._id,
          email: createdUser.email,
          token: generateToken(createdUser),
          isSeller : createdUser.seller || false ,
        });

}))



userRouter.post('/registerSeller' , expressAsyncHandler( async (req , res) => {
        console.log('regiter Seller');

        const newUser = new Seller(req.body);
      
        const alreadyEmail = await Seller.findOne({ email: req.body.email });
        
        if( alreadyEmail ) {
          res.status(401).send({ message: 'email already used' });
        }
      
        if( !newUser.password ) {
          res.send("enter password")
        }
      
        
        newUser.password = bcrypt.hashSync( newUser.password , 8 )
      
        const createdUser = await newUser.save();
        console.log(createdUser);
        res.send({
          _id: createdUser._id,
          email: createdUser.email,
          token: generateToken(createdUser),
          isSeller : createdUser.seller || false ,
        });

}))



userRouter.get("/", async (req, res) => {
  
  const pageSize = 5 ;
  const page = Number(req.query.pageNumber) || 1;

  const users = await User.find({}).skip(pageSize * (page - 1)).limit(pageSize);

  res.send(users);

    
}); 


userRouter.put("/setprotrue", isAuth ,async (req, res) => {
  
  const user = await User.findById(req.user._id)
  user.proAccount = true 
  await user.save()
    
}); 
userRouter.put("/setteachtrue", isAuth ,async (req, res) => {
  
  const user = await User.findById(req.user._id)
  user.teachAccount = true 
  await user.save()
    
}); 














userRouter.post( '/reset', expressAsyncHandler(async (req, res) => {
          
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    


  }
  res.status(401).send({ message: 'Invalid email or password' });
})
);


userRouter.post( '/adminupdates', isAuth ,expressAsyncHandler(async (req, res) => {
  if(req.user.email === 'admin@gmail.com'){
    const newUpdate = new Update(req.body);
    console.log(newUpdate);
    await newUpdate.save();
    res.send('update added')
  }
})
);








userRouter.post('/reset-password',(req,res)=>{
  crypto.randomBytes(32,(err,buffer)=>{
      if(err){
          console.log(err)
      }
      const token = buffer.toString("hex")
      console.log(req.body)

      User.findOne({email:req.body.email})
      .then(user=>{
          if(!user){
              return res.status(422).json({error:"User dont exists with that email"})
          }
          user.resetToken = token
          user.expireToken = Date.now() + 3600000
          user.save().then((result)=>{
              transporter.sendMail({
                  to:user.email,
                  from:"no-replay@insta.com",
                  subject:"password reset",
                  html:`
                  <p>You requested for password reset</p>
                  <h5>click in this link to reset password</h5>
                  <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                  `
              })
              res.json(user)
          })

      })
  })
})





userRouter.post('/new-password',(req,res)=>{

  console.log('entered');

  const newPassword = req.body.password
  const sentToken = req.body.token
  User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
  .then(user=>{
      if(!user){
        console.log('expired');
          return res.status(422).json({error:"Try again session expired"})
      }
      const hashedpassword = bcrypt.hashSync(newPassword,8)
      

         user.password = hashedpassword
         user.resetToken = undefined
         user.expireToken = undefined
         user.save().then((saveduser)=>{
            console.log(saveduser);
            res.json(saveduser)
      })


  }).catch(err=>{
      console.log(err)
  })
})





userRouter.put( '/update', isAuth ,expressAsyncHandler(async (req, res) => {
  
  console.log('updating');
  const user = await User.findById(req.user._id);

  if(user.email !== req.body.email)
  {
    const existingEmail = await User.find({email : req.body.email})
  
    if(existingEmail) {
      console.log({existingEmail:"this email already exists"});
      res.status(401).send({existingEmail:"this email already exists"})
      return
    }
  }


  if(user.userName !== req.body.userName)
  {
    const existingUserName = await User.findOne({userName : req.body.userName})
    console.log(req.body.userName);
    if(existingUserName  ) {
      console.log(existingUserName);
      res.status(401).send({existingUserName :"this username already exists"})
      return
    }
  }

  

  if (user) {

    if (bcrypt.compareSync(req.body.oldPassword, user.password)) {


      user.name = req.body.name || user.name ,
      user.userName = req.body.userName || user.userName ,
      user.email =  req.body.email || user.email ,
      user.bio =  req.body.bio || user.bio ,
      user.password = bcrypt.hashSync( req.body.newPassword , 8 ) || user.password 

      const updatedUser = await user.save()

      console.log(updatedUser);
      res.send({
        _id: updatedUser._id,
        email: updatedUser.email,
        newMessages : updatedUser.newMessages ,
        token: generateToken(updatedUser),
      });
      return;
    }


    else{
      console.log({notMatched:"your password doesnt match"});
      res.status(401).send({notMatched:"your password doesnt match"})
      return
    }


    
    
  }
   
  
  const createdUser = await user.save();
  console.log(createdUser);
  res.send({
    _id: createdUser._id,
    email: createdUser.email,
    token: generateToken(createdUser),
    isSeller : createdUser.seller || false ,
  });


})
);






export default userRouter;

