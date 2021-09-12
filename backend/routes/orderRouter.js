import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Gig from '../models/gigsModel.js';
import Job from '../models/jobModel.js';
import Order from '../models/orderModel.js';
import Professional from '../models/proModel.js';
import Refund from '../models/refundModel.js';
import Teacher from '../models/teachModel.js';
import User from '../models/userModel.js'
import { isAuth } from '../utils.js'


const orderRouter = express.Router();


orderRouter.get('/my-pending-refunds-amount' , isAuth ,expressAsyncHandler( async (req , res) => {

  console.log('here');
  const refunds = await Refund.find({gigOwner : req.user._id})
  var refundAmount = 0
  for (let i = 0; i < refunds.length; i++) { refundAmount = refundAmount + refunds[i].amount  }
  res.send({
    amount : refundAmount ,
    total : refunds.length
  })

}))

orderRouter.get('/all-refunds' , isAuth ,expressAsyncHandler( async (req , res) => {

  const refunds = await Refund.find({gigOwner : req.user._id})
  res.send(refunds)

}))



orderRouter.post( '/orderplace' , isAuth ,expressAsyncHandler(async (req, res) => {
    const newOrder = new Order(req.body);
    const x = await newOrder.save();
    const gig = await Gig.findById(req.body.gig)
    gig.earned = gig.earned + 0.8*Number(req.body.totalPrice)
    gig.orderPlaced.push(x._id)
    
    const sellerUser = await User.findById(gig.by)
    sellerUser.netIncome = sellerUser.netIncome + 0.8*Number(req.body.totalPrice) 
    sellerUser.transactions.push({
      type : 'Gig Earning' , 
      date : Date.now() ,
      detail : `You got paid for your gig ${gig.title}` ,
      amount : 0.8*Number(req.body.totalPrice) ,
    })

    const buyer = await User.findById(req.user._id)
    buyer.usedForPurchases = buyer.usedForPurchases + Number(req.body.totalPrice) 
    buyer.transactions.push({
      type : 'Gig Buying' , 
      date : Date.now() ,
      detail : `You paid for gig ${gig.title}` ,
      amount : Number(req.body.totalPrice) ,
    })

    await buyer.save()
    await sellerUser.save()
    await gig.save()
    console.log(gig);

    res.send(x)
    console.log('ordered');    
  })
);


orderRouter.get( '/placedbyme' , isAuth ,expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({placedBy : req.user._id });
        res.send(orders)  
      })
);

orderRouter.get( '/myorders' , isAuth ,expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({gigOwner : req.user._id });
        res.send(orders)  
      })
);

orderRouter.put( '/finished/:id' , isAuth ,expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  order.status = 'finished'
  await order.save()
  res.send('finished')  
})
);



orderRouter.put( '/startwork/:id' , isAuth ,expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  order.status = 'working'
  await order.save()
  res.send('working')  
})
);

orderRouter.get( '/gig-order/:id' , isAuth ,expressAsyncHandler(async (req, res) => {
  console.log(req.params.id);
  const order = await Order.findById(req.params.id);
  console.log(order);
  res.send(order)  
})
);




orderRouter.put( '/gig-review/:id' , isAuth ,expressAsyncHandler(async (req, res) => {

  console.log('here');
  const order = await Order.findById(req.params.id);
  if(order.placedBy !== req.user._id ) {return}

  const gig = await Gig.findById(order.gig);

  gig.reviews.push({
    by : req.user._id,
    name : req.user.userName ,
    review : req.body.review ,
    rating : req.body.rating ,
    pic :  req.body.pic ,
  })

  gig.jobDone = gig.jobDone + 1 
  gig.totalRatings = gig.totalRatings + req.body.rating 
  gig.finalRating = gig.totalRatings / gig.jobDone 


  order.status = 'finished and reviewed' ;
  await gig.save()
  await order.save()

  
  res.send(gig._id)  
})
);


orderRouter.put( '/submitproposal/:id' , isAuth ,expressAsyncHandler(async (req, res) => {
    

  const job = await Job.findById(req.params.id)
  job.responses.push({
    by : req.user._id ,
    response : req.body.response
  })
   
  const pro = await Professional.findOne({by : req.user._id })
  pro.totalApplied = pro.totalApplied + 1

  await job.save()  
  await pro.save()

  res.send('proposal accepted')


})
);



orderRouter.put( '/payment-gateway/:job/:person' , isAuth ,expressAsyncHandler(async (req, res) => {
    
  console.log('entered');
  const job = await Job.findById(req.params.job)
  
  if(job.by === req.user._id){
  
  
  for (let i = 0; i < job.payRoll.length; i++) {

    if(job.payRoll[i].user === req.params.person ){

      job.payRoll[i].totalPayed = job.payRoll[i].totalPayed + Number(req.body.amount)
      job.payRoll[i].paymentHistory.push({
          amount : Number(req.body.amount) ,
          paidOn : Date.now()
      })

    }
    
  }

   
  const pro = await Professional.findOne({by : req.params.person })
  pro.earned = pro.earned + Number(req.body.amount)


  
  await job.save()  
  await pro.save()

  res.send('payment confirmed')
  console.log('payment confirmed');
  }

})
);






orderRouter.put( '/hire/:job/:person' , isAuth ,expressAsyncHandler(async (req, res) => {
    

  const job = await Job.findById(req.params.job)
  
  if(job.by === req.user._id){
  
  job.hired.push(req.params.person)
  job.payRoll.push({
    user : req.params.person 
  })
  console.log(job.responses.length);
  job.responses = job.responses.filter(x =>(x.by !== req.params.person) )
  console.log(job.responses.length);
   
  const pro = await Professional.findOne({by : req.params.person })
  pro.appliedSuccess = pro.appliedSuccess + 1

  
  await job.save()  
  await pro.save()
  res.send('hired')
  console.log('hired');
  }

  


})
);



// gigRouter.get( '/delete/:id'  ,expressAsyncHandler(async (req, res) => {
    
// const deletedProduct = await Gig.findById(req.params.id);
//   if (deletedProduct) {
//     await deletedProduct.remove();
//     res.send({ message: 'Product Deleted' });
//   } else {
//     res.send('Error in Deletion.');
//   }  

// })
// );



orderRouter.get( '/'  ,expressAsyncHandler(async (req, res) => {
  
  const jobs = await Job.find({ })
  res.send(jobs);
  return;

  console.log(req.query);

  const title = req.query.title || '';
  const titleFilter = title ? { title: { $regex: title=== "all" ? '' : title , $options: 'i' } } : {};

  var tagsFilter = {};
  if(req.query.tags && req.query.tags != 'all' ){
  const tags = req.query.tags.split(' ') || '';
  var tagsFilter = tags ?  { tags: { $all : tags } }  : {}; 
  }


  const delivery = req.query.delivery && Number(req.query.delivery) !==  0 ? Number(req.query.delivery) : 0;
  const deliveryFilter = delivery  ?  {'beginner.delivery' : { $lte: delivery  } } : {};

  
  const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
  const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
  const minpriceFilter = min  ?  { 'beginner.price' : { $gte: min  } } : {};
  const maxpriceFilter = max  ? {'premium.price' : { $lte: max  } } : {};

  
  const order = req.query.order || '';
  const rating = req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0;

  
  const sortOrder = order === 'rating' ? { finalRating : 1 } : 
                    order === 'mostjobs' ? { jobDone : -1 } : 
                    order === 'new' ?  { _id: -1 } : {_id : 1}



  const country = req.query.country || '';
  const countryFilter = country ? { country: { $regex: country=== "all" ? '' : country , $options: 'i' } } : {};

  const language = req.query.language || '';
  const languageFilter = language ? { languages : { $in: language } } : {};
  

  const pageSize = 9 ;
  const page = Number(req.query.pageNumber) || 1;

  const totalGigs = await Gig.count({

        // ...titleFilter ,
    // ...minpriceFilter ,
    // ...maxpriceFilter ,
    // ...tagsFilter ,
    // ...countryFilter ,
    // ...languageFilter ,
    // ...deliveryFilter

  })


  const gigs = await Gig.find({ 
    // ...titleFilter ,
    // ...minpriceFilter ,
    // ...maxpriceFilter ,
    // ...tagsFilter ,
    // ...countryFilter ,
    // ...languageFilter ,
    // ...deliveryFilter
  }).sort(sortOrder)


  // .skip(pageSize * (page - 1)).limit(pageSize);


  res.send({gigs , totalGigs , page , pages: Math.ceil(totalGigs / pageSize) })





})
);


orderRouter.get( '/user/:id' , expressAsyncHandler(async (req, res) => {
    const jobs = await Job.find({by : req.params.id })
    res.send(jobs)
  })
);


orderRouter.get( '/:id' , expressAsyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id)
    res.send(job)
  })
);





orderRouter.post('/postpro' , isAuth , expressAsyncHandler( async (req , res) => {

    const existPro = await Teacher.findOne({by : req.user._id})
    if( existPro ) {
      res.status(401).send({ message: 'pro account already exists' });
      return;
    }

    const newPro = new Teacher(req.body);
    const x = await newPro.save();
    res.send(x)

}))


orderRouter.put('/update-job/:id' , isAuth ,expressAsyncHandler( async (req , res) => {

    const gig = await Job.findById(req.params.id)
    if(gig && gig.by ==req.user._id ){
    
        
        gig.title = req.body.title || gig.title ;
        gig.description = req.body.description || gig.description ;
        gig.tags = req.body.tags || gig.tags ; 
        gig.scale = req.body.scale || gig.scale ; 
        gig.maxBudget = req.body.maxBudget || gig.maxBudget ; 
        gig.minBudget = req.body.minBudget || gig.minBudget ; 
        gig.location = req.body.location || gig.location ; 
        gig.budget = req.body.budget || gig.budget ; 

        await gig.save()
        console.log('job post updated' , gig._id);
        res.send(gig._id)


    }
    else{
      console.log('gig doesnt exist');
    }
    

}))



orderRouter.put('/ask-refund/:id' , isAuth ,expressAsyncHandler( async (req , res) => {

  const order = await Order.findById(req.params.id)
  if(req.user._id !== order.placedBy ) {res.status(404).send('Not Your Order') ; return ;}


  order.status = 'Refund Requested by Buyer'
  const refund = new Refund({
    gig : order.gig ,
    orderId : req.params.id ,
    gigOwner : order.gigOwner ,
    buyerId : req.user._id ,
    buyerName : req.user.userName ,
    amount : Number(req.body.amount) ,
    reason : req.body.reason ,
  })

  const newRefund = await refund.save();
  await order.save();

  res.send(newRefund)

}))


orderRouter.put('/pay-refund/:order/:refund' , isAuth ,expressAsyncHandler( async (req , res) => {

  const order = await Order.findById(req.params.order)
  const refund = await Refund.findById(req.params.refund)
  const buyer = await User.findById(order.placedBy)
  const seller = await User.findById(req.user._id)

  if(order.status == 'Refund given by Seller'){res.status(404).send('Already Refunded') ; return ;}
  if(req.user._id !== order.gigOwner ) {res.status(404).send('Not Your Order') ; return ;}

  buyer.netIncome = buyer.netIncome + refund.amount
  seller.withdrawn = seller.withdrawn + refund.amount
  order.status = 'Refund given by Seller'

  buyer.transactions.push({
    type : 'Refund Recieved' , 
    date : Date.now() ,
    detail : `You got refunded for gig ${gig.title}` ,
    amount : Number(refund.amount) ,
  })

  seller.transactions.push({
    type : 'Refund Paid' , 
    date : Date.now() ,
    detail : `You refunded ${buyer.userName} for gig ${gig.title}` ,
    amount : Number(refund.amount) ,
  })


  await Refund.findByIdAndDelete(req.params.refund)
  await order.save();
  await buyer.save();
  await seller.save();

  res.send(req.params.refund)

}))







export default orderRouter