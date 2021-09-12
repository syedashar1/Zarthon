import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { generateToken, isAuth } from '../utils.js'
import Seller from '../models/sellerModel.js';
import nodemailer from 'nodemailer'
import sendgridTransport from 'nodemailer-sendgrid-transport'
import crypto from 'crypto'
import Withdraw from '../models/withdrawModel.js';

const withdrawRouter = express.Router();


withdrawRouter.post( '/' , isAuth ,expressAsyncHandler(async (req, res) => {


        const sellerUser = await User.findById(req.user._id)
        if(sellerUser.netIncome - sellerUser.withdrawn - sellerUser.pendingClearance <= req.body.amount ){ res.status(400).send('Not enough credit') ; return ; }

        const newRequest = new Withdraw({
                amount : req.body.amount ,
                requestDate : Date.now() ,
                by : req.user._id ,
        
                typeOfWithdrawal : req.body.type,
                paypalEmail : req.body.email ,
                name : req.body.name,
                iban : req.body.iban ,
        });



        const x = await newRequest.save();
        res.send(x)

        
        sellerUser.withdrawn = sellerUser.withdrawn + Number(req.body.amount) 
        sellerUser.transactions.push({
          amount : Number(req.body.amount) ,
          type : 'Withdraw Request' , 
          date : Date.now() ,
          detail : `You requested withdrawal of amount ${req.body.amount} to ${req.body.type} (${req.body.iban || req.body.email})` ,
        })
        await sellerUser.save()


      })
);

withdrawRouter.get( '/admin' , isAuth ,expressAsyncHandler(async (req, res) => {

  if(req.user.email !== 'greatmind20@gmail.com') {res.status(404);return}
  const withdrawReqs = await Withdraw.find({ status : 'pending' })
  res.send(withdrawReqs)

})
);


withdrawRouter.put( '/confirmpayment/:id' , isAuth ,expressAsyncHandler(async (req, res) => {

  if(req.user.email !== 'greatmind20@gmail.com') {res.status(404);return}
  const withdrawReq = await Withdraw.findById(req.params.id)
  const user = await User.findById(withdrawReq.by)
  // checks if not already paid
  if (withdrawReq.status !== 'pending' ) { res.status(404) ; return }  
  withdrawReq.status = 'Payment Completed';
  await withdrawReq.save()
  res.send(withdrawReq._id)

})
);


export default withdrawRouter;

