import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Gig from '../models/gigsModel.js';
import Order from '../models/orderModel.js';
import Professional from '../models/proModel.js';
import Teacher from '../models/teachModel.js';
import User from '../models/userModel.js'
import { isAuth } from '../utils.js'


const gigRouter = express.Router();


gigRouter.post( '/create' , isAuth ,expressAsyncHandler(async (req, res) => {
    
    console.log('creating new gig');
    const newGig = new Gig( );
    newGig.by = req.user._id ;
    const x = await newGig.save();
    res.send(x._id)
    console.log('created');    

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



gigRouter.post( '/suggestion' ,expressAsyncHandler(async (req, res) => {
    
  // const gigs = await User.find({  'tags': { $in: req.body.tags } } , '_id name profilePic email' );
  const gigs = await Gig.find({ });
  res.send(gigs)


})
);




gigRouter.get( '/'  ,expressAsyncHandler(async (req, res) => {
  // const gigs = await Gig.find({ })
  // res.send(gigs)

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
  const languageFilter = language && language !== 'all' ? { languages : { $in: language } } : {};
  console.log(languageFilter);
  console.log(tagsFilter);

  const pageSize = 9 ;
  const page = Number(req.query.pageNumber) || 1;

  const totalGigs = await Gig.count({

    ...titleFilter ,
    ...minpriceFilter ,
    ...maxpriceFilter ,
    ...tagsFilter ,
    // ...countryFilter ,
    ...languageFilter ,
    ...deliveryFilter

  })


  const gigs = await Gig.find({ 
    ...titleFilter ,
    ...minpriceFilter ,
    ...maxpriceFilter ,
    ...tagsFilter ,
    // ...countryFilter ,
    ...languageFilter ,
    ...deliveryFilter
  }).sort(sortOrder).skip(pageSize * (page - 1)).limit(pageSize);


  res.send({gigs , totalGigs , page , pages: Math.ceil(totalGigs / pageSize) })





})
);


gigRouter.get( '/user/:id' , expressAsyncHandler(async (req, res) => {
    const gigs = await Gig.find({by : req.params.id })
    console.log(req.params.id);

    var totalEarned = 0
    for (let i = 0; i < gigs.length; i++) { totalEarned = totalEarned + gigs[i].earned }

    res.send({gigs , totalEarned })
  })
);


gigRouter.get( '/:id' , expressAsyncHandler(async (req, res) => {
    const gig = await Gig.findById(req.params.id)
    res.send(gig)
  })
);

gigRouter.get( '/inque-and-working/:id' , expressAsyncHandler(async (req, res) => {
  
  const gig = await Gig.findById(req.params.id)
  const orders = await Order.find({  '_id': { $in: gig.orderPlaced} } );

  var inQue = 0 
  var inWorking = 0

  for (let i = 0; i < orders.length; i++) {
    
    if(orders[i].status == 'in Queue'){ inQue = inQue + 1 }
    if(orders[i].status == 'working'){ inWorking = inWorking + 1 }
    
  }


  res.send({inQue , inWorking})

  
})
);



gigRouter.post('/postpro' , isAuth , expressAsyncHandler( async (req , res) => {

    const existPro = await Teacher.findOne({by : req.user._id})
    if( existPro ) {
      res.status(401).send({ message: 'pro account already exists' });
      return;
    }

    const newPro = new Teacher(req.body);
    const x = await newPro.save();
    res.send(x)

}))


gigRouter.put('/update-gig/:id' , isAuth ,expressAsyncHandler( async (req , res) => {

    const gig = await Gig.findById(req.params.id)
    if(gig && gig.by ==req.user._id){
    
        
        gig.title = req.body.title || gig.title ;
        gig.description = req.body.description || gig.description ;
        gig.gigPics = req.body.gigPics || gig.gigPics ;
        gig.negotiable = req.body.negotiable || gig.negotiable ;
        gig.tags = req.body.tags || gig.tags ; 
        gig.country = req.body.country || gig.country ; 

        gig.beginner = req.body.beginner || gig.beginner ; 
        gig.standard = req.body.standard || gig.standard ; 
        gig.premium = req.body.premium || gig.premium ;

        await gig.save()
        console.log('gig updated' , gig._id);
        res.send(gig._id)


    }
    else{
      console.log('pro doesnt exist');
    }
    

}))



export default gigRouter